import { useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Users, Award, ShieldAlert, Check, Plus, Share2 } from 'lucide-react';
import { CampusEvent } from '../types';

interface EventDetailModalProps {
  event: CampusEvent | null;
  isOpen: boolean;
  onClose: () => void;
  isRegistered: boolean;
  onToggleRegister: (event: CampusEvent) => void;
}

export function EventDetailModal({
  event,
  isOpen,
  onClose,
  isRegistered,
  onToggleRegister,
}: EventDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const handleShare = async () => {
    const shareData = {
      title: event.title,
      text: `${event.title} - ${event.date} at ${event.venue}`,
      url: window.location.href,
    };
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled share
      }
    } else {
      await navigator.clipboard.writeText(`${event.title} — ${event.date} (${window.location.href})`);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-event-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-3xl bg-[#F5F3EE] text-[#171717] border border-[#171717] shadow-2xl z-10 overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#171717]/10 bg-white">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#171717]/70">
            <span className="w-2 h-2 bg-[#171717] rotate-45" />
            <span>Event Dossier</span>
            <span aria-hidden="true" className="text-[#171717]/30">/</span>
            <span className="font-bold text-[#171717]">{event.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-[#171717]/70 hover:text-[#171717] hover:bg-black/5 transition-colors cursor-pointer"
              title="Share event link"
              aria-label="Share event"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#171717] hover:bg-[#141414] hover:text-[#F5F3EE] transition-colors cursor-pointer"
              aria-label="Close modal dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Hero Image within modal */}
          <div className="relative aspect-16/9 bg-[#141414] overflow-hidden border border-[#171717]/20">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 bg-[#141414] text-[#F5F3EE] font-mono text-[10px] uppercase tracking-wider px-2.5 py-1">
              Organized by: {event.organizer}
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-2">
            <h2
              id="modal-event-title"
              className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[#171717] uppercase leading-tight"
            >
              {event.title}
            </h2>
            <p className="font-display text-base sm:text-lg text-[#171717]/80 font-medium">
              {event.tagline}
            </p>
          </div>

          {/* Key Facts Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border border-[#171717]/10 p-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <div>
                <span className="text-[#171717]/60 block text-[10px] uppercase">Date</span>
                <span className="font-bold text-[#171717]">{event.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <div>
                <span className="text-[#171717]/60 block text-[10px] uppercase">Schedule</span>
                <span className="font-bold text-[#171717]">
                  {event.startTime} – {event.endTime}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <div>
                <span className="text-[#171717]/60 block text-[10px] uppercase">Venue</span>
                <span className="font-bold text-[#171717]">{event.venue}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <div>
                <span className="text-[#171717]/60 block text-[10px] uppercase">Capacity</span>
                <span className="font-bold text-[#171717]">
                  {event.capacity || 'Open Registration'}
                </span>
              </div>
            </div>
          </div>

          {/* Full Narrative Description */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold tracking-wider uppercase text-[#171717]">
              About This Experience
            </h4>
            <p className="text-sm sm:text-base text-[#171717]/85 leading-relaxed whitespace-pre-line">
              {event.fullDescription}
            </p>
          </div>

          {/* Registration Deadline callout */}
          <div className="flex items-center justify-between p-4 bg-[#141414] text-[#F5F3EE] text-xs font-mono">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D8FF3E]" />
              <span>RSVP DEADLINE:</span>
              <span className="text-[#D8FF3E] font-bold">{event.registrationDeadline}</span>
            </div>
            <span className="text-white/50 hidden sm:inline">Priority entry pass</span>
          </div>

          {/* Disclaimer Banner */}
          <div className="flex items-start gap-2.5 p-3.5 bg-black/5 text-[#171717]/70 text-xs border border-[#171717]/10">
            <ShieldAlert className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Student Notice:</strong> This is a frontend demo discovery platform. Registering interest bookmarks the event into your local device lineup and does not issue an official bursary invoice.
            </p>
          </div>
        </div>

        {/* Modal Footer with Register Interest Action */}
        <div className="p-6 border-t border-[#171717]/10 bg-white flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-[#171717]/60">
            {isRegistered ? (
              <span className="text-[#141414] font-bold">✓ Marked in your personal lineup</span>
            ) : (
              <span>Available for all enrolled undergraduates and postgraduates</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onToggleRegister(event)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                isRegistered
                  ? 'bg-[#141414] text-[#D8FF3E]'
                  : 'bg-[#141414] text-[#F5F3EE] hover:bg-[#D8FF3E] hover:text-[#141414]'
              }`}
            >
              {isRegistered ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>✓ INTERESTED</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>REGISTER INTEREST ↗</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
