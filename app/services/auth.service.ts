import api from "@/lib/api";
import { LoginCredentials, LoginResponse } from "@/interfaces/auth.interface";


export const loginRequest = async (data: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
