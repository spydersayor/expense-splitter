import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../lib/axios';
import { Settlement } from '../../types';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../lib/utils';

export function useSettlements(groupId: string) {
  return useQuery({
    queryKey: ['settlements', groupId],
    queryFn: async () => {
      const response = await axios.get<Settlement[]>(`/api/settlements/${groupId}`);
      return response.data;
    },
    enabled: !!groupId,
  });
}

interface CreateSettlementData {
  groupId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  note?: string;
}

export function useAddSettlement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settlement: CreateSettlementData) => {
      // Transform frontend data to backend format
      const backendRequest = {
        groupId: parseInt(settlement.groupId),
        fromUserId: parseInt(settlement.fromUserId),
        toUserId: parseInt(settlement.toUserId),
        amount: settlement.amount,
        note: settlement.note || '',
      };
      
      const response = await axios.post('/api/settlements', backendRequest);
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
