import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import {
  LoginCredentials,
  LoginRegisterResponse,
  RegisterCredentials,
} from '@/interfaces/auth.interface';

let authBootstrapPromise: Promise<boolean> | null = null;

export const loginRequest = async (
  reqData: LoginCredentials,
): Promise<LoginRegisterResponse> => {
  const { data } = await api.post('/auth/login', reqData);
  return data;
};

export const registerUser = async (
  reqData: RegisterCredentials,
): Promise<LoginRegisterResponse> => {
  const { data } = await api.post('/auth/register', reqData);
  return data;
};

export const refreshRequest = async (): Promise<LoginRegisterResponse> => {
  const { data } = await api.post('/auth/refresh');
  return data;
};

export const logoutRequest = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const ensureAuthSession = async (): Promise<boolean> => {
  const { shouldBootstrap, token } = useAuthStore.getState();

  if (token) {
    return true;
  }

  if (!shouldBootstrap()) {
    return false;
  }

  if (!authBootstrapPromise) {
    authBootstrapPromise = refreshRequest()
      .then(({ user, token: nextToken }) => {
        useAuthStore.getState().setAuth(user, nextToken);
        return true;
      })
      .catch(() => {
        useAuthStore.getState().setAnonymous();
        return false;
      })
      .finally(() => {
        authBootstrapPromise = null;
      });
  }

  return authBootstrapPromise;
};
