import {StyleSheet, Text, View} from 'react-native';
import Input from '../common/Input';
import CustomButton from '../common/CustomButton';
import { useState} from 'react';
import {useDispatch} from 'react-redux';
import {setCredentials} from '../../store/slices/authSlice';
import {LoginCredentials, Errors} from '../../types/auth';
import {validateLoginForm} from '../../utils/validations';
import {useLoginMutation} from '../../services/auth/auth';

export default function Form(): React.JSX.Element {
  const [credentials, setLoginCredentials] = useState<LoginCredentials>({
    mail: '',
    pass: '',
  });
  const [validationErrors, setValidationErrors] = useState<Errors>({});

  const dispatch = useDispatch();
  const [login, {isLoading, error}] = useLoginMutation();

  const handleLogin = async () => {
    setValidationErrors({});

    const errors = validateLoginForm(credentials);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await login({
        mail: credentials.mail,
        pass: credentials.pass,
      }).unwrap();
      console.log('✅ Login successful! Response:', response);

      // Mapear el response correctamente
      dispatch(setCredentials(response));
      console.log('💾 Credentials dispatched to store');
    } catch (err) {
      console.error('❌ Login failed:', err);
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
          value={credentials.mail}
          onChangeText={text =>
            setLoginCredentials(prev => ({...prev, mail: text}))
          }
          error={validationErrors.mail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          keyboardType="default"
          secureTextEntry={true}
          value={credentials.pass}
          onChangeText={text =>
            setLoginCredentials(prev => ({...prev, pass: text}))
          }
          error={validationErrors.pass}
        />
      </View>

      {error && (
        <Text style={styles.errorText}>
          Error al iniciar sesión. Verifica tus credenciales.
        </Text>
      )}

      <Text style={styles.signUpText}>
        ¿No tienes una cuenta?{' '}
        <Text style={styles.signUpLink}>Regístrate aquí</Text>
      </Text>

      <CustomButton
        title={isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        color="#007bff"
        onPress={handleLogin}
        disabled={isLoading}
      />
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
    marginTop: 5,
    marginBottom: 15,
    textAlign: 'center',
  },
});
