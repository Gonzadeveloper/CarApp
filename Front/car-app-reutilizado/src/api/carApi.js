import axios from 'axios';
import api from './apiInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://6gk42kt8-3001.brs.devtunnels.ms';

export const getMyCars = async () => {
  const token = await AsyncStorage.getItem('accessToken');

  const res = await api.get(`${API_URL}/cars/getmycar`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};

export const getCarByIdSearch = async (carId) => {

  const token = await AsyncStorage.getItem('accessToken');

  const res = api.get(`${API_URL}/cars/searchid/${carId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res;
}

export const getBrands = () => axios.get(`${API_URL}/brands`);

export const getModels = () => axios.get(`${API_URL}/model`);

export const getVersions = () => axios.get(`${API_URL}/versions`);

export const createCar = (carData) => axios.post(`${API_URL}/cars`, carData);

export const createService = (carService) => axios.post(`${API_URL}/service`, (carService));

export const createKms = (carKms) => axios.post(`${API_URL}/kms`, carKms);

export const getCarsByPlate = (text) => axios.get(`${API_URL}/cars/search?plate=${text}`);
