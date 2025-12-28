import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { AuthLayout } from '../../components/Auth/AuthLayout';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail } from '../../utils/validators';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error: any) {
      if (error.message === 'EMAIL_NOT_VERIFIED') {
        navigate('/verification-pending', {
          state: { email: formData.email }
        });
      } else {
        const errorMessage =
          error.response?.data?.message || 'Invalid email or password';
        setErrors({ general: errorMessage });
      }
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your journey"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {errors.general && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {errors.general}
          </div>
        )}

        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          icon={Mail}
          error={errors.email}
          disabled={isLoading}
        />

        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          icon={Lock}
          error={errors.password}
          disabled={isLoading}
          rightIcon={showPassword ? EyeOff : Eye}
          onRightIconClick={() => setShowPassword(!showPassword)}
        />

        <Button
          type="submit"
          isLoading={isLoading}
          icon={ArrowRight}
          className="w-full"
        >
          Sign In
        </Button>

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
            disabled={isLoading}
          >
            Don't have an account?{' '}
            <span className="text-blue-600 dark:text-indigo-400 font-semibold hover:underline">
              Sign Up
            </span>
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors text-sm"
            disabled={isLoading}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
