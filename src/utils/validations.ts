import {LoginCredentials, Errors} from '../types/auth';
import {validateEmail} from './validateEmail';



export const validateLoginForm = (credentials: LoginCredentials): Errors => {
  const errors: Errors = {};

  if (!validateEmail(credentials.email)) {
    errors.email = 'El email no es válido';
  }

  if (!credentials.password) {
    errors.password = 'La contraseña es requerida';
  }

  return errors;
};
