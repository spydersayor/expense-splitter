import { useSettlements, useDeleteSettlement } from './hooks';
import { Group } from '../../types';
import { Card, CardBody } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { EmptyState } from '../../components/EmptyState';
import { useCurrency } from '../../hooks/useCurrency';
import { ArrowRight, Handshake, Trash2 } from 'lucide-react';

interface SettlementsListProps {
  groupId: string;
  group: Group;
}

export function SettlementsList({ groupId, group }: SettlementsListProps) {
  const { data: settlements, isLoading, error } = useSettlements(groupId);
  const deleteSettlement = useDeleteSettlement();
  const { formatAmount } = useCurrency();

  if (isLoading) {
    return <LoadingSpinner className="py-12" />;
  }

  if (error) {
    return (
      <Card>
        <CardBody>
          <p className="text-center text-red-600">Failed to load settlements</p>
        </CardBody>
      </Card>
    );
  }

  if (!settlements || settlements.length === 0) {
    return (
      <Card>
        <CardBody>
          <EmptyState
            icon={<Handshake size={32} />}
            title="No settlements yet"
            description="Record payments to settle balances"
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
      <CardBody>
        <div className="space-y-3">
          {settlements.map((settlement) => (
            <div
              key={settlement.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {getMemberName(settlement.fromUserId)}
                  </span>
                  <ArrowRight className="mx-2 h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {getMemberName(settlement.toUserId)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                      {formatAmount(settlement.amount)}
                    </p>
                    {settlement.createdAt && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(settlement.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteSettlement.mutate({ id: settlement.id, groupId })}
                    disabled={deleteSettlement.isPending}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete settlement"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
