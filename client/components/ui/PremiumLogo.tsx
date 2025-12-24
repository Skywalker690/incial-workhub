import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PremiumLogoProps {
    src?: string;
    alt: string;
    fallback: React.ReactNode;
    containerClassName?: string;
    imageClassName?: string;
}

export const PremiumLogo: React.FC<PremiumLogoProps> = ({ 
    src, 
    alt, 
    fallback, 
    containerClassName = "",
    imageClassName = "h-full w-full object-cover"
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (triggerRef.current && src) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.top + (rect.height / 2),
                left: rect.left + (rect.width / 2)
            });
            setIsHovered(true);
        }
    };

    return (
        <>
            <div 
                ref={triggerRef}
                className={`relative cursor-pointer group/logo shrink-0 ${containerClassName}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsHovered(false)}
            >
                {src ? (
                    <img 
                        src={src} 
                        alt={alt} 
                        referrerPolicy="no-referrer"
                        className={`${imageClassName} transition-transform duration-500 group-hover/logo:scale-110`} 
                    />
                ) : (
                    fallback
                )}
            </div>

            {isHovered && src && createPortal(
                <div 
                    className="fixed z-[9999] pointer-events-none"
                    style={{ 
                        top: coords.top, 
                        left: coords.left,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <div className="w-48 h-48 bg-white rounded-[2.5rem] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] border border-white/60 p-6 flex flex-col items-center justify-center relative overflow-hidden animate-in fade-in zoom-in-90 duration-300 ring-4 ring-black/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100" />
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]" />
                        <img 
                            src={src} 
                            alt={alt} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain relative z-10 drop-shadow-xl" 
                        />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};