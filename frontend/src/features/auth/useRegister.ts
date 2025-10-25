import { useMutation } from '@tanstack/react-query';
import axios from '../../lib/axios';
import { AuthResponse, RegisterCredentials } from '../../types';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../lib/utils';
import { useAuth } from './useAuth';

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
