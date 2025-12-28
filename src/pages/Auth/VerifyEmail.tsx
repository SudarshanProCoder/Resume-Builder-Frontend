import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { AuthLayout } from '../../components/Auth/AuthLayout';
import { Button } from '../../components/Button/Button';
import { authService } from '../../services/authService';

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [verificationStatus, setVerificationStatus] = useState<
    'loading' | 'success' | 'error' | 'expired'
  >('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationStatus('error');
        setErrorMessage('Invalid verification link.');
        return;
      }

      try {
        setVerificationStatus('success');
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } catch (error: any) {
        const status = error.response?.status;
        const message = error.response?.data?.message || 'Verification failed.';

        if (status === 400 && message.toLowerCase().includes('expired')) {
          setVerificationStatus('expired');
          const userEmail = error.response?.data?.email;
          if (userEmail) setEmail(userEmail);
        } else if (
          status === 400 &&
          message.toLowerCase().includes('already verified')
        ) {
          setVerificationStatus('success');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setVerificationStatus('error');
        }
        setErrorMessage(message);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  const handleResendVerification = async () => {
    if (!email) {
      navigate('/register');
      return;
    }

    try {
      await authService.resendVerification(email);
      navigate('/verification-pending', { state: { email } });
    } catch (error) {
      setErrorMessage('Failed to resend verification email. Please try again.');
    }
  };

  return (
    <AuthLayout
      title={
        verificationStatus === 'loading'
          ? 'Verifying...'
          : verificationStatus === 'success'
            ? 'Email Verified!'
            : verificationStatus === 'expired'
              ? 'Link Expired'
              : 'Verification Failed'
      }
      subtitle={
        verificationStatus === 'loading'
          ? 'Please wait while we verify your email'
          : verificationStatus === 'success'
            ? 'Your account has been successfully verified'
            : verificationStatus === 'expired'
              ? 'Your verification link has expired'
              : 'Something went wrong'
      }
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-8">
          {verificationStatus === 'loading' && (
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-spin" />
            </div>
          )}

          {verificationStatus === 'success' && (
            <>
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                Redirecting you to dashboard...
              </p>
              <Button
                onClick={() => navigate('/dashboard')}
                icon={ArrowRight}
                className="mt-4"
              >
                Go to Dashboard
              </Button>
            </>
          )}

          {verificationStatus === 'expired' && (
            <>
              <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-sm text-yellow-800 dark:text-yellow-300 mb-4">
                <p className="mb-2">{errorMessage}</p>
                <p className="text-xs">
                  Please request a new verification link.
                </p>
              </div>
              <Button onClick={handleResendVerification} className="w-full">
                Resend Verification Email
              </Button>
            </>
          )}

          {verificationStatus === 'error' && (
            <>
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-sm text-red-800 dark:text-red-300 mb-4">
                <p>{errorMessage}</p>
              </div>
              <Button
                onClick={() => navigate('/register')}
                variant="outline"
                className="w-full"
              >
                Back to Register
              </Button>
            </>
          )}
        </div>

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
          >
            Back to Login
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
