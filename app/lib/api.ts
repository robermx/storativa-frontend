import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

let refreshPromise: Promise<string> | null = null;

const authPaths = [
  '/auth/login',
  '/auth/register',
  '/auth/register/verify',
  '/auth/register/resend',
  '/auth/refresh',
  '/auth/logout',
];

const isAuthRequest = (url?: string) =>
  authPaths.some((path) => url?.includes(path));

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

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
        const { status } = useAuthStore.getState();

        if (status === 'anonymous') {
          return Promise.reject(error);
        }

        if (!refreshPromise) {
          refreshPromise = axios
            .post(`${baseURL}/auth/refresh`, undefined, {
              withCredentials: true,
            })
            .then(({ data }) => {
              useAuthStore.getState().setAuth(data.user, data.token);
              return data.token as string;
            })
            .catch((refreshError) => {
              useAuthStore.getState().setAnonymous();
              throw refreshError;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        await refreshPromise;

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
