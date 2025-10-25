import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from '../../lib/axios';
import { User, AuthResponse, LoginCredentials, RegisterCredentials } from '../../types';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../lib/utils';
import { queryClient } from '../../lib/queryClient';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    if (storedToken && userStr) {
      try {
        const storedUser = JSON.parse(userStr);
        setUser(storedUser);
        setToken(storedToken);
      } catch {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  const setAuth = (newUser: User, newToken: string) => {
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    setUser(newUser);
    setToken(newToken);
  };

  const clearAuth = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    queryClient.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        setAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function useLogin() {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await axios.post<AuthResponse>('/api/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Logged in successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error) || 'Login failed');
    },
  });
}

export function useRegister() {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const response = await axios.post<AuthResponse>('/api/auth/register', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Account created successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error) || 'Registration failed');
    },
  });
}

export function useLogout() {
  const { clearAuth } = useAuth();

  return () => {
    clearAuth();
    toast.success('Logged out successfully');
  };
}
