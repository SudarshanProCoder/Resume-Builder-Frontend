// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { getToken, setToken, removeToken } from '../utils/storage';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  profilePic: File | null;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is already logged in on mount
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      // Optionally fetch user data here
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      removeToken();
      setIsAuthenticated(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      if (data.profilePic) {
        formData.append('profilePic', data.profilePic);
      }

      const response = await authService.register(formData);
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    register,
    logout,
  };
};