import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import GlucoseScreen from '../screens/glucose/GlucoseScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import {useAppSelector} from '../store/slices/hooks';

const Stack = createNativeStackNavigator();

export default function AppNavigator(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const {isAuthenticated} = useAppSelector(state => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos de splash screen

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Glucose" component={GlucoseScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
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
