import axios from 'axios';

const API_URL = 'https://6gk42kt8-3001.brs.devtunnels.ms';

export const updateUser = async (id, payload) => {
  const response = await axios.put(`${API_URL}/users/${id}`, payload);
  return response.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${API_URL}/users/${id}`);
  return res.data;
};