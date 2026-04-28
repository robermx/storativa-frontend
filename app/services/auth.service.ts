import api from '@/lib/api';
import {
  LoginCredentials,
  LoginRegisterResponse,
  RegisterCredentials,
} from '@/interfaces/auth.interface';

export const loginRequest = async (
  data: LoginCredentials,
): Promise<LoginRegisterResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const checkUserStatus = async (): Promise<LoginRegisterResponse> => {
  const response = await api.get('/auth/check-status');
  return response.data;
};

export const registerUser = async (
  data: RegisterCredentials,
): Promise<LoginRegisterResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};
