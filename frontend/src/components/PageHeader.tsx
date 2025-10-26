import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-8 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{title}</h1>
          {description && (
            <p className="mt-2 text-lg text-gray-300">{description}</p>
          )}
        </div>
        {action && <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>{action}</div>}
      </div>
    </div>
  );
}
