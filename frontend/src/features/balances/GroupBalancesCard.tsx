import { useBalances } from './hooks';
import { useGroup } from '../groups/hooks';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { EmptyState } from '../../components/EmptyState';
import { useCurrency } from '../../hooks/useCurrency';
import { Scale } from 'lucide-react';

interface GroupBalancesCardProps {
  groupId: string;
}

export function GroupBalancesCard({ groupId }: GroupBalancesCardProps) {
  const { data: balances, isLoading: balancesLoading } = useBalances(groupId);
  const { data: group, isLoading: groupLoading } = useGroup(groupId);
  const { formatAmount } = useCurrency();

  if (balancesLoading || groupLoading) {
    return <LoadingSpinner className="py-12" />;
  }

  if (!balances || !group) {
    return (
      <Card>
        <CardBody>
          <p className="text-center text-red-600">Failed to load balances</p>
        </CardBody>
      </Card>
    );
  }

  if (balances.totals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Balances</h3>
        </CardHeader>
        <CardBody>
          <EmptyState
            icon={<Scale size={32} />}
            title="No balances yet"
            description="Add expenses to see who owes what"
          />
        </CardBody>
      </Card>
    );
  }

  const getMemberName = (userId: string) => {
    const member = group.members.find((m) => m.id === userId);
    return member?.name || member?.email || 'Unknown';
  };

  return (
    <Card className="animate-slide-up" style={{animationDelay: '0.1s'}}>
      <CardHeader>
        <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Balances</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          {balances.totals.map((total, index) => (
            <div
              key={total.userId}
              className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50 animate-fade-in"
              style={{animationDelay: `${index * 0.05}s`}}
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {getMemberName(total.userId)}
              </span>
              <span
                className={`text-lg font-semibold ${
                  total.balance > 0
                    ? 'text-green-600 dark:text-green-400'
                    : total.balance < 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {total.balance > 0 ? '+' : ''}
                {formatAmount(total.balance)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>💡 Tip:</strong> Positive balances indicate money owed to the person. Negative balances indicate money the person owes.
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
