import { useExpenses } from './hooks';
import { Group } from '../../types';
import { Card, CardBody } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { EmptyState } from '../../components/EmptyState';
import { useCurrency } from '../../hooks/useCurrency';
import { Receipt } from 'lucide-react';

interface ExpensesListProps {
  groupId: string;
  group: Group;
}

export function ExpensesList({ groupId, group }: ExpensesListProps) {
  const { data: expenses, isLoading, error } = useExpenses(groupId);
  const { formatAmount } = useCurrency();

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
    <Card className="animate-slide-up">
      <CardBody>
        <div className="space-y-3">
          {expenses.map((expense, index) => (
            <div
              key={expense.id}
              className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-102 border border-gray-200/50 dark:border-gray-600/50 animate-fade-in"
              style={{animationDelay: `${index * 0.05}s`}}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <Receipt className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                      {expense.description}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-13">
                    Paid by <span className="font-medium text-blue-600 dark:text-blue-400">{getMemberName(expense.paidByUserId)}</span>
                  </p>
                  {expense.createdAt && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 ml-13">
                      {new Date(expense.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {formatAmount(expense.amount)}
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
