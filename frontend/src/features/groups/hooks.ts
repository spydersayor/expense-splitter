import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../lib/axios';
import { Group } from '../../types';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../lib/utils';

export function useGroups() {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const response = await axios.get<Group[]>('/api/groups');
      return response.data;
    },
  });
}

export function useGroup(groupId: string) {
  return useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      const response = await axios.get<Group>(`/api/groups/${groupId}`);
      return response.data;
    },
    enabled: !!groupId,
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const response = await axios.post<Group>('/api/groups', { name });
      return response.data;
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
      const response = await axios.post<Group>(`/api/groups/${groupId}/members`, { email });
      return response.data;
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
