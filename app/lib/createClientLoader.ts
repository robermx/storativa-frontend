import { useAuthStore } from '@/store/authStore';
import { redirect } from 'react-router';
import { type AxiosError } from 'axios';

type ServiceFn<T> = () => Promise<T>;
interface ClientLoaderOptions<T> {
  service: ServiceFn<T>;
}
export function createClientLoader<T>({ service }: ClientLoaderOptions<T>) {
  return async function clientLoader() {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw redirect('/login');
    }

    try {
      const result = await service();
      return result;
    } catch (error: unknown) {
      if (error instanceof Response) {
        throw error;
      }

      const message =
        error instanceof Error ? error.message : 'Error al cargar datos';
      const status = (error as AxiosError)?.response?.status || 500;

      if (status === 401) {
        throw redirect('/login');
      }

      throw new Response(message, { status });
    }
  };
}
