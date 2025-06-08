import {Alert, StyleSheet, Text, View} from 'react-native';
import Input from '../common/Input';
import CustomButton from '../common/CustomButton';
import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/slices/hooks';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from '../../store/slices/authSlice';
import {LoginCredentials, Errors} from '../../types/auth';
import {validateLoginForm} from '../../utils/validations';
import {authService} from '../../services/auth/auth';

export default function Form(): React.JSX.Element {
  const [validationErrors, setValidationErrors] = useState<Errors>({});
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const {loading} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    const errors = validateLoginForm(credentials);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      dispatch(loginRequest());
      //Simulate a login request
      const response = await authService.login(credentials);

      dispatch(
        loginSuccess({
          email: response.user.email,
          token: response.token,
        }),
      );
    } catch (err: any) {
      dispatch(loginFailure(err.message));
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acceso Seguro</Text>
      <Text style={styles.subTitle}>
        Ingresa a tu panel para monitoriar tu salud!
      </Text>
      <View style={styles.inputContainer}>
        <Input
          label="Email"
          placeholder="Ingresa tu correo electrónico"
          keyboardType="email-address"
          value={credentials.email}
          onChangeText={text => setCredentials({...credentials, email: text})}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          keyboardType="default"
          secureTextEntry={true}
          value={credentials.password}
          onChangeText={text =>
            setCredentials({...credentials, password: text})
          }
        />
      </View>
      <Text style={styles.signUpText}>
        ¿No tienes una cuenta?{' '}
        <Text style={styles.signUpLink}>Regístrate aquí</Text>
      </Text>
      <CustomButton
        title={loading ? 'Cargando...' : 'Iniciar Sesión'}
        color="#007bff"
        onPress={handleLogin}
      />

      {validationErrors.email && (
        <Text style={styles.errorText}>{validationErrors.email}</Text>
      )}
      {validationErrors.password && (
        <Text style={styles.errorText}>{validationErrors.password}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 30,
    borderRadius: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  signUpText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  signUpLink: {
    color: '#007bff',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 15,
    textAlign: 'center',
  },
});
