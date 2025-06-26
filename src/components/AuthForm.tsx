
import React, { useState } from 'react';
import { AuthMode, AuthCredentials, LoadingState } from '@/lib/types';

export interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (credentials: AuthCredentials) => Promise<void>;
  onModeSwitch?: (mode: AuthMode) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  onModeSwitch
}) => {
  const [credentials, setCredentials] = useState<AuthCredentials>({
    email: '',
    password: ''
  });
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoadingState('loading');

    try {
      await onSubmit(credentials);
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      setLoadingState('error');
    }
  };

  const handleInputChange = (field: keyof AuthCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    if (error) setError('');
  };

  const isLoading = loadingState === 'loading';

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-orbitron font-bold text-white mb-2">
            {mode === 'login' ? 'Access Terminal' : 'Join the Quest'}
          </h2>
          <p className="text-gray-400 text-sm">
            {mode === 'login' 
              ? 'Enter your credentials to continue your journey' 
              : 'Create your hacker profile to begin'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="form-label">
              Email Address
            </label>
            <input
              type="email"
              value={credentials.email}
              onChange={handleInputChange('email')}
              className="form-input"
              placeholder="hacker@example.com"
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={handleInputChange('password')}
              className="form-input"
              placeholder="••••••••"
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 border border-red-700 rounded p-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !credentials.email || !credentials.password}
            className={`w-full btn-primary flex items-center justify-center ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              mode === 'login' ? 'Enter Terminal' : 'Start Quest'
            )}
          </button>
        </form>

        {/* Mode Switch */}
        {onModeSwitch && (
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => onModeSwitch(mode === 'login' ? 'signup' : 'login')}
                className="text-terminal-green hover:text-terminal-cyan transition-colors"
                disabled={isLoading}
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
