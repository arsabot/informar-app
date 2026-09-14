import React from 'react';
import { LucideIcon } from 'lucide-react';
import { TooltipHelp } from './TooltipHelp';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  termKey?: string;
  badge?: {
    text: string;
    variant?: 'emerald' | 'sky' | 'amber' | 'slate' | 'indigo';
  };
  progress?: number; // 0-100
  accentColor?: 'sky' | 'emerald' | 'indigo' | 'amber' | 'slate';
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  termKey,
  badge,
  progress,
  accentColor = 'sky',
  onClick,
  className = ''
}) => {
  const accentStyles = {
    sky: 'bg-sky-50 text-sky-600 border-sky-100 group-hover:bg-sky-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-100',
    slate: 'bg-slate-100 text-slate-700 border-slate-200 group-hover:bg-slate-200',
  };

  const badgeStyles = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    sky: 'bg-sky-50 text-sky-700 border-sky-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-2xl p-5 border border-slate-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-200 group relative ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>{title}</span>
            {termKey && <TooltipHelp termKey={termKey} />}
          </div>
          
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {value}
          </div>
        </div>

        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${accentStyles[accentColor]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {progress !== undefined && (
        <div className="mt-3.5 space-y-1.5">
          <div className="flex justify-between text-[11px] font-medium text-slate-500">
            <span>Progreso registrado</span>
            <span className="font-bold text-slate-800">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                accentColor === 'emerald' ? 'bg-emerald-500' :
                accentColor === 'amber' ? 'bg-amber-500' :
                accentColor === 'indigo' ? 'bg-indigo-500' : 'bg-sky-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}

      {(subtitle || badge) && (
        <div className="mt-3 pt-3 border-t border-slate-100/90 flex items-center justify-between gap-2 text-xs">
          {subtitle && (
            <span className="text-slate-500 font-medium line-clamp-1">
              {subtitle}
            </span>
          )}
          {badge && (
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${badgeStyles[badge.variant || 'slate']}`}>
              {badge.text}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
