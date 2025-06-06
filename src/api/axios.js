import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Token = `Bearer ${token}`;
  return config;
});

export default instance;
