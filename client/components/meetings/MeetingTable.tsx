import React, { useState, useRef, useEffect } from 'react';
import { Meeting, MeetingStatus } from '../../types';
import { formatDateTime, getMeetingStatusStyles } from '../../utils';
import { Video, Calendar, Link as LinkIcon, ExternalLink, ChevronDown, Check, Clock } from 'lucide-react';

interface MeetingTableProps {
  data: Meeting[];
  onEdit: (meeting: Meeting) => void;
  onStatusChange: (meeting: Meeting, newStatus: MeetingStatus) => void;
}

const MeetingStatusDropdown = ({ meeting, onStatusChange }: { meeting: Meeting; onStatusChange: (m: Meeting, s: MeetingStatus) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const options: MeetingStatus[] = ['Scheduled', 'Completed', 'Cancelled', 'Postponed'];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={ref}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm transition-all active:scale-95 ${getMeetingStatusStyles(meeting.status)}`}
            >
                {meeting.status}
                <ChevronDown className={`h-3 w-3 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 z-[100] mt-3 w-40 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60 overflow-hidden animate-premium">
                    <div className="p-1.5 space-y-0.5">
                        {options.map(opt => (
                            <button
                                key={opt}
                                onClick={() => { onStatusChange(meeting, opt); setIsOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 text-[11px] font-bold rounded-xl text-left transition-colors ${
                                    meeting.status === opt ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {opt}
                                {meeting.status === opt && <Check className="h-3 w-3 text-white ml-auto" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export const MeetingTable: React.FC<MeetingTableProps> = ({ data, onEdit, onStatusChange }) => {
  return (
    <div className="overflow-x-auto no-scrollbar pb-24">
        <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    <th className="px-6 py-4">Session Title</th>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Channel</th>
                </tr>
            </thead>
            <tbody>
                {data.map(meeting => (
                    <tr key={meeting.id} className="group">
                        <td className="px-8 py-5 bg-white/40 backdrop-blur-xl rounded-l-3xl border-y border-l border-white/60 shadow-sm group-hover:bg-white transition-all duration-500">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <button onClick={() => onEdit(meeting)} className="font-black text-sm text-slate-900 hover:text-brand-600 transition-colors text-left tracking-tight">
                                    {meeting.title}
                                </button>
                            </div>
                        </td>

                        <td className="px-6 py-4 bg-white/40 border-y border-white/60 group-hover:bg-white transition-all duration-500">
                             <div className="flex flex-col">
                                <span className="text-xs font-black text-slate-800 tracking-tight">
                                    {new Date(meeting.dateTime).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Kolkata' })}
                                </span>
                                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5 flex items-center gap-1">
                                    <Clock className="h-2.5 w-2.5" />
                                    {new Date(meeting.dateTime).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' })}
                                </span>
                            </div>
                        </td>

                        <td className="px-6 py-4 bg-white/40 border-y border-white/60 group-hover:bg-white transition-all duration-500">
                            <MeetingStatusDropdown meeting={meeting} onStatusChange={onStatusChange} />
                        </td>

                        <td className="px-8 py-5 bg-white/40 backdrop-blur-xl rounded-r-3xl border-y border-r border-white/60 shadow-sm group-hover:bg-white transition-all duration-500 text-right">
                            {meeting.meetingLink ? (
                                <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                                    <Video className="h-3.5 w-3.5 text-indigo-400" /> Open Channel
                                </a>
                            ) : <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Offline Only</span>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};