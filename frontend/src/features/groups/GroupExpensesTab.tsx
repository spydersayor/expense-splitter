import { useState } from 'react';
import { Group } from '../../types';
import { AddExpenseForm } from '../expenses/AddExpenseForm';
import { ExpensesList } from '../expenses/ExpensesList';

interface GroupExpensesTabProps {
  groupId: string;
  group: Group;
}

export function GroupExpensesTab({ groupId, group }: GroupExpensesTabProps) {
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  return (
    <div className="space-y-6">
      <AddExpenseForm
        groupId={groupId}
        group={group}
        isOpen={isAddingExpense}
        onToggle={() => setIsAddingExpense(!isAddingExpense)}
        onSuccess={() => setIsAddingExpense(false)}
      />
      <ExpensesList groupId={groupId} group={group} />
    </div>
  );
}
