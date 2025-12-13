import axios from 'axios';

// Base URL from environment variable or default to localhost
const BASE_URL = 'https://api.ezumrah.com/v1'; // Placeholder

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    // TODO: Get token from AsyncStorage or AuthContext
    const token = null; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // TODO: Handle session expiry
    }
    return Promise.reject(error);
  }
);
