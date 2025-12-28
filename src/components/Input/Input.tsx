import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  rightIcon?: LucideIcon;
  onRightIconClick?: () => void;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  error,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div
        className={`relative flex items-center glass border rounded-xl px-4 py-3 transition-all duration-300 ${
          error
            ? 'border-red-500 dark:border-red-500'
            : 'border-gray-200 dark:border-gray-700 focus-within:border-blue-600 dark:focus-within:border-indigo-500 focus-within:bg-white dark:focus-within:bg-[#161B22]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      >
        {Icon && (
          <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0" />
        )}

        <input
          className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none disabled:cursor-not-allowed text-sm"
          disabled={disabled}
          {...props}
        />

        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors disabled:cursor-not-allowed"
            disabled={disabled}
          >
            <RightIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1.5 ml-1 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};
