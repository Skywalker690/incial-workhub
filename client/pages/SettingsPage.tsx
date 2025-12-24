import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { User, Bell, Shield, CreditCard, Layers, Save, Cpu } from 'lucide-react';
import { useLayout } from '../context/LayoutContext';

export const SettingsPage: React.FC = () => {
    const { isSidebarCollapsed } = useLayout();
    const [activeTab, setActiveTab] = useState('general');
    const tabs = [
        { id: 'general', label: 'Preferences', icon: User }, 
        { id: 'notifications', label: 'Push Hub', icon: Bell }, 
        { id: 'security', label: 'Core Security', icon: Shield }
    ];

    return (
        <div className="flex min-h-screen mesh-bg relative">
            <div className="glass-canvas" />
            <Sidebar />
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-500 ease-in-out ${isSidebarCollapsed ? 'lg:ml-28' : 'lg:ml-80'}`}>
                <Navbar />
                <div className="px-6 lg:px-12 py-10 pb-32">
                    <div className="mb-16 animate-premium">
                         <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none display-text">System.</h1>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-12 flex-1">
                        <div className="w-full lg:w-80 space-y-3">
                            {tabs.map(t => (
                                <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full text-left p-6 rounded-[2rem] border transition-all flex items-center justify-between group ${activeTab === t.id ? 'bg-slate-950 text-white border-slate-950 shadow-2xl' : 'bg-white/40 text-slate-400 border-white/60 hover:bg-white hover:text-slate-900'}`}>
                                    <div className="flex items-center gap-5">
                                        <t.icon className={`h-6 w-6 transition-transform group-hover:scale-110 ${activeTab === t.id ? 'text-brand-400' : ''}`} />
                                        <span className="font-black text-sm uppercase tracking-widest">{t.label}</span>
                                    </div>
                                    {activeTab === t.id && <div className="h-2 w-2 rounded-full bg-brand-400 shadow-glow" />}
                                </button>
                            ))}
                        </div>
                        <div className="flex-1 bg-white/40 backdrop-blur-3xl rounded-[3.5rem] border border-white shadow-premium min-h-[500px] flex flex-col items-center justify-center p-12 text-center">
                            <div className="h-24 w-24 rounded-[2.5rem] bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 shadow-inner">
                                <Cpu className="h-10 w-10 text-slate-300" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-[0.2em]">Parameter Config</h3>
                            <p className="text-slate-500 font-medium max-w-sm">The settings module is being optimized for the Mark II deployment. Manual parameters are temporarily locked.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};