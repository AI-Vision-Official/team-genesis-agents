
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  disabled?: boolean;
  className?: string;
  showLabel?: boolean;
}

export const IconButton = ({ 
  icon, 
  label, 
  onClick, 
  variant = 'outline',
  size = 'md',
  active = false,
  disabled = false,
  className,
  showLabel = true
}: IconButtonProps) => {
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  };

  return (
    <Button
      variant={active ? 'default' : variant}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex flex-col items-center gap-1 h-auto min-h-[60px]',
        sizeClasses[size],
        active && 'ring-2 ring-blue-500 ring-offset-2',
        className
      )}
    >
      <div className="text-xl">{icon}</div>
      {showLabel && (
        <span className="text-xs font-medium leading-tight text-center">
          {label}
        </span>
      )}
    </Button>
  );
};
