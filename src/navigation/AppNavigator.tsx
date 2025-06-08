import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/auth/LoginScreen';
import GlucoseScreen from '../screens/glucose/GlucoseScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import {selectCurrentUser, setCredentials} from '../store/slices/authSlice';
import {RootState} from '../store/store';

const Stack = createNativeStackNavigator();
const TOKEN_KEY = '@auth_token';
const USER_KEY = '@auth_user';

export default function AppNavigator(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(selectCurrentUser);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkStoredAuth = async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          AsyncStorage.getItem(TOKEN_KEY),
          AsyncStorage.getItem(USER_KEY),
        ]);

        if (storedToken && storedUser) {
          // Restaurar la sesión guardada
          dispatch(setCredentials({
            token: storedToken,
            user: JSON.parse(storedUser),
          }));
        }
      } catch (error) {
        console.error('Error checking stored auth:', error);
      } finally {
        // Simular un splash screen por al menos 1.5 segundos
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    checkStoredAuth();
  }, [dispatch]);

  // Guardar la sesión cuando el usuario se loguea
  useEffect(() => {
    const saveSession = async () => {
      if (user && token) {
        try {
          await Promise.all([
            AsyncStorage.setItem(TOKEN_KEY, token),
            AsyncStorage.setItem(USER_KEY, JSON.stringify(user)),
          ]);
        } catch (error) {
          console.error('Error saving session:', error);
        }
      }
    };

    saveSession();
  }, [user, token]);

  // Mostrar SplashScreen mientras se inicializa
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user && token ? (
          <Stack.Screen
            name="Glucose"
            component={GlucoseScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
