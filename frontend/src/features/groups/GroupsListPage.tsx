import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGroups } from './hooks';
import { PageHeader } from '../../components/PageHeader';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/EmptyState';
import { CreateGroupModal } from './CreateGroupModal';
import { Users, Plus } from 'lucide-react';

export function GroupsListPage() {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data: groups, isLoading, error } = useGroups();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<Users size={48} />}
        title="Failed to load groups"
        description="There was an error loading your groups. Please try again."
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="My Groups"
        description="Manage your expense groups"
        action={
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        }
      />

      {!groups || groups.length === 0 ? (
        <EmptyState
          icon={<Users size={48} />}
          title="No groups yet"
          description="Create your first group to start tracking expenses"
          action={
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <Card
              key={group.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/groups/${group.id}`)}
            >
              <CardBody>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {group.name}
                </h3>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Users className="mr-2 h-4 w-4" />
                  {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
