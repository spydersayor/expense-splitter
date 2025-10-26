import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from './useAuth';

export function useLogout() {
  const { clearAuth } = useAuth();
  const navigate = useNavigate();

  return () => {
    clearAuth();
    toast.success('Logged out successfully');
    navigate('/');
  };
}
