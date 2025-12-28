import api from '../config/API';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  verificationToken: string | null;
  _id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  subscriptionPlan?: string;
  emailVerified: boolean;
}

interface RegisterResponse {
  _id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  subscriptionPlan: string;
  emailVerified: boolean;
  verificationToken: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ProfileResponse {
  name: string;
  email: string;
  password: null;
  profileImageUrl: string;
  subscriptionPlan: string;
  emailVerified: boolean;
  verificationToken: string | null;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

interface VerifyEmailResponse {
  message: string;
  emailVerified: boolean;
}

interface ResendVerificationResponse {
  message: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  uploadProfileImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/auth/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data as { imageUrl: string };
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
    profileImageUrl?: string;
  }): Promise<RegisterResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  verifyEmail: async (token: string): Promise<VerifyEmailResponse> => {
    const response = await api.get(`/auth/verify-email/${token}`);
    return response.data;
  },

  resendVerification: async (
    email: string
  ): Promise<ResendVerificationResponse> => {
    const response = await api.post('/auth/resend-verification', { email });
    return response.data;
  }
};
