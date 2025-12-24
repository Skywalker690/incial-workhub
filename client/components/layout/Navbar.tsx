import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, PanelLeft, Plus, Search, User, LogOut, Shield, Sparkles, CheckCircle2, Gamepad2, Calendar, Zap, HelpCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLayout } from '../../context/LayoutContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { toggleSidebar } = useLayout();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);
  }, [location.pathname]);

  const getPageContext = () => {
      const path = location.pathname;
      if (path === '/dashboard') return 'Operational Intel';
      if (path === '/crm') return 'Market Pipeline';
      if (path.startsWith('/tasks')) return 'Execution Workflow';
      if (path === '/portal') return 'Client Interface';
      if (path === '/calendar') return 'Temporal Registry';
      return 'Workhub OS';
  };

  return (
    <header className="h-[80px] lg:h-[110px] flex items-center justify-between px-4 lg:px-10 sticky top-0 z-40 bg-transparent pointer-events-none">
      
      {/* Context HUD */}
      <div className="flex items-center gap-3 lg:gap-8 flex-1 max-w-3xl pointer-events-auto">
          <button 
            onClick={toggleSidebar}
            className="p-3 lg:p-4 text-slate-500 hover:text-brand-600 glass-panel rounded-2xl lg:rounded-3xl transition-all shadow-premium active:scale-95 group border-white/40"
          >
            <PanelLeft className="h-5 w-5 lg:h-6 lg:w-6 group-hover:rotate-180 transition-transform duration-500" />
          </button>

          <div className="flex-1 flex flex-col">
             <div className="flex items-center gap-2 mb-0.5 lg:mb-1">
                 <div className="h-1 lg:h-1.5 w-1 lg:w-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                 <span className="text-[9px] lg:text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] lg:tracking-[0.4em] truncate">{getPageContext()}</span>
             </div>
             <div className="relative group hidden sm:block">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Deep Search... (⌘K)"
                    className="w-full pl-6 lg:pl-8 pr-4 lg:pr-12 py-1 lg:py-2 bg-transparent text-sm lg:text-lg font-bold text-slate-900 placeholder-slate-300 border-none focus:ring-0 focus:outline-none transition-all"
                />
             </div>
          </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3 lg:gap-6 ml-auto pointer-events-auto">
        <div className="flex items-center gap-2 lg:gap-5">
            <Link 
                to="/tasks"
                className="hidden sm:flex items-center gap-3 px-4 lg:px-6 py-2.5 lg:py-3.5 bg-slate-950 text-white rounded-2xl lg:rounded-3xl shadow-2xl hover:scale-[1.03] active:scale-95 transition-all group overflow-hidden relative"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Plus className="h-4 w-4 lg:h-5 lg:w-5 text-indigo-400 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] relative z-10 hidden xl:block">Deploy</span>
            </Link>

            <div className="h-6 lg:h-8 w-px bg-slate-200/60 hidden sm:block"></div>

            {/* Universal Calendar Shortcut */}
            <Link 
                to="/calendar"
                className={`p-3 lg:p-4 glass-panel rounded-2xl lg:rounded-3xl shadow-premium transition-all relative group border-white/40 ${location.pathname === '/calendar' ? 'bg-white/80 ring-2 ring-indigo-500/20 text-indigo-600 shadow-glass-glow' : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'}`}
                title="Universal Calendar"
            >
                <Calendar className={`h-5 w-5 lg:h-6 lg:w-6 ${location.pathname === '/calendar' ? 'text-indigo-600' : 'group-hover:scale-110'} transition-all`} />
            </Link>

            <div className="relative" ref={notifyRef}>
                <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className={`p-3 lg:p-4 glass-panel rounded-2xl lg:rounded-3xl shadow-premium transition-all relative group border-white/40 ${isNotificationsOpen ? 'bg-white/80 ring-2 ring-indigo-500/20' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    <Bell className={`h-5 w-5 lg:h-6 lg:w-6 ${isNotificationsOpen ? 'text-indigo-600' : 'group-hover:animate-bounce'}`} />
                    <span className="absolute top-3 right-3 lg:top-4 lg:right-4 h-2 lg:h-2.5 w-2 lg:w-2.5 rounded-full bg-indigo-500 border-[3px] border-white shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                </button>

                {isNotificationsOpen && (
                    <div className="absolute right-0 mt-4 w-72 lg:w-80 bg-white/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-2xl p-6 lg:p-8 animate-in fade-in zoom-in-95 duration-200 origin-top-right ring-1 ring-white/50">
                        <div className="flex items-center justify-between mb-6 lg:mb-8">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Signal Intelligence</h3>
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />
                        </div>
                        <div className="flex flex-col items-center justify-center py-6 lg:py-10 text-center">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse" />
                                <CheckCircle2 className="h-10 w-10 lg:h-12 lg:w-12 text-indigo-500 relative z-10" />
                            </div>
                            <p className="text-sm font-bold text-slate-900">All Systems Nominal</p>
                            <p className="text-[10px] font-medium text-slate-400 mt-2 uppercase tracking-widest leading-relaxed">No high-priority alerts <br/> detected in this cycle.</p>
                        </div>
                        <button className="w-full mt-4 lg:mt-6 py-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest transition-colors">
                            View Log Archive
                        </button>
                    </div>
                )}
            </div>
        </div>

        <div className="h-6 lg:h-8 w-px bg-slate-200/60 hidden sm:block"></div>
        
        <div className="relative" ref={profileRef}>
            <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`group flex items-center gap-3 lg:gap-4 glass-panel p-1.5 lg:p-2 pr-1.5 lg:pr-6 rounded-full lg:rounded-[2rem] shadow-premium transition-all active:scale-95 border-white/40 ${isProfileOpen ? 'bg-white/90 ring-2 ring-indigo-500/20' : 'hover:bg-white/80'}`}
            >
                <div className="h-9 w-9 lg:h-11 lg:w-11 rounded-full lg:rounded-[1.25rem] bg-gradient-to-tr from-indigo-600 to-indigo-400 p-0.5 shadow-xl group-hover:shadow-indigo-500/30 transition-shadow">
                    <div className="h-full w-full rounded-full lg:rounded-[1.1rem] bg-white overflow-hidden flex items-center justify-center font-black text-indigo-700 text-xs lg:text-sm">
                        {user?.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.name} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                        ) : (
                            user?.name?.charAt(0)
                        )}
                    </div>
                </div>
                <div className="text-left hidden xl:block">
                    <p className="text-sm font-black text-slate-900 leading-none">{user?.name?.split(' ')[0]}</p>
                    <p className="text-[9px] font-bold text-slate-400 mt-1.5 uppercase tracking-[0.2em] leading-none">{user?.role.replace('ROLE_', '')}</p>
                </div>
                <ChevronDown className={`hidden xl:block h-4 w-4 text-slate-300 transition-transform duration-500 ${isProfileOpen ? 'rotate-180' : 'group-hover:text-slate-600'}`} />
            </button>

            {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-72 lg:w-80 bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 origin-top-right ring-1 ring-white/50 p-2">
                    
                    {/* User Identity Card */}
                    <div className="p-5 bg-white/60 rounded-[2rem] border border-white/80 mb-2 flex items-center gap-5 shadow-sm">
                         <div className="h-12 w-12 lg:h-14 lg:w-14 rounded-2xl lg:rounded-[1.25rem] bg-slate-900 text-white flex items-center justify-center text-lg lg:text-xl font-black shadow-lg overflow-hidden shrink-0">
                            {user?.avatarUrl ? <img src={user.avatarUrl} referrerPolicy="no-referrer" className="h-full w-full object-cover" /> : user?.name.charAt(0)}
                         </div>
                         <div className="min-w-0">
                             <h4 className="text-sm font-black text-slate-900 truncate">{user?.name}</h4>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{user?.email}</p>
                             <div className="flex items-center gap-1.5 mt-2 bg-emerald-50 w-fit px-2 py-0.5 rounded-md border border-emerald-100">
                                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                 <span className="text-[8px] font-black text-emerald-600 uppercase tracking-wider">Node Active</span>
                             </div>
                         </div>
                    </div>

                    {/* Navigation Menu */}
                    <div className="space-y-1 p-1">
                        <Link to="/profile" className="flex items-center gap-4 px-4 py-3.5 rounded-[1.5rem] hover:bg-white hover:shadow-md transition-all group">
                            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform">
                                <User className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-700">Identity Profile</p>
                                <p className="text-[9px] font-medium text-slate-400">Personal settings & security</p>
                            </div>
                        </Link>

                        <Link to="/break" className="flex items-center gap-4 px-4 py-3.5 rounded-[1.5rem] hover:bg-white hover:shadow-md transition-all group">
                            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
                                <Zap className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-700">Focus Mode</p>
                                <p className="text-[9px] font-medium text-slate-400">Tactical mental reset</p>
                            </div>
                        </Link>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-2 mt-2">
                        <button 
                            onClick={logout}
                            className="w-full flex items-center justify-between px-6 py-4 bg-slate-950 text-white rounded-[1.75rem] hover:bg-slate-900 transition-all shadow-xl group active:scale-[0.98]"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Terminate Session</span>
                            <LogOut className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};