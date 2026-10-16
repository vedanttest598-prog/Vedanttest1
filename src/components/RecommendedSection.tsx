import { ArrowUpRight, Sparkles, MapPin, Calendar, Check, Plus } from 'lucide-react';
import { CampusEvent, VibeInterestId } from '../types';
import { getRecommendedEvents } from '../data/events';

interface RecommendedSectionProps {
  registeredIds: string[];
  selectedInterests: VibeInterestId[];
  onSelectEvent: (event: CampusEvent) => void;
  onToggleRegister: (event: CampusEvent) => void;
  onExploreMoreClick: () => void;
}

export function RecommendedSection({
  registeredIds,
  selectedInterests,
  onSelectEvent,
  onToggleRegister,
  onExploreMoreClick,
}: RecommendedSectionProps) {
  const recommendations = getRecommendedEvents(registeredIds, selectedInterests);

  return (
    <section className="py-20 sm:py-24 bg-[#F5F3EE] border-b border-[#171717]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#171717]/60">
              <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>Tailored Curation</span>
              <span aria-hidden="true" className="text-[#171717]/30">/</span>
              <span>Intelligent Recommendations</span>
            </div>

            <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight text-[#171717] uppercase leading-[0.92]">
              A LITTLE SOMETHING FOR YOU.
            </h2>

            <p className="font-display text-lg text-[#171717]/75">
              Handpicked discoveries matching your current campus orbit.
            </p>
          </div>

          <button
            onClick={onExploreMoreClick}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#171717] hover:text-[#7C3AED] transition-colors cursor-pointer py-2 self-start md:self-auto"
          >
            <span>DISCOVER ALL ACTIVITIES</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {recommendations.map(({ event, rationale }, idx) => {
            const isRegistered = registeredIds.includes(event.id);
            return (
              <div
                key={event.id}
                className="group bg-white border border-[#171717]/12 flex flex-col justify-between overflow-hidden hover:border-[#171717] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div
                    onClick={() => onSelectEvent(event)}
                    className="relative aspect-16/10 bg-[#141414] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter saturate-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#141414] text-[#F5F3EE] font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                      {event.category}
                    </div>
                    <div className="absolute top-3 right-3 text-[10px] font-mono text-white/80 bg-black/40 px-1.5 py-0.5">
                      [{String(idx + 1).padStart(2, '0')}]
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    {/* Personalized Rationale Note */}
                    <div className="bg-[#141414] text-[#D8FF3E] px-3 py-1.5 text-xs font-mono border-l-2 border-[#D8FF3E]">
                      ↳ {rationale}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#171717]/60 pt-1">
                      <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" />
                      <span className="font-semibold text-[#171717]">{event.date}</span>
                    </div>

                    <h3
                      onClick={() => onSelectEvent(event)}
                      className="font-headline text-xl font-bold text-[#171717] group-hover:text-[#7C3AED] transition-colors cursor-pointer leading-tight line-clamp-2"
                    >
                      {event.title}
                    </h3>

                    <p className="text-xs text-[#171717]/70 leading-relaxed line-clamp-2 font-normal">
                      {event.shortDescription}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#171717]/60 truncate pt-2">
                      <MapPin className="w-3 h-3 text-[#171717] shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="px-6 pb-6 pt-2 border-t border-[#171717]/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onToggleRegister(event)}
                    className={`flex-1 py-2.5 px-3 text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                      isRegistered
                        ? 'bg-[#141414] text-[#D8FF3E]'
                        : 'bg-[#141414]/5 text-[#171717] hover:bg-[#141414] hover:text-[#F5F3EE]'
                    }`}
                  >
                    {isRegistered ? (
                      <span className="inline-flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>INTERESTED</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <Plus className="w-3 h-3" />
                        <span>REGISTER INTEREST</span>
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => onSelectEvent(event)}
                    className="p-2 text-[#171717] hover:bg-black/5 transition-colors cursor-pointer"
                    title="View details"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
