import { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, RotateCcw, LayoutGrid, ListFilter, ArrowUpRight, Check, Plus, Calendar, MapPin } from 'lucide-react';
import { CampusEvent, EventCategory } from '../types';
import { CATEGORIES } from '../data/events';
import { EventCard } from './EventCard';

interface EventDiscoveryProps {
  events: CampusEvent[];
  registeredIds: string[];
  onToggleRegister: (event: CampusEvent) => void;
  onSelectEvent: (event: CampusEvent) => void;
}

export function EventDiscovery({
  events,
  registeredIds,
  onToggleRegister,
  onSelectEvent,
}: EventDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All Events');
  const [viewMode, setViewMode] = useState<'editorial' | 'roster'>('editorial');

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All Events' || event.category === selectedCategory;

      // Search query filter (titles, descriptions, categories, venues, organizers)
      if (!searchQuery.trim()) {
        return matchesCategory;
      }

      const q = searchQuery.toLowerCase().trim();
      return (
        matchesCategory &&
        (event.title.toLowerCase().includes(q) ||
          event.shortDescription.toLowerCase().includes(q) ||
          event.category.toLowerCase().includes(q) ||
          event.venue.toLowerCase().includes(q) ||
          event.organizer.toLowerCase().includes(q))
      );
    });
  }, [events, selectedCategory, searchQuery]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'All Events';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Events');
  };

  // Select headliner for editorial layout
  const headlinerEvent = useMemo(() => {
    return filteredEvents.find((e) => e.isFeatured) || filteredEvents[0];
  }, [filteredEvents]);

  const remainingEvents = useMemo(() => {
    if (!headlinerEvent) return [];
    return filteredEvents.filter((e) => e.id !== headlinerEvent.id);
  }, [filteredEvents, headlinerEvent]);

  return (
    <section id="discover" className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#171717]/60">
            <span className="w-2 h-2 bg-[#171717]" />
            <span>Curated Programme</span>
            <span aria-hidden="true" className="text-[#171717]/30">/</span>
            <span>All Disciplines</span>
          </div>

          <h2 className="font-headline text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717] uppercase leading-[0.92]">
            THERE'S ALWAYS SOMETHING HAPPENING.
          </h2>

          <p className="font-display text-xl sm:text-2xl text-[#171717]/80">
            Your next favourite memory starts here.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-1 bg-white border border-[#171717]/15 p-1 self-start md:self-end">
          <button
            onClick={() => setViewMode('editorial')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold uppercase transition-colors cursor-pointer ${
              viewMode === 'editorial'
                ? 'bg-[#141414] text-[#D8FF3E]'
                : 'text-[#171717]/70 hover:text-[#171717]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Magazine</span>
          </button>
          <button
            onClick={() => setViewMode('roster')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold uppercase transition-colors cursor-pointer ${
              viewMode === 'roster'
                ? 'bg-[#141414] text-[#D8FF3E]'
                : 'text-[#171717]/70 hover:text-[#171717]'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Roster Index</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div id="categories" className="space-y-6 mb-12">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Functional Search Bar */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#171717]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, category, venue, or keyword..."
              className="w-full bg-white border border-[#171717]/15 pl-11 pr-10 py-3.5 text-sm text-[#171717] placeholder:text-[#171717]/40 focus:border-[#171717] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#171717]/40 hover:text-[#171717]"
                aria-label="Clear search text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results count indicator and reset */}
          <div className="flex items-center justify-between md:justify-end gap-4 text-xs font-mono text-[#171717]/70">
            <span className="whitespace-nowrap">
              Showing <strong className="text-[#171717] font-bold">{filteredEvents.length}</strong> of{' '}
              {events.length} events
            </span>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7C3AED] hover:text-[#171717] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#171717]/10">
          <div className="flex items-center gap-1.5 pr-2 py-1 text-xs font-mono text-[#171717]/60 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>

          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap shrink-0 px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#141414] text-[#D8FF3E]'
                    : 'bg-white/80 hover:bg-white text-[#171717]/80 hover:text-[#171717] border border-[#171717]/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events Presentation: Magazine or Roster */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white border border-[#171717]/10 p-12 sm:p-16 text-center space-y-4 max-w-xl mx-auto my-12">
          <div className="w-12 h-12 mx-auto bg-[#F5F3EE] flex items-center justify-center text-xl font-mono text-[#171717]">
            ∅
          </div>
          <h3 className="font-display text-2xl font-bold text-[#171717]">
            No matching events found
          </h3>
          <p className="text-sm text-[#171717]/70">
            We couldn't find any campus activities matching "{searchQuery || selectedCategory}". Try adjusting your keywords or browse all categories.
          </p>
          <button
            onClick={handleClearFilters}
            className="inline-flex items-center gap-2 bg-[#141414] text-[#F5F3EE] px-5 py-2.5 text-xs font-bold tracking-wider uppercase hover:bg-[#D8FF3E] hover:text-[#141414] transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'roster' ? (
        /* Roster Index View: Swiss High-Density Table */
        <div className="bg-white border border-[#171717]/15 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="bg-[#141414] text-[#F5F3EE] border-b border-[#141414]">
                  <th className="p-4 uppercase tracking-widest font-bold">No.</th>
                  <th className="p-4 uppercase tracking-widest font-bold">Event & Description</th>
                  <th className="p-4 uppercase tracking-widest font-bold">Category</th>
                  <th className="p-4 uppercase tracking-widest font-bold">Date & Time</th>
                  <th className="p-4 uppercase tracking-widest font-bold">Venue</th>
                  <th className="p-4 uppercase tracking-widest font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171717]/10">
                {filteredEvents.map((event, idx) => {
                  const isRegistered = registeredIds.includes(event.id);
                  return (
                    <tr
                      key={event.id}
                      className="hover:bg-[#F5F3EE]/80 transition-colors group"
                    >
                      <td className="p-4 font-bold text-[#141414] tabular-nums">
                        [{String(idx + 1).padStart(2, '0')}]
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-10 h-10 object-cover shrink-0 border border-[#171717]/20"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <button
                              onClick={() => onSelectEvent(event)}
                              className="font-headline font-bold text-sm text-[#171717] hover:text-[#7C3AED] text-left transition-colors cursor-pointer block"
                            >
                              {event.title}
                            </button>
                            <span className="text-[11px] text-[#171717]/60 line-clamp-1">
                              {event.tagline}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 uppercase text-[#171717]/80">
                        {event.category}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="font-semibold text-[#171717]">{event.date}</div>
                        <div className="text-[#171717]/60 text-[11px]">{event.startTime}</div>
                      </td>
                      <td className="p-4 text-[#171717]/70 whitespace-nowrap">
                        {event.venue}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => onToggleRegister(event)}
                            className={`px-3 py-1.5 text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                              isRegistered
                                ? 'bg-[#141414] text-[#D8FF3E]'
                                : 'bg-[#141414]/10 text-[#171717] hover:bg-[#141414] hover:text-[#F5F3EE]'
                            }`}
                          >
                            {isRegistered ? '✓ SAVED' : '+ LINEUP'}
                          </button>
                          <button
                            onClick={() => onSelectEvent(event)}
                            className="p-1.5 text-[#171717] hover:bg-black/10 transition-colors cursor-pointer"
                            title="Open Dossier"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Editorial Magazine View: Dynamic visual pacing */
        <div className="space-y-10">
          {/* Featured Headliner Dispatch */}
          {headlinerEvent && !searchQuery && (
            <EventCard
              event={headlinerEvent}
              isRegistered={registeredIds.includes(headlinerEvent.id)}
              onToggleRegister={onToggleRegister}
              onSelectEvent={onSelectEvent}
              featured={true}
              index={1}
            />
          )}

          {/* Asymmetric Rhythmic Layout for remaining events */}
          {searchQuery ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredEvents.map((event, idx) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isRegistered={registeredIds.includes(event.id)}
                  onToggleRegister={onToggleRegister}
                  onSelectEvent={onSelectEvent}
                  featured={false}
                  index={idx + 1}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              {/* Row 1: Dual Asymmetric Spread */}
              {remainingEvents.slice(0, 2).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {remainingEvents[0] && (
                    <div className="md:col-span-7">
                      <EventCard
                        event={remainingEvents[0]}
                        isRegistered={registeredIds.includes(remainingEvents[0].id)}
                        onToggleRegister={onToggleRegister}
                        onSelectEvent={onSelectEvent}
                        featured={false}
                        index={2}
                      />
                    </div>
                  )}
                  {remainingEvents[1] && (
                    <div className="md:col-span-5 md:pt-8">
                      <EventCard
                        event={remainingEvents[1]}
                        isRegistered={registeredIds.includes(remainingEvents[1].id)}
                        onToggleRegister={onToggleRegister}
                        onSelectEvent={onSelectEvent}
                        featured={false}
                        index={3}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Row 2: Wide Horizontal Banner Feature */}
              {remainingEvents[2] && (
                <EventCard
                  event={remainingEvents[2]}
                  isRegistered={registeredIds.includes(remainingEvents[2].id)}
                  onToggleRegister={onToggleRegister}
                  onSelectEvent={onSelectEvent}
                  layoutVariant="wide"
                  index={4}
                />
              )}

              {/* Row 3: Balanced Curated Grid for further events */}
              {remainingEvents.slice(3).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {remainingEvents.slice(3).map((event, idx) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isRegistered={registeredIds.includes(event.id)}
                      onToggleRegister={onToggleRegister}
                      onSelectEvent={onSelectEvent}
                      featured={false}
                      index={idx + 5}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
