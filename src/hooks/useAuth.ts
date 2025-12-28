import { useState } from 'react';
import { authService } from '../services/authService';
import { storage } from '../utils/storage';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!storage.getToken());
  const [user, setAuthUser] = useState(storage.getUser());
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });

      if (!response.emailVerified) {
        throw new Error('EMAIL_NOT_VERIFIED');
      }

      if (!response.verificationToken) {
        throw new Error('Token not received');
      }

      storage.setToken(response.verificationToken);

      const userData = {
        id: response._id,
        name: response.name,
        email: response.email,
        profileImageUrl: response.profileImageUrl,
        subscriptionPlan: response.subscriptionPlan
      };

      storage.setUser(userData);
      setAuthUser(userData);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    storage.removeToken();
    setIsAuthenticated(false);
    setAuthUser(null);

    window.location.href = '/login';
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    profilePic?: File | null;
  }) => {
    setIsLoading(true);
    try {
      let profileImageUrl: string | undefined;

      if (data.profilePic) {
        const uploadRes = await authService.uploadProfileImage(data.profilePic);
        profileImageUrl = uploadRes.imageUrl;
      }

      const response = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        profileImageUrl
      });

      return response;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    register
  };
};
