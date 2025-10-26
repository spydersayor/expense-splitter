import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../lib/axios';
import { Settlement } from '../../types';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../lib/utils';

interface BackendSettlement {
  id: number;
  groupId: number;
  fromUserId: number;
  toUserId: number;
  amount: number;
  settledAt?: string;
  createdAt?: string;
  note?: string;
}

export function useSettlements(groupId: string) {
  return useQuery({
    queryKey: ['settlements', groupId],
    queryFn: async () => {
      console.log('Fetching settlements for group:', groupId);
      const response = await axios.get<BackendSettlement[]>(`/api/settlements/${groupId}`);
      console.log('Settlements fetched from backend:', response.data);
      // Transform backend response to frontend format
      return response.data.map(settlement => ({
        id: settlement.id.toString(),
        groupId: settlement.groupId.toString(),
        fromUserId: settlement.fromUserId.toString(),
        toUserId: settlement.toUserId.toString(),
        amount: settlement.amount,
        createdAt: settlement.settledAt || settlement.createdAt,
      })) as Settlement[];
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

export function useDeleteSettlement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, groupId }: { id: string; groupId: string }) => {
      await axios.delete(`/api/settlements/${id}`);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['settlements', variables.groupId] });
      queryClient.invalidateQueries({ queryKey: ['balances', variables.groupId] });
      toast.success('Settlement deleted successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error) || 'Failed to delete settlement');
    },
  });
}
