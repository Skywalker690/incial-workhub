
export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [y, m, d] = dateString.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      return new Intl.DateTimeFormat('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  }
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      timeZone: 'Asia/Kolkata' 
  }).format(date);
};

export const formatDateTime = (dateString: string) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata' 
  }).format(date);
};

export const getFollowUpColor = (dateString: string) => {
  if (!dateString) return 'text-slate-400';
  const todayISTStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
  const [ty, tm, td] = todayISTStr.split('-').map(Number);
  const today = new Date(ty, tm - 1, td);
  today.setHours(0, 0, 0, 0);
  
  let checkDate: Date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [y, m, d] = dateString.split('-').map(Number);
      checkDate = new Date(y, m - 1, d);
  } else {
      const istStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date(dateString));
      const [y, m, d] = istStr.split('-').map(Number);
      checkDate = new Date(y, m - 1, d);
  }
  checkDate.setHours(0, 0, 0, 0);

  if (checkDate < today) return 'text-rose-600 font-bold drop-shadow-sm';
  if (checkDate.getTime() === today.getTime()) return 'text-amber-600 font-bold drop-shadow-sm';
  return 'text-emerald-600 font-medium';
};

export const getStatusStyles = (status: string) => {
  const base = "font-black tracking-[0.15em] uppercase shadow-inner-glass border ";
  switch (status?.toLowerCase()) {
    case 'onboarded': return base + 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 glass-panel';
    case 'completed': return base + 'bg-brand-500/10 text-brand-600 border-brand-500/20 glass-panel';
    case 'drop': return base + 'bg-rose-500/10 text-rose-600 border-rose-500/20 glass-panel';
    case 'on progress': return base + 'bg-amber-500/10 text-amber-600 border-amber-500/20 glass-panel';
    case 'quote sent': return base + 'bg-sky-500/10 text-sky-600 border-sky-500/20 glass-panel';
    case 'lead': return base + 'bg-slate-500/10 text-slate-600 border-slate-500/20 glass-panel';
    default: return base + 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

export const getTaskStatusStyles = (status: string) => {
  const lowerStatus = status?.toLowerCase();
  const base = "font-black tracking-widest uppercase border ";
  if (lowerStatus === 'completed' || lowerStatus === 'done') return base + 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
  if (lowerStatus === 'posted') return base + 'bg-sky-500/10 text-sky-600 border-sky-500/20';
  if (lowerStatus === 'in review') return base + 'bg-purple-500/10 text-purple-600 border-purple-500/20';
  if (lowerStatus === 'in progress') return base + 'bg-brand-500/10 text-brand-600 border-brand-500/20';
  if (lowerStatus === 'dropped') return base + 'bg-rose-500/10 text-rose-600 border-rose-500/20';
  return base + 'bg-slate-100 text-slate-600 border-slate-200';
};

export const getTaskPriorityStyles = (priority: string) => {
  switch (priority) {
    case 'High': return 'bg-rose-500/10 text-rose-700 border-rose-500/20 font-black tracking-widest uppercase';
    case 'Medium': return 'bg-amber-500/10 text-amber-700 border-amber-500/20 font-black tracking-widest uppercase';
    case 'Low': return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 font-black tracking-widest uppercase';
    default: return 'bg-slate-50 text-slate-600 font-bold';
  }
};

export const getMeetingStatusStyles = (status: string) => {
  const base = "font-black tracking-widest uppercase border ";
  switch (status) {
      case 'Completed': return base + 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'Cancelled': return base + 'bg-rose-500/10 text-rose-600 border-rose-500/20';
      case 'Postponed': return base + 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Scheduled': return base + 'bg-sky-500/10 text-sky-600 border-sky-500/20';
      default: return base + 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

export const getWorkTypeStyles = (work: string) => {
  const lower = work?.toLowerCase() || '';
  // Premium base style with standard layout
  const base = "px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border shadow-sm transition-all hover:scale-105 cursor-default ";
  
  if (lower.includes('website') || lower.includes('software') || lower.includes('app') || lower.includes('tech') || lower.includes('dev')) 
    return base + 'bg-indigo-50 text-indigo-700 border-indigo-100';
  
  if (lower.includes('brand') || lower.includes('design') || lower.includes('ui') || lower.includes('creative')) 
    return base + 'bg-pink-50 text-pink-700 border-pink-100';
  
  if (lower.includes('marketing') || lower.includes('seo') || lower.includes('growth') || lower.includes('ads')) 
    return base + 'bg-emerald-50 text-emerald-700 border-emerald-100';
    
  if (lower.includes('video') || lower.includes('photo') || lower.includes('media') || lower.includes('social') || lower.includes('content')) 
    return base + 'bg-orange-50 text-orange-700 border-orange-100';

  if (lower.includes('strategy') || lower.includes('consulting')) 
    return base + 'bg-blue-50 text-blue-700 border-blue-100';

  if (lower.includes('linkedin') || lower.includes('instagram') || lower.includes('facebook'))
    return base + 'bg-sky-50 text-sky-700 border-sky-100';

  return base + 'bg-slate-50 text-slate-600 border-slate-200';
};

export const isRecentlyUpdated = (dateString?: string, seconds: number = 10): boolean => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000;
    return diff < seconds;
};

export const exportToCSV = (data: any[], filename: string) => {
  if (!data || !data.length) return;
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(fieldName => {
        let value = row[fieldName];
        if (value === null || value === undefined) value = '';
        if (typeof value === 'object') value = JSON.stringify(value);
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    )
  ].join('\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename.endsWith('.csv') ? filename : `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 100);
};
