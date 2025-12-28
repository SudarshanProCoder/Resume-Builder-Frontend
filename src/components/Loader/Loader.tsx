import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'default' | 'building' | 'processing';
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  text,
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="relative">
        <div className={`${sizeClasses[size]} relative`}>
          <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset="75"
              strokeLinecap="round"
              style={{
                animation: 'dash 1.5s ease-in-out infinite'
              }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            {variant === 'building' ? (
              <FileText
                className={`${iconSizes[size]} text-blue-600 animate-pulse`}
              />
            ) : variant === 'processing' ? (
              <Sparkles
                className={`${iconSizes[size]} text-blue-600 animate-pulse`}
              />
            ) : (
              <div className="relative">
                <FileText className={`${iconSizes[size]} text-blue-600`} />
                <div className="absolute inset-0 animate-ping opacity-75">
                  <FileText className={`${iconSizes[size]} text-blue-400`} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: '3s' }}
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2"></div>
        </div>
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: '3s', animationDelay: '1s' }}
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-indigo-500 rounded-full -translate-x-1/2"></div>
        </div>
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: '3s', animationDelay: '2s' }}
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-500 rounded-full -translate-x-1/2"></div>
        </div>
      </div>

      {text && (
        <div className="text-center space-y-2">
          <p className="text-base font-medium text-gray-700">{text}</p>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
            <span
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></span>
            <span
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dash {
          0% {
            stroke-dashoffset: 283;
          }
          50% {
            stroke-dashoffset: 70;
          }
          100% {
            stroke-dashoffset: 283;
          }
        }
      `}</style>
    </div>
  );
};
