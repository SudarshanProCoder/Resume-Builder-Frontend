// src/pages/Auth/Login.tsx
import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { AuthLayout } from "../../components/Auth/AuthLayout";
import { useAuth } from "../../hooks/useAuth";
import { validateEmail } from "../../utils/validators";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/resume/templates");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login(formData.email, formData.password);
      navigate("/resume/templates");
    } catch (error) {
      setErrors({ email: "Invalid email or password" });
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your journey"
    >
      <div onSubmit={handleSubmit} className="space-y-5">
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
          type={showPassword ? "text" : "password"}
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
          onClick={handleSubmit}
          isLoading={isLoading}
          icon={ArrowRight}
          className="w-full"
        >
          Sign In
        </Button>

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
          >
            Don't have an account?{" "}
            <span className="text-blue-600 dark:text-indigo-400 font-semibold hover:underline">
              Sign Up
            </span>
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors text-sm"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
