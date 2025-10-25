import { useQuery } from '@tanstack/react-query';
import axios from '../../lib/axios';
import { BalanceSummary } from '../../types';

export function useBalances(groupId: string) {
  return useQuery({
    queryKey: ['balances', groupId],
    queryFn: async () => {
      const response = await axios.get<Record<string, number>>(`/api/balances/${groupId}`);
      // Transform backend response (Map<userId, balance>) to frontend format
      const totals = Object.entries(response.data).map(([userId, balance]) => ({
        userId,
        balance,
      }));
      return {
        groupId,
        totals,
      } as BalanceSummary;
    },
    enabled: !!groupId,
  });
}
