import api from '@/lib/api';
import {
  LoginCredentials,
  LoginRegisterResponse,
  RegisterCredentials,
} from '@/interfaces/auth.interface';

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
