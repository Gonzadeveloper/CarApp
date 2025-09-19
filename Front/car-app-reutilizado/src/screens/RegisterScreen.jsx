import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post("https://gnqzk5kv-3001.brs.devtunnels.ms/users/register", {
        email,
        password,
      });

      Alert.alert("Éxito", "Usuario registrado correctamente");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.msg || "No se pudo registrar el usuario"
      );
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Crear cuenta</Text>
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
        <Button title="Registrarme" onPress={handleRegister} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { 
    gap: 10, 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
});