import { useAuthStore } from '@/store/authStore';
import { redirect } from 'react-router';
import { type AxiosError } from 'axios';

type ServiceFn<T> = () => Promise<T>;

type ServiceEntry<K extends string, T> = {
  key: K;
  fn: ServiceFn<T>;
};

type ServicesArray = readonly ServiceEntry<string, unknown>[];

type InferResult<T extends ServicesArray> = {
  [K in T[number]['key']]: Extract<T[number], { key: K }>['fn'] extends (
    ...args: never[]
  ) => Promise<infer R>
    ? R
    : never;
};

interface ClientLoaderOptions<T extends ServicesArray> {
  services: T;
}

export function createClientLoader<T extends ServicesArray>({
  services,
}: ClientLoaderOptions<T>) {
  return async function clientLoader(): Promise<InferResult<T>> {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw redirect('/login');
    }

    try {
      const entries = await Promise.all(
        services.map(async (entry) => [entry.key, await entry.fn()] as const),
      );

      return Object.fromEntries(entries) as InferResult<T>;
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
