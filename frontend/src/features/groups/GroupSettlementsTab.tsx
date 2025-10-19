import { useState } from 'react';
import { Group } from '../../types';
import { AddSettlementForm } from '../settlements/AddSettlementForm';
import { SettlementsList } from '../settlements/SettlementsList';

interface GroupSettlementsTabProps {
  groupId: string;
  group: Group;
}

export function GroupSettlementsTab({ groupId, group }: GroupSettlementsTabProps) {
  const [isAddingSettlement, setIsAddingSettlement] = useState(false);

  return (
    <div className="space-y-6">
      <AddSettlementForm
        groupId={groupId}
        group={group}
        isOpen={isAddingSettlement}
        onToggle={() => setIsAddingSettlement(!isAddingSettlement)}
        onSuccess={() => setIsAddingSettlement(false)}
      />
      <SettlementsList groupId={groupId} group={group} />
    </div>
  );
}
