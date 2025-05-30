import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, refreshTokenRequest } from '../api/authApi';
import api from '../api/apiInstance'

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        let accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        // Si no hay accessToken pero sí refreshToken, intentamos renovarlo
        if (!accessToken && refreshToken) {
          const res = await refreshTokenRequest(refreshToken);
          accessToken = res.data.accessToken;
          await AsyncStorage.setItem('accessToken', accessToken);
        }
        
        // Si tenemos un accessToken válido, usamos la API para traer el user
        if (accessToken) {
        const response = await api.get('/users/me');
        const userData = response.data.data; // <-- aquí extraés el user que está dentro de data.data
        setUser({
          id: userData.id,
          name: userData.name,
          lastName: userData.lastName,
          email: userData.email,
          dni: userData.dni,
        });
          setIsLoggedIn(true);
          setLoading(false);
        } else {
          setIsLoggedIn(false);
          setUser(null);
          setLoading(false);
        }
      } catch (err) {
        console.log('Falló la autenticación:', err);
        await AsyncStorage.clear();
        setIsLoggedIn(false);
        setUser(null);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);


  const login = async (email, password) => {
    try {
      const { data } = await loginUser(email, password);
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      setUser({
      id: data.id,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      dni: data.dni,
    });
      setIsLoggedIn(true);
      setLoading(false);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
