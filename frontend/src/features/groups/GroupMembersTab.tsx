import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddMember } from './hooks';
import { addMemberSchema } from '../../lib/validators';
import { Group } from '../../types';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/EmptyState';
import { Users, Plus } from 'lucide-react';

interface GroupMembersTabProps {
  group: Group;
}

interface AddMemberForm {
  email: string;
}

export function GroupMembersTab({ group }: GroupMembersTabProps) {
  const [isAddingMember, setIsAddingMember] = useState(false);
  const addMember = useAddMember();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddMemberForm>({
    resolver: zodResolver(addMemberSchema),
  });

  const onSubmit = async (data: AddMemberForm) => {
    await addMember.mutateAsync({ groupId: group.id, email: data.email });
    reset();
    setIsAddingMember(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Group Members
            </h3>
            <Button
              size="sm"
              onClick={() => setIsAddingMember(!isAddingMember)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          {isAddingMember && (
            <form onSubmit={handleSubmit(onSubmit)} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex gap-2">
                <Input
                  placeholder="member@example.com"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Button type="submit" loading={addMember.isPending}>
                  Add
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    reset();
                    setIsAddingMember(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {group.members.length === 0 ? (
            <EmptyState
              icon={<Users size={32} />}
              title="No members yet"
              description="Add members to start splitting expenses"
            />
          ) : (
            <div className="space-y-2">
              {group.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {member.name || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
