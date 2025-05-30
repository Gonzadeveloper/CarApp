import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native'; 

export default function LoginScreen() {
  const { login, user } = useAuth();
  const navigation = useNavigation(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: "CarSearchStack" }],
      });
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await login(email, password);
      
      // Navegar inmediatamente y limpiar el stack
      navigation.reset({
        index: 0,
        routes: [{ name: "CarSearchStack" }],
      });

      // Mostrar alerta luego (opcional)
      Alert.alert('Bienvenido', 'Inicio de sesión exitoso');
      
    } catch (error) {
      Alert.alert(
        'Error de login',
        error.response?.data?.msg || 'Algo salió mal'
      );
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Ingresar" onPress={handleLogin} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { gap: 10, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
});
