import { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  type?: 'success' | 'info';
}

export function Toast({ message, onClose, type = 'success' }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#141414] text-[#F5F3EE] px-5 py-3.5 rounded-none border border-[#D8FF3E]/40 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="w-5 h-5 flex items-center justify-center bg-[#D8FF3E] text-[#141414] font-bold text-xs shrink-0">
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </div>
      <p className="text-sm font-medium tracking-tight pr-2">{message}</p>
      <button
        onClick={onClose}
        className="text-[#F5F3EE]/60 hover:text-[#F5F3EE] transition-colors p-1 ml-auto"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
