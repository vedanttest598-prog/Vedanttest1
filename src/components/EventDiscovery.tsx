import { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
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

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All Events' || event.category === selectedCategory;

      // Search query filter (titles, descriptions, categories, venues)
      if (!searchQuery.trim()) {
        return matchesCategory;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        event.title.toLowerCase().includes(q) ||
        event.shortDescription.toLowerCase().includes(q) ||
        event.category.toLowerCase().includes(q) ||
        event.venue.toLowerCase().includes(q) ||
        event.organizer.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [events, selectedCategory, searchQuery]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'All Events';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Events');
  };

  // Find a marquee event to feature in the discovery section
  const marqueeEvent = useMemo(() => {
    // If user filtered by category, take the first matching event if available
    return filteredEvents.find((e) => e.isFeatured) || filteredEvents[0];
  }, [filteredEvents]);

  const remainingEvents = useMemo(() => {
    if (!marqueeEvent) return [];
    return filteredEvents.filter((e) => e.id !== marqueeEvent.id);
  }, [filteredEvents, marqueeEvent]);

  return (
    <section id="discover" className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-8">
      {/* Section Header */}
      <div className="space-y-4 max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#171717]/60">
          <span className="w-1.5 h-1.5 bg-[#171717]" />
          <span>Curated Index</span>
          <span aria-hidden="true" className="text-[#171717]/30">/</span>
          <span>Semester Schedule</span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717] uppercase leading-[0.95]">
          THERE'S ALWAYS SOMETHING HAPPENING.
        </h2>

        <p className="font-display text-xl sm:text-2xl text-[#171717]/80">
          Your next favourite memory starts here.
        </p>
      </div>

      {/* Search Bar & Filter Controls (Functional Segmented Tabs) */}
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

        {/* Category Horizontal Filter Bar (Interactive Buttons) */}
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

      {/* Events Grid or Empty State */}
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
      ) : (
        <div className="space-y-8">
          {/* Featured Editorial Layout for Marquee Event (if no text search query is active) */}
          {marqueeEvent && !searchQuery && (
            <div className="mb-10">
              <EventCard
                event={marqueeEvent}
                isRegistered={registeredIds.includes(marqueeEvent.id)}
                onToggleRegister={onToggleRegister}
                onSelectEvent={onSelectEvent}
                featured={true}
              />
            </div>
          )}

          {/* Varied Grid for other events */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {(searchQuery ? filteredEvents : remainingEvents).map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isRegistered={registeredIds.includes(event.id)}
                onToggleRegister={onToggleRegister}
                onSelectEvent={onSelectEvent}
                featured={false}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
