export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface User {
  _id: string;
  email: string;
  fullName: string;
}

export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
