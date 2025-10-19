import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateGroup } from './hooks';
import { createGroupSchema } from '../../lib/validators';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CreateGroupForm {
  name: string;
}

export function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const createGroup = useCreateGroup();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGroupForm>({
    resolver: zodResolver(createGroupSchema),
  });

  const onSubmit = async (data: CreateGroupForm) => {
    await createGroup.mutateAsync(data.name);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Group">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Group Name"
          placeholder="e.g., Summer Trip 2024"
          error={errors.name?.message}
          {...register('name')}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={createGroup.isPending}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
