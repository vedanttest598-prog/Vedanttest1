import { ArrowUpRight, Trash2, Calendar, MapPin, Sparkles } from 'lucide-react';
import { CampusEvent } from '../types';

interface MyEventsSectionProps {
  events: CampusEvent[];
  registeredIds: string[];
  onRemoveInterest: (eventId: string) => void;
  onSelectEvent: (event: CampusEvent) => void;
  onExploreClick: () => void;
}

export function MyEventsSection({
  events,
  registeredIds,
  onRemoveInterest,
  onSelectEvent,
  onExploreClick,
}: MyEventsSectionProps) {
  const registeredEvents = events.filter((e) => registeredIds.includes(e.id));

  return (
    <section id="my-events" className="py-20 sm:py-28 bg-white border-y border-[#171717]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#171717]/60">
              <span className="w-1.5 h-1.5 bg-[#7C3AED]" />
              <span>Personal Agenda</span>
              <span aria-hidden="true" className="text-[#171717]/30">/</span>
              <span>Saved Dispatches</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717] uppercase leading-[0.95]">
              YOUR LINEUP.
            </h2>

            <p className="font-display text-xl text-[#171717]/80">
              All the things you're looking forward to.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="font-mono text-2xl font-bold text-[#141414]">
                {registeredEvents.length}
              </span>
              <span className="text-xs font-mono text-[#171717]/60 block uppercase">
                {registeredEvents.length === 1 ? 'Event Bookmarked' : 'Events Bookmarked'}
              </span>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {registeredEvents.length === 0 ? (
          <div className="border border-dashed border-[#171717]/25 p-12 sm:p-20 text-center space-y-6 max-w-2xl mx-auto bg-[#F5F3EE]/50">
            <div className="w-16 h-16 mx-auto bg-[#141414] text-[#D8FF3E] flex items-center justify-center font-display text-2xl font-bold">
              ✳
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#171717]">
                Your lineup is completely open.
              </h3>
              <p className="text-sm sm:text-base text-[#171717]/70 max-w-md mx-auto">
                Discover underground gigs, engineering sprints, studio workshops, and campus tournaments to fill your personal semester schedule.
              </p>
            </div>

            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 bg-[#141414] text-[#F5F3EE] hover:bg-[#D8FF3E] hover:text-[#141414] px-7 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-md"
            >
              <span>BROWSE UPCOMING EVENTS</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {registeredEvents.map((event) => (
              <div
                key={event.id}
                className="group relative bg-[#F5F3EE] border border-[#171717]/15 p-5 flex flex-col justify-between space-y-4 hover:border-[#171717] transition-all duration-200"
              >
                <div className="space-y-3">
                  {/* Image thumbnail and category */}
                  <div
                    onClick={() => onSelectEvent(event)}
                    className="relative aspect-16/9 bg-[#141414] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-[#141414] text-[#F5F3EE] font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                      {event.category}
                    </div>
                  </div>

                  {/* Metadata & Title */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#171717]/60">
                      <Calendar className="w-3 h-3 text-[#7C3AED]" />
                      <span>{event.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{event.startTime}</span>
                    </div>

                    <h4
                      onClick={() => onSelectEvent(event)}
                      className="font-display text-lg font-bold text-[#171717] hover:text-[#7C3AED] transition-colors cursor-pointer leading-tight line-clamp-1"
                    >
                      {event.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#171717]/70 truncate">
                      <MapPin className="w-3 h-3 text-[#171717] shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-[#171717]/10 flex items-center justify-between gap-3 text-xs">
                  <button
                    onClick={() => onSelectEvent(event)}
                    className="inline-flex items-center gap-1 font-mono font-semibold text-[#171717] hover:text-[#7C3AED] transition-colors cursor-pointer"
                  >
                    <span>View Dossier</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onRemoveInterest(event.id)}
                    className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-800 transition-colors cursor-pointer font-mono text-[11px] py-1 px-2 hover:bg-red-50"
                    title="Remove from your lineup"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
