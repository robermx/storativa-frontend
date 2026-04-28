import api from "@/lib/api";
import { LoginCredentials, LoginResponse } from "@/interfaces/auth.interface";


export const loginRequest = async (data: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const checkUserStatus = async (): Promise<LoginResponse> => {
  const respnse = await api.get("/auth/check-status")
  return respnse.data
}