import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

const authPaths = [
  '/auth/login',
  '/auth/register',
  '/auth/refresh',
  '/auth/logout',
  '/auth/check-status',
];

const isAuthRequest = (url?: string) =>
  authPaths.some((path) => url?.includes(path));

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  console.log('token', token);

  if (token && config.headers && !isAuthRequest(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthRequest(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${baseURL}/auth/refresh`,
          undefined,
          { withCredentials: true },
        );

        useAuthStore.getState().setToken(data.token);

        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
