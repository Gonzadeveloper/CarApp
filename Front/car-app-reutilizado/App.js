import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/context/AuthNavigator';

function RootNavigation() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

