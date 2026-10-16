import { useState } from 'react';
import { ArrowUpRight, Check, Compass, Cpu, Music, Palette, Rocket, Activity, Camera, Theater, Users2, Sparkles } from 'lucide-react';
import { CampusEvent, VibeInterestId, VibeMatchResult } from '../types';
import { VIBE_INTERESTS, calculateVibeMatches } from '../data/events';

interface FindYourVibeSectionProps {
  onSelectEvent: (event: CampusEvent) => void;
  registeredIds: string[];
  onToggleRegister: (event: CampusEvent) => void;
  onInterestsChange?: (interests: VibeInterestId[]) => void;
}

export function FindYourVibeSection({
  onSelectEvent,
  registeredIds,
  onToggleRegister,
  onInterestsChange,
}: FindYourVibeSectionProps) {
  const [selectedInterests, setSelectedInterests] = useState<VibeInterestId[]>([
    'coding-tech',
    'music-live',
  ]);
  const [matches, setMatches] = useState<VibeMatchResult[]>(() =>
    calculateVibeMatches(['coding-tech', 'music-live'])
  );
  const [hasSearched, setHasSearched] = useState(true);

  const getTileIcon = (id: VibeInterestId) => {
    switch (id) {
      case 'coding-tech':
        return <Cpu className="w-5 h-5" />;
      case 'music-live':
        return <Music className="w-5 h-5" />;
      case 'design-creative':
        return <Palette className="w-5 h-5" />;
      case 'entrepreneurship':
        return <Rocket className="w-5 h-5" />;
      case 'sports-fitness':
        return <Activity className="w-5 h-5" />;
      case 'photography':
        return <Camera className="w-5 h-5" />;
      case 'culture-performance':
        return <Theater className="w-5 h-5" />;
      case 'networking-learning':
        return <Users2 className="w-5 h-5" />;
    }
  };

  const toggleInterest = (id: VibeInterestId) => {
    setSelectedInterests((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      if (onInterestsChange) {
        onInterestsChange(next);
      }
      return next;
    });
  };

  const handleFindEvents = () => {
    const results = calculateVibeMatches(selectedInterests);
    setMatches(results);
    setHasSearched(true);
    if (onInterestsChange) {
      onInterestsChange(selectedInterests);
    }
  };

  return (
    <section
      id="find-your-vibe"
      className="py-24 sm:py-32 bg-[#141414] text-[#F5F3EE] relative overflow-hidden"
    >
      {/* Decorative Diagonal Grid Canvas */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#D8FF3E_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D8FF3E]">
            <Sparkles className="w-4 h-4 text-[#D8FF3E]" />
            <span>HEURISTIC RECOMMENDATION ENGINE</span>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span>FIND YOUR VIBE</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-[#F5F3EE] uppercase leading-[0.95]">
            WHAT'S YOUR NEXT OBSESSION?
          </h2>

          <p className="font-display text-xl sm:text-2xl text-[#F5F3EE]/80 max-w-2xl">
            Tell us what you're into. We'll find your next campus obsession.
          </p>

          <p className="text-xs font-mono text-[#F5F3EE]/50 max-w-xl">
            Select one or more interest nodes below. Our client-side relevance matcher analyzes event disciplines, venue atmospheres, and attendee tags in real-time.
          </p>
        </div>

        {/* 8 Interactive Interest Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {VIBE_INTERESTS.map((interest) => {
            const isSelected = selectedInterests.includes(interest.id);
            return (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`group relative text-left p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[140px] ${
                  isSelected
                    ? 'bg-[#1e1e1e] border-[#D8FF3E] shadow-[0_0_20px_rgba(216,255,62,0.15)] ring-1 ring-[#D8FF3E]'
                    : 'bg-[#181818] border-white/10 hover:border-white/30 hover:bg-[#1c1c1c]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`p-2.5 transition-colors ${
                      isSelected
                        ? 'bg-[#D8FF3E] text-[#141414]'
                        : 'bg-white/5 text-[#F5F3EE]/80 group-hover:text-[#D8FF3E]'
                    }`}
                  >
                    {getTileIcon(interest.id)}
                  </div>

                  <div
                    className={`w-5 h-5 flex items-center justify-center border transition-colors ${
                      isSelected
                        ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#141414]'
                        : 'border-white/20 bg-transparent'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div className="space-y-1 pt-4">
                  <span className="font-display font-bold text-base block text-[#F5F3EE] group-hover:text-[#D8FF3E] transition-colors">
                    {interest.label}
                  </span>
                  <span className="text-xs text-[#F5F3EE]/60 block leading-snug">
                    {interest.tagline}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Run Algorithm Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-y border-white/10 mb-12">
          <div className="flex items-center gap-3 text-xs font-mono text-[#F5F3EE]/70">
            <span className="w-2 h-2 bg-[#D8FF3E] inline-block" />
            <span>
              {selectedInterests.length === 0
                ? 'Select at least 1 interest to generate matches'
                : `${selectedInterests.length} interest active`}
            </span>
          </div>

          <button
            onClick={handleFindEvents}
            disabled={selectedInterests.length === 0}
            className="group inline-flex items-center gap-3 bg-[#D8FF3E] text-[#141414] hover:bg-white px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
          >
            <span>FIND MY EVENTS</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Matching Events Results */}
        {hasSearched && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#F5F3EE]">
                Personalized Matches ({matches.length})
              </h3>
              <span className="text-xs font-mono text-[#D8FF3E]">
                Sorted by algorithmic fit
              </span>
            </div>

            {matches.length === 0 ? (
              <div className="p-8 border border-white/10 text-center bg-[#181818] space-y-3">
                <Compass className="w-8 h-8 mx-auto text-[#D8FF3E]" />
                <p className="font-display text-lg font-bold">No direct matches</p>
                <p className="text-xs text-white/60">
                  Try selecting additional interests to widen the recommendation pool.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.slice(0, 6).map(({ event, matchPercentage, reason }) => {
                  const isRegistered = registeredIds.includes(event.id);
                  return (
                    <div
                      key={event.id}
                      className="group bg-[#191919] border border-white/10 hover:border-[#D8FF3E]/70 p-6 flex flex-col justify-between space-y-5 transition-all duration-200"
                    >
                      <div className="space-y-4">
                        {/* Match Bar */}
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#D8FF3E] font-bold text-sm">
                            {matchPercentage}% Match
                          </span>
                          <span className="text-white/50 uppercase">{event.category}</span>
                        </div>

                        {/* Event Thumbnail */}
                        <div
                          onClick={() => onSelectEvent(event)}
                          className="relative aspect-16/10 bg-black overflow-hidden cursor-pointer"
                        >
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Title and rationale */}
                        <div className="space-y-2">
                          <h4
                            onClick={() => onSelectEvent(event)}
                            className="font-display text-xl font-bold text-[#F5F3EE] group-hover:text-[#D8FF3E] transition-colors cursor-pointer leading-tight"
                          >
                            {event.title}
                          </h4>

                          {/* Matching Rationale Note */}
                          <div className="bg-[#141414] border border-white/10 p-2.5 text-xs font-mono text-[#D8FF3E]/90 leading-tight">
                            ↳ {reason}
                          </div>

                          <div className="text-xs font-mono text-white/60 pt-1">
                            {event.date} · {event.venue}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                        <button
                          onClick={() => onToggleRegister(event)}
                          className={`flex-1 py-2.5 px-3 text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                            isRegistered
                              ? 'bg-[#D8FF3E] text-[#141414]'
                              : 'bg-white/10 text-[#F5F3EE] hover:bg-white hover:text-[#141414]'
                          }`}
                        >
                          {isRegistered ? '✓ INTERESTED' : 'REGISTER INTEREST'}
                        </button>

                        <button
                          onClick={() => onSelectEvent(event)}
                          className="p-2 text-[#F5F3EE] hover:text-[#D8FF3E] transition-colors cursor-pointer"
                          title="View dossier"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
