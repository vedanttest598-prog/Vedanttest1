import { MapPin, Calendar, Clock, ArrowUpRight, Check, Plus } from 'lucide-react';
import { CampusEvent } from '../types';

interface EventCardProps {
  event: CampusEvent;
  isRegistered: boolean;
  onToggleRegister: (event: CampusEvent) => void;
  onSelectEvent: (event: CampusEvent) => void;
  featured?: boolean;
  index?: number;
  layoutVariant?: 'default' | 'wide';
}

export function EventCard({
  event,
  isRegistered,
  onToggleRegister,
  onSelectEvent,
  featured = false,
  index = 1,
  layoutVariant = 'default',
}: EventCardProps) {
  const formattedIndex = String(index).padStart(2, '0');

  // Featured marquee dispatch
  if (featured) {
    return (
      <article className="group relative bg-[#141414] text-[#F5F3EE] border-2 border-[#141414] overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          {/* Image Container with Hover Scale */}
          <div
            onClick={() => onSelectEvent(event)}
            className="lg:col-span-7 relative overflow-hidden cursor-pointer aspect-16/10 lg:aspect-auto"
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover object-center filter saturate-110 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent lg:hidden" />
            
            <div className="absolute top-4 left-4 bg-[#D8FF3E] text-[#141414] font-mono text-[10px] font-bold tracking-widest px-3 py-1 uppercase shadow-md">
              CURATED HEADLINER · [{formattedIndex}]
            </div>

            <div className="absolute bottom-4 left-4 text-xs font-mono text-white/70 hidden sm:block">
              Click photo to examine dossier ↗
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-5 p-6 sm:p-9 flex flex-col justify-between space-y-6 bg-[#161616]">
            <div className="space-y-4">
              {/* Clean Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#D8FF3E] tracking-wider uppercase">
                <span>{event.category}</span>
                <span aria-hidden="true" className="text-white/30">/</span>
                <span>{event.organizer}</span>
              </div>

              <h3
                onClick={() => onSelectEvent(event)}
                className="font-headline text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F5F3EE] hover:text-[#D8FF3E] transition-colors cursor-pointer leading-[1.05]"
              >
                {event.title}
              </h3>

              <p className="text-sm sm:text-base text-[#F5F3EE]/75 leading-relaxed">
                {event.shortDescription}
              </p>

              {/* Event Attributes (unboxed with separators) */}
              <div className="pt-3 border-t border-white/10 space-y-2 text-xs font-mono text-[#F5F3EE]/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#D8FF3E]" />
                  <span className="text-[#F5F3EE] font-semibold">{event.date}</span>
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
                className={`inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  isRegistered
                    ? 'bg-[#D8FF3E] text-[#141414]'
                    : 'bg-[#F5F3EE] text-[#141414] hover:bg-[#D8FF3E]'
                }`}
              >
                {isRegistered ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>✓ IN YOUR LINEUP</span>
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
                <span>DOSSIER</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Wide Banner layout for visual rhythm
  if (layoutVariant === 'wide') {
    return (
      <article className="group relative bg-white border border-[#171717]/15 overflow-hidden transition-all duration-300 hover:border-[#171717] hover:shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div
            onClick={() => onSelectEvent(event)}
            className="md:col-span-5 relative overflow-hidden aspect-16/10 md:aspect-auto md:h-full cursor-pointer bg-[#141414]"
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover filter saturate-105 group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 bg-[#141414] text-[#F5F3EE] font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
              {event.category}
            </div>
          </div>

          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#171717]/60">
                <span className="font-bold text-[#141414]">[{formattedIndex}]</span>
                <span aria-hidden="true">·</span>
                <span>{event.date}</span>
                <span aria-hidden="true">·</span>
                <span>{event.startTime}</span>
              </div>

              <h3
                onClick={() => onSelectEvent(event)}
                className="font-headline text-xl sm:text-2xl font-bold tracking-tight text-[#171717] hover:text-[#7C3AED] transition-colors cursor-pointer leading-tight"
              >
                {event.title}
              </h3>

              <p className="text-sm text-[#171717]/75 leading-relaxed line-clamp-2">
                {event.shortDescription}
              </p>
            </div>

            <div className="pt-3 border-t border-[#171717]/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#171717]/70">
                <MapPin className="w-3.5 h-3.5 text-[#171717]" />
                <span>{event.venue}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleRegister(event)}
                  className={`inline-flex items-center gap-1.5 py-2 px-4 text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isRegistered
                      ? 'bg-[#141414] text-[#D8FF3E]'
                      : 'bg-[#141414]/5 text-[#171717] hover:bg-[#141414] hover:text-[#F5F3EE]'
                  }`}
                >
                  {isRegistered ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{isRegistered ? 'SAVED' : 'INTERESTED'}</span>
                </button>

                <button
                  onClick={() => onSelectEvent(event)}
                  className="p-2 text-[#171717] hover:bg-black/5 transition-colors cursor-pointer"
                  title="View full details"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard editorial card
  return (
    <article className="group flex flex-col justify-between bg-white border border-[#171717]/12 overflow-hidden transition-all duration-300 hover:border-[#171717] hover:-translate-y-1 hover:shadow-lg">
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
        <div className="absolute top-3 left-3 bg-[#141414] text-[#F5F3EE] font-mono text-[9px] font-bold tracking-wider px-2 py-0.5 uppercase">
          {event.category}
        </div>

        <div className="absolute top-3 right-3 text-[10px] font-mono font-bold text-white/80 bg-black/40 px-1.5 py-0.5 backdrop-blur-xs">
          [{formattedIndex}]
        </div>
      </div>

      {/* Body Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Unboxed clean metadata line */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#171717]/65">
            <span className="font-bold text-[#171717]">{event.date}</span>
            <span aria-hidden="true">·</span>
            <span>{event.startTime}</span>
          </div>

          <h3
            onClick={() => onSelectEvent(event)}
            className="font-headline text-xl font-bold tracking-tight text-[#171717] group-hover:text-[#7C3AED] transition-colors cursor-pointer leading-snug line-clamp-2"
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
