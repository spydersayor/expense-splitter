import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../lib/axios';
import { Settlement } from '../../types';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../lib/utils';

export function useSettlements(groupId: string) {
  return useQuery({
    queryKey: ['settlements', groupId],
    queryFn: async () => {
      const response = await axios.get<Settlement[]>('/api/settlements', {
        params: { groupId },
      });
      return response.data;
    },
    enabled: !!groupId,
  });
}

export function useAddSettlement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settlement: Omit<Settlement, 'id' | 'createdAt'>) => {
      const response = await axios.post<Settlement>('/api/settlements', settlement);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['settlements', variables.groupId] });
      queryClient.invalidateQueries({ queryKey: ['balances', variables.groupId] });
      toast.success('Settlement recorded successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error) || 'Failed to record settlement');
    },
  });
}
