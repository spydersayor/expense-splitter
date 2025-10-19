import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {icon && <div className="flex justify-center mb-4 text-gray-400">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
      {description && <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
