import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../lib/axios';
import { Expense } from '../../types';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../lib/utils';

interface BackendExpense {
  id: number;
  groupId: number;
  paidById: number;
  amount: number;
  description: string;
  spentAt: string;
  createdAt: string;
  shares: Array<{
    id: number;
    userId: number;
    shareAmount: number;
  }>;
}

export function useExpenses(groupId: string) {
  return useQuery({
    queryKey: ['expenses', groupId],
    queryFn: async () => {
      try {
        console.log('Fetching expenses for group:', groupId);
        const response = await axios.get<BackendExpense[]>(`/api/expenses/${groupId}`);
        console.log('Expenses fetched:', response.data);
        // Transform backend response to frontend format
        return response.data.map(exp => ({
          id: exp.id.toString(),
          groupId: exp.groupId.toString(),
          paidByUserId: exp.paidById.toString(),
          amount: exp.amount,
          description: exp.description,
          createdAt: exp.createdAt,
          shares: exp.shares.map(share => ({
            userId: share.userId.toString(),
            amount: share.shareAmount,
          })),
        })) as Expense[];
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
        throw error;
      }
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
      
      console.log('Creating expense with request:', backendRequest);
      try {
        const response = await axios.post('/api/expenses', backendRequest);
        console.log('Expense created successfully:', response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to create expense:', error);
        throw error;
      }
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
