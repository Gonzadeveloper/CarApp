import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshTokenRequest } from './authApi';

const api = axios.create({
  baseURL: 'https://6gk42kt8-3001.brs.devtunnels.ms', // ajustá el endpoint base si es necesario
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const res = await refreshTokenRequest(refreshToken);
        const newAccessToken = res.data.accessToken;

        await AsyncStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        await AsyncStorage.clear();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
