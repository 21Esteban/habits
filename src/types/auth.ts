export interface LoginCredentials {
  mail: string;
  pass: string;
}

export interface User {
  email: string;
  id: string;
  // Agrega otros campos del usuario si los hay
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface Errors {
  mail?: string;
  pass?: string;
  general?: string;
}

export interface ApiErrorResponse {
  error: {
    code: number;
    message: string;
    title: string;
  };
  success: boolean;
  i18n: string;
  message: string;
}