import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/Auth/AuthLayout';
import { Button } from '../../components/Button/Button';
import { authService } from '../../services/authService';

const VerificationPending: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  const handleResendVerification = async () => {
    if (!email) {
      setResendError('Email address not found. Please register again.');
      return;
    }

    setIsResending(true);
    setResendError(null);
    setResendSuccess(false);

    try {
      await authService.resendVerification(email);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to resend verification email.';
      setResendError(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="We've sent a verification link to your email"
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-center mb-2">
            We've sent a verification link to
          </p>
          <p className="text-gray-900 dark:text-gray-100 font-semibold text-center mb-6">
            {email}
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-300">
            <p className="mb-2">
              📧 Check your inbox and click the verification link to activate
              your account.
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              The link will expire in 24 hours.
            </p>
          </div>
        </div>

        {resendSuccess && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Verification email sent successfully!</span>
          </div>
        )}

        {resendError && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {resendError}
          </div>
        )}

        <div className="space-y-3">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            Didn't receive the email?
          </p>

          <Button
            onClick={handleResendVerification}
            isLoading={isResending}
            variant="outline"
            className="w-full"
          >
            Resend Verification Email
          </Button>
        </div>

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm inline-flex items-center gap-1"
          >
            Back to Login
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerificationPending;
