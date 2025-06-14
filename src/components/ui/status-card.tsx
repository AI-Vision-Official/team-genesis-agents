
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { VisualIndicator } from '@/components/ui/visual-indicator';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  title: string;
  value: string | number;
  status: 'success' | 'warning' | 'error' | 'info' | 'active' | 'inactive';
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  description?: string;
  className?: string;
}

export const StatusCard = ({ 
  title, 
  value, 
  status, 
  icon, 
  trend, 
  description,
  className 
}: StatusCardProps) => {
  const statusColors = {
    success: 'border-l-green-500 bg-green-50',
    warning: 'border-l-yellow-500 bg-yellow-50',
    error: 'border-l-red-500 bg-red-50',
    info: 'border-l-blue-500 bg-blue-50',
    active: 'border-l-emerald-500 bg-emerald-50',
    inactive: 'border-l-gray-500 bg-gray-50'
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    stable: 'text-gray-600'
  };

  const trendSymbols = {
    up: '↗',
    down: '↘',
    stable: '→'
  };

  return (
    <Card className={cn('border-l-4', statusColors[status], className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <VisualIndicator type={status} />
            <span className="text-sm font-medium text-gray-700">{title}</span>
          </div>
          {icon && <div className="text-gray-500">{icon}</div>}
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {trend && (
            <span className={cn('text-sm font-medium', trendColors[trend])}>
              {trendSymbols[trend]}
            </span>
          )}
        </div>
        
        {description && (
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};
