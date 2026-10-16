import { MapPin, Calendar, Clock, ArrowUpRight, Check, Plus } from 'lucide-react';
import { CampusEvent } from '../types';

interface EventCardProps {
  event: CampusEvent;
  isRegistered: boolean;
  onToggleRegister: (event: CampusEvent) => void;
  onSelectEvent: (event: CampusEvent) => void;
  featured?: boolean;
}

export function EventCard({
  event,
  isRegistered,
  onToggleRegister,
  onSelectEvent,
  featured = false,
}: EventCardProps) {
  if (featured) {
    return (
      <article className="group relative bg-[#141414] text-[#F5F3EE] border border-[#141414] overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          {/* Image Container with Hover Scale */}
          <div
            onClick={() => onSelectEvent(event)}
            className="lg:col-span-7 relative overflow-hidden cursor-pointer aspect-16/10 lg:aspect-auto"
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover object-center filter saturate-105 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
            <div className="absolute top-4 left-4 bg-[#D8FF3E] text-[#141414] font-mono text-[10px] font-bold tracking-widest px-2.5 py-1 uppercase">
              FEATURED DISPATCH
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Clean Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#D8FF3E] tracking-wider uppercase">
                <span>{event.category}</span>
                <span aria-hidden="true" className="text-white/30">/</span>
                <span>{event.organizer}</span>
              </div>

              <h3
                onClick={() => onSelectEvent(event)}
                className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F5F3EE] hover:text-[#D8FF3E] transition-colors cursor-pointer leading-tight"
              >
                {event.title}
              </h3>

              <p className="text-sm sm:text-base text-[#F5F3EE]/75 leading-relaxed">
                {event.shortDescription}
              </p>

              {/* Event Attributes (unboxed with separators) */}
              <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-mono text-[#F5F3EE]/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#D8FF3E]" />
                  <span>{event.date}</span>
                  <span aria-hidden="true" className="text-white/20">·</span>
                  <Clock className="w-3.5 h-3.5 text-[#D8FF3E]" />
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D8FF3E]" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => onToggleRegister(event)}
                className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  isRegistered
                    ? 'bg-[#D8FF3E] text-[#141414]'
                    : 'bg-[#F5F3EE] text-[#141414] hover:bg-[#D8FF3E]'
                }`}
              >
                {isRegistered ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>INTERESTED</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>REGISTER INTEREST</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onSelectEvent(event)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#F5F3EE]/80 hover:text-[#D8FF3E] tracking-wider uppercase transition-colors cursor-pointer p-2"
              >
                <span>VIEW DOSSIER</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col justify-between bg-white border border-[#171717]/10 overflow-hidden transition-all duration-300 hover:border-[#171717]/40 hover:-translate-y-1">
      {/* Top Image */}
      <div
        onClick={() => onSelectEvent(event)}
        className="relative overflow-hidden aspect-16/10 cursor-pointer bg-[#141414]"
      >
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover object-center filter saturate-105 group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
        
        {/* Subtle category stamp in corner */}
        <div className="absolute top-3 left-3 bg-[#141414] text-[#F5F3EE] font-mono text-[10px] font-bold tracking-wider px-2 py-0.5 uppercase">
          {event.category}
        </div>
      </div>

      {/* Body Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Unboxed clean metadata line */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#171717]/60">
            <span className="font-semibold text-[#171717]">{event.date}</span>
            <span aria-hidden="true">·</span>
            <span>{event.startTime}</span>
          </div>

          <h3
            onClick={() => onSelectEvent(event)}
            className="font-display text-xl font-bold tracking-tight text-[#171717] group-hover:text-[#7C3AED] transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {event.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#171717]/70 leading-relaxed line-clamp-2">
            {event.shortDescription}
          </p>
        </div>

        {/* Location & Host Footer */}
        <div className="pt-4 border-t border-[#171717]/8 space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-[#171717]/70 font-mono truncate">
            <MapPin className="w-3.5 h-3.5 text-[#171717] shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={() => onToggleRegister(event)}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                isRegistered
                  ? 'bg-[#141414] text-[#D8FF3E]'
                  : 'bg-[#141414]/5 text-[#171717] hover:bg-[#141414] hover:text-[#F5F3EE]'
              }`}
            >
              {isRegistered ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>INTERESTED</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>REGISTER INTEREST</span>
                </>
              )}
            </button>

            <button
              onClick={() => onSelectEvent(event)}
              className="p-2.5 text-[#171717] hover:bg-black/5 transition-colors cursor-pointer"
              aria-label={`View details for ${event.title}`}
              title="View full details"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
