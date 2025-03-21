
import React from 'react';
import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  className?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-medical-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-medical-500"></span>
      </span>
      <span className="text-sm text-muted-foreground">AI thinking...</span>
    </div>
  );
};

export default TypingIndicator;
