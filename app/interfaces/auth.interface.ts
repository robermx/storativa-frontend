export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
}

export interface RegistrationStartedResponse {
  email: string;
  expiresAt: string;
  resendAvailableAt: string;
}

export interface PendingRegistration {
  email: string;
  fullName: string;
  password: string;
  expiresAt: Date;
  resendAvailableAt: Date;
}

export interface VerificationCodeData {
  code: string[];
}

export interface VerifyRegistrationCredentials {
  email: string;
  code: string;
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
