import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { AuthLayout } from "../../components/Auth/AuthLayout";
import { ProfilePicUpload } from "../../components/Auth/ProfilePicUpload";
import { useAuth } from "../../hooks/useAuth";
import { validateEmail } from "../../utils/validators";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null as File | null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, profilePic: file }));
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

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
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        profilePic: formData.profilePic,
      });
      navigate("/login");
    } catch (error) {
      setErrors({ email: "Registration failed. Please try again." });
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join us and start creating">
      <div onSubmit={handleSubmit} className="space-y-5">
        <ProfilePicUpload previewUrl={previewUrl} onChange={handleFileChange} />

        <Input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          icon={User}
          error={errors.name}
          disabled={isLoading}
        />

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
          Create Account
        </Button>

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
          >
            Already have an account?{" "}
            <span className="text-blue-600 dark:text-indigo-400 font-semibold hover:underline">
              Sign In
            </span>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
