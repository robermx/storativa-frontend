import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 1. Interceptor de Petición: Añade el token actual a cada salida
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. Interceptor de Respuesta: Maneja la expiración del token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Si el error es 401 y no hemos intentado reintentar esta petición específica
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marcamos la petición para evitar bucles infinitos

      try {
        const refreshToken = useAuthStore.getState().refreshToken;

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Llamamos al endpoint de refresh en NestJS
        // IMPORTANTE: Usamos axios (instancia limpia) para evitar que este post
        // entre de nuevo en este interceptor
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {
            token: refreshToken,
          },
        );

        // Actualizamos el estado global (asumiendo que tu store tiene una función setTokens)
        // Debería guardar tanto el nuevo 'token' como el nuevo 'refreshToken'
        useAuthStore.getState().setTokens(data.token, data.refreshToken);

        // Actualizamos el encabezado de la petición original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${data.token}`;

        // Reintentamos la petición original con la configuración actualizada
        return api(originalRequest);
      } catch (refreshError) {
        // Si el refresh falla (ej. el refresh token también expiró), cerramos sesión
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
