import { useBalances } from '../balances/hooks';
import { GroupBalancesCard } from '../balances/GroupBalancesCard';
import { useExpenses } from '../expenses/hooks';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { formatCurrency } from '../../lib/currency';
import { Receipt, TrendingUp } from 'lucide-react';

interface GroupOverviewTabProps {
  groupId: string;
}

export function GroupOverviewTab({ groupId }: GroupOverviewTabProps) {
  const { data: balances, isLoading: balancesLoading } = useBalances(groupId);
  const { data: expenses, isLoading: expensesLoading } = useExpenses(groupId);

  if (balancesLoading || expensesLoading) {
    return <LoadingSpinner className="py-12" />;
  }

  const totalExpenses = expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;
  const expenseCount = expenses?.length || 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Receipt className="mr-2 h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Total Expenses
              </h3>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(totalExpenses)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {expenseCount} {expenseCount === 1 ? 'expense' : 'expenses'}
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Active Members
              </h3>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {balances?.totals.length || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              members with balances
            </p>
          </CardBody>
        </Card>
      </div>

      <GroupBalancesCard groupId={groupId} />
    </div>
  );
}
