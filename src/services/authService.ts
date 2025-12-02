// src/services/authService.ts
import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    profilePic?: string;
  };
}

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Register new user
  register: async (formData: FormData): Promise<RegisterResponse> => {
    const response = await api.post('/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get current user data
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string) => {
    const response = await api.post('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  },

  // Logout (if backend requires)
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};