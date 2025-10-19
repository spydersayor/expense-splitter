import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddSettlement } from './hooks';
import { addSettlementSchema } from '../../lib/validators';
import { Group } from '../../types';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Plus, X } from 'lucide-react';

interface AddSettlementFormProps {
  groupId: string;
  group: Group;
  isOpen: boolean;
  onToggle: () => void;
  onSuccess: () => void;
}

interface SettlementFormData {
  fromUserId: string;
  toUserId: string;
  amount: number;
}

export function AddSettlementForm({ groupId, group, isOpen, onToggle, onSuccess }: AddSettlementFormProps) {
  const addSettlement = useAddSettlement();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettlementFormData>({
    resolver: zodResolver(addSettlementSchema),
    defaultValues: {
      fromUserId: group.members[0]?.id || '',
      toUserId: group.members[1]?.id || '',
      amount: 0,
    },
  });

  const onSubmit = async (data: SettlementFormData) => {
    await addSettlement.mutateAsync({
      groupId,
      fromUserId: data.fromUserId,
      toUserId: data.toUserId,
      amount: data.amount,
    });
    reset();
    onSuccess();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Settlements</h3>
          <Button size="sm" onClick={onToggle}>
            {isOpen ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
            {isOpen ? 'Cancel' : 'Record Settlement'}
          </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Select
              label="From"
              options={group.members.map((m) => ({
                value: m.id,
                label: m.name || m.email,
              }))}
              error={errors.fromUserId?.message}
              {...register('fromUserId')}
            />

            <Select
              label="To"
              options={group.members.map((m) => ({
                value: m.id,
                label: m.name || m.email,
              }))}
              error={errors.toUserId?.message}
              {...register('toUserId')}
            />

            <Input
              label="Amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              error={errors.amount?.message}
              {...register('amount', { valueAsNumber: true })}
            />

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="secondary" onClick={onToggle}>
                Cancel
              </Button>
              <Button type="submit" loading={addSettlement.isPending}>
                Record Settlement
              </Button>
            </div>
          </form>
        </CardBody>
      )}
    </Card>
  );
}
