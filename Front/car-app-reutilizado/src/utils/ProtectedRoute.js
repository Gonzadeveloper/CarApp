import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator, Alert } from 'react-native';

export function Protected(Component) {
  return function WrappedComponent(props) {
    const { isLoggedIn } = useAuth();
    const navigation = useNavigation();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      if (!isLoggedIn) {
        Alert.alert(
          "Debes loguearte",
          "Para usar algunas funciones es necesario loguearte",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              }
            }
          ]
        );
      }
      setChecking(false);
    }, [isLoggedIn]);

    if (checking) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (!isLoggedIn) return null;

    return <Component {...props} />;
  };
}
