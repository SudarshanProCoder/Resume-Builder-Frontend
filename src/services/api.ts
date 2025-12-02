// src/services/api.ts
import axios from 'axios';
import { getToken, removeToken } from '../utils/storage';

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }

    // Handle 500 Server Error
    if (error.response?.status === 500) {
      console.error('Server error occurred');
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error - please check your connection');
    }

    return Promise.reject(error);
  }
);

export default api;