import { useQuery } from '@tanstack/react-query';
import axios from '../../lib/axios';
import { BalanceSummary } from '../../types';

export function useBalances(groupId: string) {
  return useQuery({
    queryKey: ['balances', groupId],
    queryFn: async () => {
      const response = await axios.get<BalanceSummary>(`/api/balances/${groupId}`);
      return response.data;
    },
    enabled: !!groupId,
  });
}
