import React, { useState, useMemo } from 'react';
import { Task } from '../../types';
import { ChevronLeft, ChevronRight, Plus, Clock, Target } from 'lucide-react';
import { getTaskStatusStyles, getTaskPriorityStyles } from '../../utils';

interface TasksCalendarProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onCreateAt?: (dateStr: string) => void;
}

export const TasksCalendar: React.FC<TasksCalendarProps> = ({ tasks, onEdit, onCreateAt }) => {
    const [viewDate, setViewDate] = useState(() => {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 1);
    });

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
    const firstDayIdx = useMemo(() => new Date(year, month, 1).getDay(), [year, month]);

    const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));

    const todayStr = useMemo(() => {
        return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
    }, []);

    const renderCells = () => {
        const cells = [];
        
        // Prev month padding
        for (let i = 0; i < firstDayIdx; i++) {
            cells.push(<div key={`empty-prev-${i}`} className="bg-slate-50/10 border-b border-r border-slate-100/50 min-h-[120px]" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = todayStr === dateStr;
            const dayTasks = tasks.filter(t => t.dueDate === dateStr);

            cells.push(
                <div 
                    key={day} 
                    className={`group relative border-b border-r border-slate-100 min-h-[120px] p-3 transition-all hover:bg-white/80 ${isToday ? 'bg-indigo-50/30' : 'bg-white/40'}`}
                >
                    <div className="flex justify-between items-start mb-3">
                        <span className={`flex items-center justify-center w-8 h-8 rounded-xl text-xs font-black transition-all ${
                            isToday ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110' : 'text-slate-400 group-hover:text-slate-900'
                        }`}>
                            {day}
                        </span>
                        
                        {onCreateAt && (
                            <button 
                                onClick={() => onCreateAt(dateStr)}
                                className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-300 rounded-lg transition-all"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    <div className="space-y-1.5 overflow-hidden">
                        {dayTasks.slice(0, 3).map(task => (
                            <button 
                                key={task.id} 
                                onClick={() => onEdit(task)}
                                className={`w-full text-left p-1.5 rounded-xl border text-[9px] font-black uppercase tracking-tighter shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-95 flex items-center gap-1.5 ${getTaskStatusStyles(task.status)} bg-white/60 backdrop-blur-sm`}
                            >
                                <div className={`w-1 h-1 rounded-full shrink-0 ${
                                    task.priority === 'High' ? 'bg-rose-500 animate-pulse' : 
                                    task.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                                }`} />
                                <span className="truncate">{task.title}</span>
                            </button>
                        ))}
                        
                        {dayTasks.length > 3 && (
                            <div className="text-center py-1">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                    +{dayTasks.length - 3} Milestones
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        const totalVisible = firstDayIdx + daysInMonth;
        const nextPadding = (7 - (totalVisible % 7)) % 7;
        for (let i = 0; i < nextPadding; i++) {
            cells.push(<div key={`empty-next-${i}`} className="bg-slate-50/10 border-b border-r border-slate-100/50 min-h-[120px]" />);
        }

        return cells;
    };

    return (
        <div className="bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white shadow-premium flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between p-8 border-b border-slate-100">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-[1.75rem] bg-slate-950 flex items-center justify-center text-indigo-400 shadow-2xl ring-1 ring-white/10 shrink-0">
                        <Target className="h-7 w-7" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">
                            {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-2">Temporal Execution Matrix</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 bg-slate-100/50 p-2 rounded-2xl border border-slate-200/40 shadow-inner">
                    <button 
                        onClick={handlePrevMonth} 
                        className="p-3 hover:bg-white text-slate-500 hover:text-indigo-600 rounded-xl transition-all shadow-sm active:scale-90"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button 
                        onClick={() => setViewDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1))}
                        className="px-6 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-indigo-600 transition-colors border-x border-slate-200/60"
                    >
                        Cycle Root
                    </button>
                    <button 
                        onClick={handleNextMonth} 
                        className="p-3 hover:bg-white text-slate-500 hover:text-indigo-600 rounded-xl transition-all shadow-sm active:scale-90"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/30">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                        {d}
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-7 flex-1 auto-rows-fr overflow-y-auto custom-scrollbar border-l border-slate-100">
                {renderCells()}
            </div>

            <div className="px-10 py-5 bg-white/20 border-t border-slate-100 flex items-center justify-between">
                <div className="flex gap-8">
                    {['High', 'Medium', 'Low'].map(p => (
                        <div key={p} className="flex items-center gap-2">
                            <div className={`h-1.5 w-1.5 rounded-full ${p === 'High' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : p === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{p} Priority</span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Real-time Stream: Active</span>
                </div>
            </div>
        </div>
    );
};