import React, { useState, useMemo } from 'react';
import { Meeting } from '../../types';
import { ChevronLeft, ChevronRight, Video, Clock, Plus } from 'lucide-react';
import { getMeetingStatusStyles } from '../../utils';

interface MeetingsCalendarProps {
  meetings: Meeting[];
  onEdit: (meeting: Meeting) => void;
  onCreateAt?: (dateStr: string) => void;
}

export const MeetingsCalendar: React.FC<MeetingsCalendarProps> = ({ meetings, onEdit, onCreateAt }) => {
    // Standardize view date to the 1st of the month to prevent day-overflow bugs
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

    // Get today in IST YYYY-MM-DD
    const todayStr = useMemo(() => {
        return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
    }, []);

    const renderCells = () => {
        const cells = [];

        // Padding cells for previous month
        for (let i = 0; i < firstDayIdx; i++) {
            cells.push(
                <div key={`empty-${i}`} className="bg-slate-50/20 border-b border-r border-slate-100 min-h-[100px] lg:min-h-[140px]" />
            );
        }

        // Current month cells
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = todayStr === dateStr;
            
            // Filter and sort meetings for this day
            const dayMeetings = meetings
                .filter(m => m.dateTime.startsWith(dateStr))
                .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

            cells.push(
                <div 
                    key={day} 
                    className={`group relative border-b border-r border-slate-100 min-h-[100px] lg:min-h-[140px] p-2 transition-all hover:bg-white/60 ${isToday ? 'bg-indigo-50/20' : 'bg-white/40'}`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className={`flex items-center justify-center w-8 h-8 rounded-xl text-xs font-black transition-all ${
                            isToday ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 group-hover:text-slate-900'
                        }`}>
                            {day}
                        </span>
                        
                        {onCreateAt && (
                            <button 
                                onClick={() => onCreateAt(dateStr)}
                                className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-300 rounded-lg transition-all"
                                title="Schedule on this day"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    <div className="space-y-1.5 overflow-hidden">
                        {dayMeetings.slice(0, 3).map(meeting => (
                            <button 
                                key={meeting.id} 
                                onClick={(e) => { e.stopPropagation(); onEdit(meeting); }}
                                className={`w-full text-left p-1.5 rounded-xl border text-[10px] shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-95 ${getMeetingStatusStyles(meeting.status)} bg-white/80 backdrop-blur-sm`}
                            >
                                <div className="font-black truncate tracking-tighter uppercase leading-tight">{meeting.title}</div>
                                <div className="flex items-center gap-1 mt-0.5 opacity-60 font-bold">
                                    <Clock className="h-2.5 w-2.5" />
                                    <span>
                                        {new Date(meeting.dateTime).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' })}
                                    </span>
                                </div>
                            </button>
                        ))}
                        
                        {dayMeetings.length > 3 && (
                            <button 
                                onClick={() => onEdit(dayMeetings[3])}
                                className="w-full text-center py-1 text-[9px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors"
                            >
                                +{dayMeetings.length - 3} more syncs
                            </button>
                        )}
                    </div>
                </div>
            );
        }

        // Padding cells for next month to keep a perfect grid (typically 42 cells total for 6 rows)
        const totalVisibleCells = firstDayIdx + daysInMonth;
        const nextMonthPadding = (7 - (totalVisibleCells % 7)) % 7;
        for (let i = 0; i < nextMonthPadding; i++) {
            cells.push(
                <div key={`empty-next-${i}`} className="bg-slate-50/20 border-b border-r border-slate-100 min-h-[100px] lg:min-h-[140px]" />
            );
        }

        return cells;
    };

    return (
        <div className="bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white shadow-premium flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between p-6 lg:p-8 border-b border-slate-100">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-slate-950 flex items-center justify-center text-indigo-400 shadow-xl ring-1 ring-white/10 shrink-0">
                        <Video className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
                            {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Operational Timeline</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/40 shadow-inner">
                    <button 
                        onClick={handlePrevMonth} 
                        className="p-3 hover:bg-white text-slate-500 hover:text-indigo-600 rounded-xl transition-all shadow-sm active:scale-90"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button 
                        onClick={() => setViewDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1))}
                        className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
                    >
                        Current Cycle
                    </button>
                    <button 
                        onClick={handleNextMonth} 
                        className="p-3 hover:bg-white text-slate-500 hover:text-indigo-600 rounded-xl transition-all shadow-sm active:scale-90"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/30">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        {d}
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-7 flex-1 auto-rows-fr overflow-y-auto no-scrollbar border-l border-slate-100">
                {renderCells()}
            </div>

            <div className="p-4 bg-white/20 border-t border-slate-100 flex justify-center gap-8">
                {['Scheduled', 'Completed', 'Cancelled'].map(status => (
                    <div key={status} className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${getMeetingStatusStyles(status as any)} border-none shadow-sm`} />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};