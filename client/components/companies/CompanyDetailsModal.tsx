
import React from 'react';
import { X, Hash, User, Calendar, Tag, Clock, ExternalLink, HardDrive, Linkedin, Instagram, Facebook, Twitter, Globe, Link as LinkIcon, Edit2, Building, Mail, MapPin } from 'lucide-react';
import { CRMEntry } from '../../types';
import { getStatusStyles, getWorkTypeStyles, formatDate, formatDateTime } from '../../utils';

interface CompanyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (company: CRMEntry) => void;
  company?: CRMEntry;
}

export const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({ isOpen, onClose, onEdit, company }) => {
  if (!isOpen || !company) return null;

  const hasSocials = company.socials && Object.values(company.socials).some(Boolean);
  const refId = company.referenceId || `REF-${new Date().getFullYear()}-${company.id.toString().padStart(3, '0')}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-300" onClick={onClose}>
      <div className="bg-white/90 backdrop-blur-3xl rounded-[2rem] lg:rounded-[3rem] shadow-2xl w-full max-w-2xl max-h-[100vh] sm:max-h-[90vh] overflow-hidden flex flex-col border border-white/60 transform transition-all scale-100" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="relative p-6 lg:p-8 pb-6 border-b border-slate-100 bg-white/40">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                <div className="flex items-center gap-6 w-full sm:w-auto">
                     <div className="h-16 w-16 lg:h-20 lg:w-20 rounded-[1.5rem] bg-white border border-slate-100 flex items-center justify-center shadow-lg overflow-hidden relative shrink-0">
                        {company.companyImageUrl ? (
                            <img 
                                src={company.companyImageUrl} 
                                alt={company.company} 
                                className="h-full w-full object-cover" 
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                        ) : null}
                        <div className={`absolute inset-0 flex items-center justify-center bg-slate-50 ${company.companyImageUrl ? 'hidden' : ''}`}>
                             <Building className="h-8 w-8 text-slate-300" />
                        </div>
                     </div>

                     <div className="min-w-0 flex-1">
                         <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-1">
                            <span className="text-[8px] lg:text-[9px] font-mono font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100 uppercase tracking-widest whitespace-nowrap">
                                {refId}
                            </span>
                            <span className={`px-3 py-0.5 rounded-lg text-[8px] lg:text-[9px] font-black uppercase tracking-widest border whitespace-nowrap ${getStatusStyles(company.status)}`}>
                                {company.status}
                            </span>
                         </div>
                         <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter leading-none truncate">{company.company}</h2>
                     </div>
                </div>
                
                <div className="flex items-center gap-2 absolute top-6 right-6 sm:static">
                    {onEdit && (
                        <button 
                            onClick={() => onEdit(company)}
                            className="p-2 lg:p-3 bg-white border border-slate-200 hover:border-indigo-300 text-slate-400 hover:text-indigo-600 rounded-2xl transition-all shadow-sm active:scale-95"
                            title="Edit Details"
                        >
                            <Edit2 className="h-4 lg:h-5 w-4 lg:w-5" />
                        </button>
                    )}
                    <button onClick={onClose} className="p-2 lg:p-3 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-2xl transition-colors">
                        <X className="h-4 lg:h-5 w-4 lg:w-5" />
                    </button>
                </div>
            </div>
        </div>

        <div className="p-6 lg:p-8 overflow-y-auto custom-scrollbar max-h-[70vh] space-y-6 lg:space-y-8">
            
            {/* Contact & Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="p-5 lg:p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 space-y-3 lg:space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <User className="h-4 w-4 text-indigo-500" /> Point of Contact
                    </h3>
                    <div>
                        <p className="text-base lg:text-lg font-black text-slate-900 leading-tight">
                            {company.contactName || <span className="text-slate-400 italic font-medium">Not specified</span>}
                        </p>
                        {company.email && (
                            <div className="flex items-center gap-2 mt-2 text-xs font-bold text-slate-500 truncate">
                                <Mail className="h-3.5 w-3.5" /> {company.email}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-5 lg:p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 space-y-3 lg:space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-indigo-500" /> Headquarters
                    </h3>
                    <p className="text-xs lg:text-sm font-bold text-slate-700 leading-relaxed">
                        {company.address || <span className="text-slate-400 italic font-medium">No physical address logged.</span>}
                    </p>
                </div>
            </div>

            {/* Work Scope */}
            <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ml-1">
                    <Tag className="h-4 w-4 text-indigo-500" /> Active Work Scope
                </h3>
                <div className="flex flex-wrap gap-2 p-5 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm">
                    {company.work && company.work.length > 0 ? (
                        company.work.map((w: any) => {
                             const label = typeof w === 'object' ? w.name : w;
                             return (
                                <span key={label} className={`px-3 lg:px-4 py-1.5 rounded-xl text-[9px] lg:text-[10px] font-black border uppercase tracking-widest ${getWorkTypeStyles(label)}`}>
                                    {label}
                                </span>
                             );
                        })
                    ) : (
                        <span className="text-xs font-bold text-slate-400 italic px-2">No work types assigned</span>
                    )}
                </div>
            </div>

            {/* Digital Assets */}
            {(hasSocials || company.driveLink) && (
                <div>
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ml-1">
                        <Globe className="h-4 w-4 text-indigo-500" /> Digital Footprint
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
                        {company.driveLink && (
                            <a href={company.driveLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-2xl border border-blue-100 transition-all font-black text-[9px] lg:text-[10px] uppercase tracking-widest md:col-span-2 group">
                                <HardDrive className="h-4 w-4 group-hover:scale-110 transition-transform" /> Project Drive
                            </a>
                        )}
                        {company.socials?.website && (
                             <a href={company.socials.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-slate-50 hover:bg-white hover:border-indigo-100 text-slate-400 hover:text-indigo-600 rounded-2xl border border-slate-100 transition-all shadow-sm hover:shadow-md">
                                <Globe className="h-5 w-5" />
                             </a>
                        )}
                        {company.socials?.linkedin && (
                             <a href={company.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-slate-50 hover:bg-white hover:border-blue-100 text-slate-400 hover:text-blue-700 rounded-2xl border border-slate-100 transition-all shadow-sm hover:shadow-md">
                                <Linkedin className="h-5 w-5" />
                             </a>
                        )}
                        {company.socials?.instagram && (
                             <a href={company.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-slate-50 hover:bg-white hover:border-pink-100 text-slate-400 hover:text-pink-600 rounded-2xl border border-slate-100 transition-all shadow-sm hover:shadow-md">
                                <Instagram className="h-5 w-5" />
                             </a>
                        )}
                        {company.socials?.facebook && (
                             <a href={company.socials.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-slate-50 hover:bg-white hover:border-blue-100 text-slate-400 hover:text-blue-600 rounded-2xl border border-slate-100 transition-all shadow-sm hover:shadow-md">
                                <Facebook className="h-5 w-5" />
                             </a>
                        )}
                        {company.socials?.twitter && (
                             <a href={company.socials.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-slate-50 hover:bg-white hover:border-sky-100 text-slate-400 hover:text-sky-500 rounded-2xl border border-slate-100 transition-all shadow-sm hover:shadow-md">
                                <Twitter className="h-5 w-5" />
                             </a>
                        )}
                    </div>
                </div>
            )}

            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6 pt-6 border-t border-slate-100/60">
                <div className="flex flex-col">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" /> Last Contact
                    </p>
                    <p className="text-xs lg:text-sm font-bold text-slate-700">{formatDate(company.lastContact)}</p>
                </div>
                {company.lastUpdatedBy && (
                    <div className="flex flex-col text-right">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 flex items-center justify-end gap-1.5">
                            <Clock className="h-3 w-3" /> Last Update
                        </p>
                        <p className="text-[10px] lg:text-xs font-bold text-slate-700">
                            {formatDateTime(company.lastUpdatedAt || '')} <span className="text-slate-400 font-medium">by {company.lastUpdatedBy}</span>
                        </p>
                    </div>
                )}
            </div>

        </div>
      </div>
    </div>
  );
};
