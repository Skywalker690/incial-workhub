
import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  itemName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-6 animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="bg-white/90 backdrop-blur-3xl rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-white/60 relative" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 bg-white/50 hover:bg-white rounded-full transition-all"
        >
            <X className="h-5 w-5" />
        </button>

        <div className="p-10 flex flex-col items-center text-center">
            <div className="h-20 w-20 bg-rose-50 rounded-[2rem] flex items-center justify-center mb-6 border border-rose-100 shadow-inner rotate-3 group">
                <AlertTriangle className="h-10 w-10 text-rose-500 group-hover:scale-110 transition-transform" />
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3">{title}</h3>
            
            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">
                {message}
            </p>

            {itemName && (
                <div className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target</p>
                    <p className="text-sm font-bold text-slate-900 break-all">"{itemName}"</p>
                </div>
            )}

            <div className="flex gap-4 w-full">
                <button 
                    onClick={onClose}
                    className="flex-1 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={onConfirm}
                    className="flex-1 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-rose-600 hover:bg-rose-700 rounded-2xl shadow-xl shadow-rose-200 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    <Trash2 className="h-4 w-4" /> Confirm
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
