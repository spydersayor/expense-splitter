import { useParams, useNavigate } from 'react-router-dom';
import { useGroup } from './hooks';
import { Tabs } from '../../components/ui/Tabs';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { GroupOverviewTab } from './GroupOverviewTab';
import { GroupMembersTab } from './GroupMembersTab';
import { GroupExpensesTab } from './GroupExpensesTab';
import { GroupSettlementsTab } from './GroupSettlementsTab';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function GroupDetailLayout() {
  const { groupId, tab = 'overview' } = useParams<{ groupId: string; tab?: string }>();
  const navigate = useNavigate();
  const { data: group, isLoading, error } = useGroup(groupId!);

  if (isLoading) {
    return <LoadingSpinner className="py-12" />;
  }

  if (error || !group) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load group details</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', content: <GroupOverviewTab groupId={groupId!} /> },
    { id: 'members', label: 'Members', content: <GroupMembersTab group={group} /> },
    { id: 'expenses', label: 'Expenses', content: <GroupExpensesTab groupId={groupId!} group={group} /> },
    { id: 'settlements', label: 'Settlements', content: <GroupSettlementsTab groupId={groupId!} group={group} /> },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/groups')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{group.name}</h1>
        </div>
      </div>

      <Tabs
        tabs={tabs}
        activeTab={tab || 'overview'}
        onTabChange={(tabId) => navigate(`/groups/${groupId}/${tabId}`)}
      />
    </div>
  );
}
