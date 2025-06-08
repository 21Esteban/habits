import {LoginCredentials, Errors} from '../types/auth';
import {validateEmail} from './validateEmail';


export const validateLoginForm = (credentials: LoginCredentials): Errors => {
  const errors: Errors = {};

  if (!validateEmail(credentials.mail)) {
    errors.mail = 'El email no es válido';
  }

  if (!credentials.pass) {
    errors.pass = 'La contraseña es requerida';
  }

  return errors;
};
