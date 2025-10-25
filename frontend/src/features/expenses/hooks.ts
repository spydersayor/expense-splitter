import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../lib/axios';
import { Expense } from '../../types';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../lib/utils';

export function useExpenses(groupId: string) {
  return useQuery({
    queryKey: ['expenses', groupId],
    queryFn: async () => {
      const response = await axios.get<Expense[]>(`/api/expenses/${groupId}`);
      return response.data;
    },
    enabled: !!groupId,
  });
}

interface CreateExpenseData {
  groupId: string;
  description: string;
  amount: number;
  paidByUserId: string;
  shares: { userId: string; amount: number }[];
}

export function useAddExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: CreateExpenseData) => {
      // Transform frontend data to backend format
      const backendRequest = {
        groupId: parseInt(expense.groupId),
        paidById: parseInt(expense.paidByUserId),
        amount: expense.amount,
        description: expense.description,
        spentAt: new Date().toISOString().split('T')[0], // Today's date
        shares: expense.shares.map(share => ({
          userId: parseInt(share.userId),
          shareAmount: share.amount,
        }))
      };
      
      const response = await axios.post('/api/expenses', backendRequest);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['expenses', variables.groupId] });
      queryClient.invalidateQueries({ queryKey: ['balances', variables.groupId] });
      toast.success('Expense added successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error) || 'Failed to add expense');
    },
  });
}
