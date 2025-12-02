// src/utils/storage.ts

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

/**
 * Save auth token to localStorage
 */
export const setToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to save token:', error);
  }
};

/**
 * Get auth token from localStorage
 */
export const getToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to get token:', error);
    return null;
  }
};

/**
 * Remove auth token from localStorage
 */
export const removeToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to remove token:', error);
  }
};

/**
 * Save user data to localStorage
 */
export const setUserData = (user: any): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
};

/**
 * Get user data from localStorage
 */
export const getUserData = (): any | null => {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get user data:', error);
    return null;
  }
};

/**
 * Remove user data from localStorage
 */
export const removeUserData = (): void => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Failed to remove user data:', error);
  }
};

/**
 * Clear all stored data
 */
export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Failed to clear storage:', error);
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};