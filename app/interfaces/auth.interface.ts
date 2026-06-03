export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginRegisterResponse {
  user: User;
  token: string;
}

export interface User {
  email: string;
  fullName: string;
}

export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
