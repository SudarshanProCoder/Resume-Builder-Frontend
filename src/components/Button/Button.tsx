import React from 'react';
import { LucideIcon, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon: Icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'relative group overflow-hidden rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02]',
    secondary: 'glass border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
    outline: 'border-2 border-blue-600 text-blue-600 dark:border-indigo-500 dark:text-indigo-400 hover:bg-blue-600 dark:hover:bg-indigo-600 hover:text-white',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      <div className="relative flex items-center justify-center">
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {Icon && iconPosition === 'left' && (
              <Icon className="w-5 h-5 mr-2" />
            )}
            <span>{children}</span>
            {Icon && iconPosition === 'right' && (
              <Icon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            )}
          </>
        )}
      </div>
    </button>
  );
};