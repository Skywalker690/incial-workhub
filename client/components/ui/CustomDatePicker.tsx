import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CustomDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (date: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ 
  value, 
  onChange, 
  placeholder = "Pick a date",
  label,
  className = ""
}) => {
  const parseDate = (dateStr: string) => {
    if (!dateStr) return new Date();
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return new Date(dateStr); 
  };

  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => parseDate(value));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => { if(value) setViewDate(parseDate(value)); }, [value]);

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handleDateClick = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    onChange(`${year}-${month}-${d}`);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em] ml-1">{label}</label>}
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-5 py-4 bg-white border rounded-[1.5rem] text-sm cursor-pointer transition-all duration-300 shadow-sm ${
          isOpen ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-gray-200 hover:border-indigo-300'
        }`}
      >
        <div className="flex items-center gap-3">
            <CalendarIcon className={`h-4 w-4 ${value ? 'text-indigo-600' : 'text-slate-300'}`} />
            <span className={`font-bold ${value ? 'text-slate-900' : 'text-slate-300'}`}>
                {value ? parseDate(value).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : placeholder}
            </span>
        </div>
        {value && <X className="h-3.5 w-3.5 text-slate-300 hover:text-slate-500" onClick={(e) => { e.stopPropagation(); onChange(''); }} />}
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 bg-white/95 backdrop-blur-2xl border border-white/60 rounded-[1.5rem] shadow-2xl z-[9999] p-6 w-[320px] animate-premium origin-top-right">
            <div className="flex items-center justify-between mb-6">
                <button type="button" onClick={(e) => { e.stopPropagation(); setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)); }} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><ChevronLeft className="h-4 w-4" /></button>
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                <button type="button" onClick={(e) => { e.stopPropagation(); setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)); }} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><ChevronRight className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                    <div key={d} className="h-10 flex items-center justify-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 42 }).map((_, i) => {
                    const start = firstDayOfMonth(viewDate);
                    const dayNum = i - start + 1;
                    if (dayNum <= 0 || dayNum > daysInMonth(viewDate)) return <div key={i} className="h-10" />;
                    const dStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                    const isSelected = value === dStr;
                    return (
                        <button key={i} type="button" onClick={() => handleDateClick(dayNum)} className={`h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'}`}>
                            {dayNum}
                        </button>
                    );
                })}
            </div>
        </div>
      )}
    </div>
  );
};