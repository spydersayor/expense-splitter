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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, index) => (
            <Card
              key={group.id}
              className="cursor-pointer hover:scale-105 hover:-translate-y-1 transition-all duration-300 group animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={() => navigate(`/groups/${group.id}`)}
            >
              <CardBody className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                      {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {group.name}
                  </h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-full transition-all duration-500"></div>
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
