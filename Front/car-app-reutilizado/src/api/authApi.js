import axios from 'axios';

const API_URL = 'https://6gk42kt8-3001.brs.devtunnels.ms';

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { email, password });
  console.log(response.data)
  return response.data;
};

export const refreshTokenRequest = async (refreshToken) => {
  const response = await axios.post(`${API_URL}/users/refresh-token`, { refreshToken });
  return response.data;
};