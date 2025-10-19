import { useBalances } from './hooks';
import { useGroup } from '../groups/hooks';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { EmptyState } from '../../components/EmptyState';
import { formatCurrency } from '../../lib/currency';
import { Scale } from 'lucide-react';

interface GroupBalancesCardProps {
  groupId: string;
}

export function GroupBalancesCard({ groupId }: GroupBalancesCardProps) {
  const { data: balances, isLoading: balancesLoading } = useBalances(groupId);
  const { data: group, isLoading: groupLoading } = useGroup(groupId);

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
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Balances</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          {balances.totals.map((total) => (
            <div
              key={total.userId}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
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
                {formatCurrency(total.balance)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Tip:</strong> Positive balances indicate money owed to the person. Negative balances indicate money the person owes.
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
