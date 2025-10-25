import toast from 'react-hot-toast';
import { useAuth } from './useAuth';

export function useLogout() {
  const { clearAuth } = useAuth();

  return () => {
    clearAuth();
    toast.success('Logged out successfully');
  };
}
