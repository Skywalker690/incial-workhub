import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { tasksApi, meetingsApi, crmApi } from '../services/api';
import { Task, Meeting, TaskStatus, MeetingStatus } from '../types';
import { ChevronLeft, ChevronRight, CheckSquare, Video, Clock, Filter, Calendar, Briefcase, X, Plus, AlertCircle, MoreHorizontal, Target, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useLayout } from '../context/LayoutContext';

type CalendarItem = {
    id: string; 
    dateStr: string; 
    sortTime: number; 
    title: string;
    type: 'task' | 'meeting';
    data: Task | Meeting;
    status: string;
    priority?: string; 
};

export const UniversalCalendarPage: React.FC = () => {
    const { user } = useAuth();
    const { showToast } = useToast();
    const { isSidebarCollapsed } = useLayout();
    const [items, setItems] = useState<CalendarItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [companyMap, setCompanyMap] = useState<Record<number, string>>({});

    const [showTasks, setShowTasks] = useState(true);
    const [showMeetings, setShowMeetings] = useState(true);

    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editingMeeting, setEditingMeeting] = useState<Meeting | undefined>(undefined);
    const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [tasksData, meetingsData, crmData] = await Promise.all([
                tasksApi.getAll(),
                meetingsApi.getAll(),
                crmApi.getAll()
            ]);

            const map: Record<number, string> = {};
            crmData.crmList.forEach(c => map[c.id] = c.company);
            setCompanyMap(map);

            const allItems: CalendarItem[] = [];
            tasksData.forEach(t => {
                if (t.status !== 'Completed' && t.status !== 'Done') { 
                    allItems.push({
                        id: `task-${t.id}`,
                        dateStr: t.dueDate,
                        sortTime: 0,
                        title: t.title,
                        type: 'task',
                        data: t,
                        status: t.status,
                        priority: t.priority
                    });
                }
            });

            meetingsData.forEach(m => {
                const mDate = new Date(m.dateTime);
                const localDateStr = `${mDate.getFullYear()}-${String(mDate.getMonth() + 1).padStart(2, '0')}-${String(mDate.getDate()).padStart(2, '0')}`;
                allItems.push({
                    id: `meeting-${m.id}`,
                    dateStr: localDateStr,
                    sortTime: mDate.getTime(),
                    title: m.title,
                    type: 'meeting',
                    data: m,
                    status: m.status
                });
            });

            setItems(allItems);
        } catch (e) {
            console.error(e);
            showToast("Sync failed", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const renderCells = () => {
        const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const totalDays = daysInMonth(currentDate);
        const startDay = firstDayOfMonth(currentDate);
        const cells = [];

        for (let i = 0; i < startDay; i++) {
            cells.push(<div key={`empty-${i}`} className="bg-gray-50/10 border-b border-r border-gray-100 min-h-[120px] lg:min-h-[140px]" />);
        }

        const todayStr = new Date().toISOString().split('T')[0];

        for (let day = 1; day <= totalDays; day++) {
            const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayItems = items.filter(i => i.dateStr === dateStr && ((i.type === 'task' && showTasks) || (i.type === 'meeting' && showMeetings)));
            const isToday = todayStr === dateStr;

            cells.push(
                <div key={day} className={`border-b border-r border-gray-100 min-h-[120px] lg:min-h-[140px] p-2 hover:bg-white/40 transition-colors relative flex flex-col ${isToday ? 'bg-indigo-50/20' : ''}`}>
                    <div className={`text-xs lg:text-sm font-black w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center rounded-xl mb-2 ${isToday ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' : 'text-slate-400'}`}>
                        {day}
                    </div>
                    <div className="space-y-1.5 flex-1 overflow-hidden">
                        {dayItems.slice(0, 4).map(item => (
                            <div key={item.id} className={`p-1 lg:p-1.5 rounded-lg border text-[9px] lg:text-[10px] font-black uppercase tracking-tighter truncate shadow-sm ${item.type === 'task' ? 'bg-white border-blue-100 text-blue-800' : 'bg-brand-900 border-brand-950 text-white'}`}>
                                {item.title}
                            </div>
                        ))}
                        {dayItems.length > 4 && <div className="text-[8px] lg:text-[9px] font-black text-slate-400 pl-1">+{dayItems.length - 4} MORE</div>}
                    </div>
                </div>
            );
        }
        return cells;
    };

    return (
        <div className="flex min-h-screen mesh-bg relative">
            <div className="glass-canvas" />
            <Sidebar />
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-500 ease-in-out ${isSidebarCollapsed ? 'lg:ml-28' : 'lg:ml-80'}`}>
                <Navbar />
                
                <div className="px-4 lg:px-12 py-6 lg:py-10 pb-32">
                    <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 lg:gap-8 mb-8 lg:mb-12 animate-premium">
                        <div>
                            <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none display-text">Universal.</h1>
                            <p className="text-sm lg:text-lg text-slate-500 mt-2 lg:mt-4 font-medium">Synced strategic timeline and event registry.</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md p-1.5 lg:p-2 rounded-2xl lg:rounded-[2rem] border border-white w-full sm:w-auto justify-between">
                             <button onClick={handlePrevMonth} className="p-3 lg:p-4 hover:bg-white rounded-xl lg:rounded-2xl transition-all"><ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" /></button>
                             <span className="text-lg lg:text-xl font-black text-slate-900 min-w-[140px] lg:min-w-[200px] text-center">{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                             <button onClick={handleNextMonth} className="p-3 lg:p-4 hover:bg-white rounded-xl lg:rounded-2xl transition-all"><ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" /></button>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] lg:rounded-[3.5rem] border border-white shadow-premium overflow-hidden flex flex-col flex-1 min-h-[500px] lg:min-h-[600px]">
                        {/* Wrapper for horizontal scroll on mobile */}
                        <div className="overflow-x-auto custom-scrollbar h-full">
                            <div className="min-w-[800px] h-full flex flex-col">
                                <div className="grid grid-cols-7 bg-gray-50/50 border-b border-gray-100">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                        <div key={d} className="py-4 lg:py-5 text-center text-[10px] lg:text-xs font-black text-gray-400 uppercase tracking-[0.25em]">{d}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                                    {isLoading ? <div className="col-span-7 flex items-center justify-center p-32"><div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-100 border-t-brand-600" /></div> : renderCells()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
