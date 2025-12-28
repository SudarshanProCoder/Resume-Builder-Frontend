import { create } from 'zustand';
import { AuthState, User } from './types';
import { storage } from '../../utils/storage';

interface AuthStore extends AuthState {
  setUser: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user: User, token: string) => {
    storage.setUser(user);
    storage.setToken(token);
    set({ user, token, isAuthenticated: true, error: null });
  },

  logout: () => {
    storage.removeToken();
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  initAuth: () => {
    const token = storage.getToken();
    const user = storage.getUser();
    if (token && user) {
      set({ user, token, isAuthenticated: true });
    }
  }
}));
