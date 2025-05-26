import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://6gk42kt8-3001.brs.devtunnels.ms';

export const getMyCars = async () => {
  const token = await AsyncStorage.getItem('accessToken');

  const res = await axios.get(`${API_URL}/cars/getmycar`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};