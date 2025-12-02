// src/utils/constants.ts

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
  },
  RESUME: {
    LIST: '/resume',
    CREATE: '/resume',
    UPDATE: '/resume/:id',
    DELETE: '/resume/:id',
    TEMPLATES: '/resume/templates',
  },
  SUBSCRIPTION: {
    PLANS: '/subscription/plans',
    SUBSCRIBE: '/subscription/subscribe',
    CANCEL: '/subscription/cancel',
  },
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESUME_TEMPLATES: '/resume/templates',
  CREATE_RESUME: '/resume/create',
  MY_RESUMES: '/resume/my-resumes',
  PRICING: '/subscription/pricing',
  PAYMENT_SUCCESS: '/subscription/success',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Your session has expired. Please login again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful! Please login.',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  PASSWORD_RESET_SENT: 'Password reset link sent to your email.',
  PASSWORD_CHANGED: 'Password changed successfully.',
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
};

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
  PHONE: /^[\d\s\-\+\(\)]{10,}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
};