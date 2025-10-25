import { useMutation } from '@tanstack/react-query';
import axios from '../../lib/axios';
import { AuthResponse, LoginCredentials } from '../../types';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../lib/utils';
import { useAuth } from './useAuth';

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
