import {ApiErrorResponse, LoginCredentials} from '../../types/auth';
import {API_URL} from '../../config/constants';

export const authService = {
  login: async (loginCredentials: LoginCredentials) => {
    try {
      const postData = {
        mail: loginCredentials.email,
        pass: loginCredentials.password,
      };
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();
        throw new Error(errorData.error.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Error al iniciar sesión');
    }
  },
};
