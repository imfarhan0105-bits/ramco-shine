import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function LoadingSpinner({ size = 'md', text, className }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={twMerge("flex flex-col items-center justify-center space-y-3 text-brand-gold", className)}>
      <Loader2 className={clsx("animate-spin", sizeClasses[size] || sizeClasses.md)} />
      {text && (
        <p className={clsx("font-medium text-brand-navy animate-pulse", textClasses[size] || textClasses.md)}>
          {text}
        </p>
      )}
    </div>
  );
}
