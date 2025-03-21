
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Condition } from '../chat/ChatMessage';

interface ConditionCardProps {
  condition: Condition;
  className?: string;
}

export const ConditionCard: React.FC<ConditionCardProps> = ({ condition, className }) => {
  const severityIcon = {
    low: <Info className="text-medical-500" size={16} />,
    medium: <AlertTriangle className="text-amber-500" size={16} />,
    high: <AlertCircle className="text-destructive" size={16} />,
  };
  
  const severityClass = {
    low: "border-medical-200 bg-medical-50",
    medium: "border-amber-200 bg-amber-50",
    high: "border-destructive/20 bg-destructive/10",
  };
  
  return (
    <div className={cn(
      "rounded-lg border p-3 transition-all",
      severityClass[condition.severity],
      className
    )}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {severityIcon[condition.severity]}
          <h3 className="font-medium">{condition.name}</h3>
        </div>
        <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-background">
          {Math.round(condition.probability * 100)}% match
        </div>
      </div>
      
      <p className="mt-2 text-sm text-muted-foreground">{condition.description}</p>
      
      <div className="mt-2">
        <div className="w-full bg-background rounded-full h-1.5">
          <div 
            className={cn(
              "h-1.5 rounded-full",
              condition.severity === "low" ? "bg-medical-500" :
              condition.severity === "medium" ? "bg-amber-500" : "bg-destructive"
            )}
            style={{ width: `${condition.probability * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
