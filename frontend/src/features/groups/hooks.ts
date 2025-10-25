import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../lib/axios';
import { Group } from '../../types';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../lib/utils';

interface BackendGroup {
  id: number;
  name: string;
  members: Array<{
    id: number;
    name?: string;
    email: string;
  }>;
  createdAt?: string;
}

function transformGroupFromBackend(backendGroup: BackendGroup): Group {
  return {
    id: backendGroup.id.toString(),
    name: backendGroup.name,
    members: backendGroup.members.map(m => ({
      id: m.id.toString(),
      name: m.name,
      email: m.email,
    })),
    createdAt: backendGroup.createdAt,
  };
}

export function useGroups() {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const response = await axios.get<BackendGroup[]>('/api/groups');
      console.log('Groups fetched from backend:', response.data);
      return response.data.map(transformGroupFromBackend);
    },
  });
}

export function useGroup(groupId: string) {
  return useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      console.log('Fetching group with ID:', groupId);
      const response = await axios.get<BackendGroup>(`/api/groups/${groupId}`);
      console.log('Group fetched from backend:', response.data);
      return transformGroupFromBackend(response.data);
    },
    enabled: !!groupId,
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const response = await axios.post<BackendGroup>('/api/groups', { name });
      return transformGroupFromBackend(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      toast.success('Group created successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error) || 'Failed to create group');
    },
  });
}

export function useAddMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ groupId, email }: { groupId: string; email: string }) => {
      const response = await axios.post<BackendGroup>(`/api/groups/${groupId}/members`, { email });
      return transformGroupFromBackend(response.data);
    },
    onSuccess: (_, variables) => {
      // Invalidate both the specific group and the groups list
      queryClient.invalidateQueries({ queryKey: ['group', variables.groupId] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      toast.success('Member added successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error) || 'Failed to add member');
    },
  });
}
