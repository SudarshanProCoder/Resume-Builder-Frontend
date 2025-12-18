import { useState } from "react";
import { authService } from "../services/authService";
import {
  getToken,
  setToken,
  removeToken,
  setUser,
  getUser,
} from "../utils/storage";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [user, setAuthUser] = useState(getUser());
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });

      if (!response.verificationToken) {
        throw new Error("Token not received");
      }

      setToken(response.verificationToken);

      const userData = {
        id: response._id,
        name: response.name,
        email: response.email,
        profileImageUrl: response.profileImageUrl,
        subscriptionPlan: response.subscriptionPlan,
      };

      setUser(userData);
      setAuthUser(userData);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setAuthUser(null);

    window.location.href = "/login";
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

      await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        profileImageUrl,
      });
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
    register,
  };
};
