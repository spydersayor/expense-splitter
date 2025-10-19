import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm ${
            error
              ? 'border-red-500 focus:ring-red-500 bg-red-50/50 dark:bg-red-950/50'
              : 'border-gray-200/50 dark:border-gray-600/50 focus:ring-blue-500 hover:border-gray-300/50 dark:hover:border-gray-500/50'
          } bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm hover:shadow-md focus:shadow-lg ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
