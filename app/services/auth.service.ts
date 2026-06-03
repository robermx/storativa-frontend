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

export const checkStatusRequest = async (): Promise<LoginRegisterResponse> => {
  const { data } = await api.get('/auth/check-status');
  return data;
};

export const logoutRequest = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const ensureAuthSession = async (): Promise<boolean> => {
  const token = useAuthStore.getState().token;

  if (token) {
    return true;
  }

  if (!authBootstrapPromise) {
    authBootstrapPromise = checkStatusRequest()
      .then(({ user, token: nextToken }) => {
        useAuthStore.getState().setAuth(user, nextToken);
        return true;
      })
      .catch(() => {
        useAuthStore.getState().logout();
        return false;
      })
      .finally(() => {
        authBootstrapPromise = null;
      });
  }

  return authBootstrapPromise;
};
