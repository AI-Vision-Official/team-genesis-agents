
import React from 'react';
import { cn } from '@/lib/utils';

interface VisualIndicatorProps {
  type: 'success' | 'warning' | 'error' | 'info' | 'active' | 'inactive';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
}

export const VisualIndicator = ({ type, size = 'md', pulse = false, className }: VisualIndicatorProps) => {
  const baseClasses = 'rounded-full border-2';
  
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3', 
    lg: 'w-4 h-4'
  };

  const typeClasses = {
    success: 'bg-green-500 border-green-600 shadow-green-200',
    warning: 'bg-yellow-500 border-yellow-600 shadow-yellow-200',
    error: 'bg-red-500 border-red-600 shadow-red-200',
    info: 'bg-blue-500 border-blue-600 shadow-blue-200',
    active: 'bg-emerald-500 border-emerald-600 shadow-emerald-200',
    inactive: 'bg-gray-400 border-gray-500 shadow-gray-200'
  };

  return (
    <div 
      className={cn(
        baseClasses,
        sizeClasses[size],
        typeClasses[type],
        pulse && 'animate-pulse',
        'shadow-sm',
        className
      )}
    />
  );
};
