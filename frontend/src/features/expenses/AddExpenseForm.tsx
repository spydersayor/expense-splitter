import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useAddExpense } from './hooks';
import { addExpenseSchema } from '../../lib/validators';
import { Group, ExpenseShare } from '../../types';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/Switch';
import { Plus, X } from 'lucide-react';

interface AddExpenseFormProps {
  groupId: string;
  group: Group;
  isOpen: boolean;
  onToggle: () => void;
  onSuccess: () => void;
}

interface ExpenseFormData {
  description: string;
  amount: number;
  paidByUserId: string;
  shares: ExpenseShare[];
}

export function AddExpenseForm({ groupId, group, isOpen, onToggle, onSuccess }: AddExpenseFormProps) {
  const [equalSplit, setEqualSplit] = useState(true);
  const addExpense = useAddExpense();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: {
      description: '',
      amount: 0,
      paidByUserId: group.members[0]?.id || '',
      shares: group.members.map((m) => ({ userId: m.id, amount: 0 })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'shares',
  });

  const amount = watch('amount');

  const handleEqualSplit = (checked: boolean) => {
    setEqualSplit(checked);
    if (checked && amount > 0) {
      const perPerson = amount / group.members.length;
      group.members.forEach((_, index) => {
        setValue(`shares.${index}.amount`, parseFloat(perPerson.toFixed(2)));
      });
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value) || 0;
    setValue('amount', newAmount);
    if (equalSplit && newAmount > 0) {
      const perPerson = newAmount / group.members.length;
      group.members.forEach((_, index) => {
        setValue(`shares.${index}.amount`, parseFloat(perPerson.toFixed(2)));
      });
    }
  };

  const onSubmit = async (data: ExpenseFormData) => {
    await addExpense.mutateAsync({
      groupId,
      description: data.description,
      amount: data.amount,
      paidByUserId: data.paidByUserId,
      shares: data.shares,
    });
    reset();
    onSuccess();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Expenses</h3>
          <Button size="sm" onClick={onToggle}>
            {isOpen ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
            {isOpen ? 'Cancel' : 'Add Expense'}
          </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Description"
              placeholder="e.g., Dinner at restaurant"
              error={errors.description?.message}
              {...register('description')}
            />

            <Input
              label="Amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              error={errors.amount?.message}
              {...register('amount', { valueAsNumber: true })}
              onChange={handleAmountChange}
            />

            <Select
              label="Paid by"
              options={group.members.map((m) => ({
                value: m.id,
                label: m.name || m.email,
              }))}
              error={errors.paidByUserId?.message}
              {...register('paidByUserId')}
            />

            <div>
              <Switch
                checked={equalSplit}
                onChange={handleEqualSplit}
                label="Split equally"
              />
            </div>

            {!equalSplit && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Custom shares
                </label>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[120px]">
                      {group.members[index]?.name || group.members[index]?.email}
                    </span>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register(`shares.${index}.amount`, { valueAsNumber: true })}
                    />
                    <input type="hidden" {...register(`shares.${index}.userId`)} />
                  </div>
                ))}
                {errors.shares && (
                  <p className="text-sm text-red-600">{errors.shares.message}</p>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="secondary" onClick={onToggle}>
                Cancel
              </Button>
              <Button type="submit" loading={addExpense.isPending}>
                Add Expense
              </Button>
            </div>
          </form>
        </CardBody>
      )}
    </Card>
  );
}
