import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Info, X } from 'lucide-react';
import { GLOSSARY } from '../../data/glossary';

interface TooltipHelpProps {
  termKey?: keyof typeof GLOSSARY | string;
  customTitle?: string;
  customText?: string;
  className?: string;
  position?: 'top' | 'bottom' | 'right';
}

export const TooltipHelp: React.FC<TooltipHelpProps> = ({
  termKey,
  customTitle,
  customText,
  className = '',
  position = 'top'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const termData = termKey && GLOSSARY[termKey] ? GLOSSARY[termKey] : null;
  const title = customTitle || termData?.term || 'Concepto';
  const text = customText || termData?.shortDefinition || '';
  const extended = termData?.extendedDefinition;
  const example = termData?.practicalExample;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <span className={`inline-flex items-center relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => setIsOpen(true)}
        className="text-slate-400 hover:text-sky-600 transition-colors p-0.5 rounded-full hover:bg-sky-50 focus:outline-none cursor-pointer"
        aria-label={`Explicación de ${title}`}
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          onMouseLeave={() => setIsOpen(false)}
          className={`absolute z-50 w-72 sm:w-80 p-3.5 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700 text-xs leading-relaxed animate-in fade-in zoom-in-95 duration-100 ${
            position === 'top' 
              ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' 
              : position === 'right' 
                ? 'left-full top-1/2 -translate-y-1/2 ml-2' 
                : 'top-full left-1/2 -translate-x-1/2 mt-2'
          }`}
        >
          <div className="flex items-center justify-between font-bold text-sky-300 pb-1.5 border-b border-slate-800">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              {title}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <p className="mt-2 text-slate-200">{text}</p>
          
          {extended && (
            <p className="mt-1.5 text-slate-400 text-[11px] border-t border-slate-800 pt-1.5">
              {extended}
            </p>
          )}

          {example && (
            <div className="mt-2 bg-slate-800/80 p-2 rounded-lg text-[11px] text-sky-200 border border-slate-700/50">
              <strong className="text-sky-300 block mb-0.5">💡 En la práctica:</strong>
              {example}
            </div>
          )}
        </div>
      )}
    </span>
  );
};
