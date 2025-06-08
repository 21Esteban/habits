export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Errors {
  email?: string;
  password?: string;
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