
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showText?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export const ProgressRing = ({ 
  progress, 
  size = 60, 
  strokeWidth = 6, 
  className,
  showText = false,
  color = 'blue'
}: ProgressRingProps) => {
  const normalizedRadius = (size - strokeWidth) / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colorClasses = {
    blue: 'stroke-blue-500',
    green: 'stroke-green-500',
    purple: 'stroke-purple-500',
    orange: 'stroke-orange-500',
    red: 'stroke-red-500'
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        height={size}
        width={size}
        className="transform -rotate-90"
      >
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          className="stroke-gray-200"
        />
        <circle
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          className={cn(colorClasses[color], 'transition-all duration-500 ease-in-out')}
        />
      </svg>
      {showText && (
        <span className="absolute text-sm font-semibold">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
};
