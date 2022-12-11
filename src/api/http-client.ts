import axios from 'axios';
import { useAuthStore } from '@/stores/auth-store';

export const httpClient = axios.create({
  baseURL: 'http://localhost:1337/api',
});

httpClient.interceptors.request.use(
  (config) => {
    const auth = useAuthStore();

    const additionalHeaders: Record<string, string> = {};

    if (auth.token) {
      additionalHeaders.Authorization = `Bearer ${auth.token}`;
    }

    config.headers = {
      ...(config.headers || {}),
      ...additionalHeaders,
    };

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
