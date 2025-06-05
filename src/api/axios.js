import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.0.87:3000',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('token',token);
  if (token) config.headers.Token = `Bearer ${token}`;
  return config;
});

export default instance;
