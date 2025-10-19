import { useExpenses } from './hooks';
import { Group } from '../../types';
import { Card, CardBody } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { EmptyState } from '../../components/EmptyState';
import { formatCurrency } from '../../lib/currency';
import { Receipt } from 'lucide-react';

interface ExpensesListProps {
  groupId: string;
  group: Group;
}

export function ExpensesList({ groupId, group }: ExpensesListProps) {
  const { data: expenses, isLoading, error } = useExpenses(groupId);

  if (isLoading) {
    return <LoadingSpinner className="py-12" />;
  }

  if (error) {
    return (
      <Card>
        <CardBody>
          <p className="text-center text-red-600">Failed to load expenses</p>
        </CardBody>
      </Card>
    );
  }

  if (!expenses || expenses.length === 0) {
    return (
      <Card>
        <CardBody>
          <EmptyState
            icon={<Receipt size={32} />}
            title="No expenses yet"
            description="Add your first expense to start tracking"
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
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {expense.description}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Paid by {getMemberName(expense.paidByUserId)}
                  </p>
                  {expense.createdAt && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {new Date(expense.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {formatCurrency(expense.amount)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {expense.shares.length} {expense.shares.length === 1 ? 'person' : 'people'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
