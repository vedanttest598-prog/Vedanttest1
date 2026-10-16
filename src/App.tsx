import { useState, useEffect, useCallback } from 'react';
import { CampusEvent, VibeInterestId } from './types';
import { EVENTS_DATA } from './data/events';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CountdownBanner } from './components/CountdownBanner';
import { EventDiscovery } from './components/EventDiscovery';
import { RecommendedSection } from './components/RecommendedSection';
import { FindYourVibeSection } from './components/FindYourVibeSection';
import { MyEventsSection } from './components/MyEventsSection';
import { EventDetailModal } from './components/EventDetailModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

const STORAGE_KEY = 'campusconnect_lineup_v1';

export default function App() {
  // Local storage initialization with safety check
  const [registeredIds, setRegisteredIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage access errors in restricted iframe
    }
    // Default initial demonstration lineup: 1 exciting event already saved
    return ['event-01'];
  });

  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeInterests, setActiveInterests] = useState<VibeInterestId[]>([
    'coding-tech',
    'music-live',
  ]);

  // Sync to localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registeredIds));
    } catch {
      // Ignore quota or private browsing errors
    }
  }, [registeredIds]);

  // Toggle registration handler
  const handleToggleRegister = useCallback((event: CampusEvent) => {
    setRegisteredIds((prev) => {
      const isAlreadyRegistered = prev.includes(event.id);
      if (isAlreadyRegistered) {
        setToastMessage(`Removed "${event.title.split('—')[0].trim()}" from your lineup.`);
        return prev.filter((id) => id !== event.id);
      } else {
        setToastMessage(`You're on the list for "${event.title.split('—')[0].trim()}"! See you there.`);
        return [...prev, event.id];
      }
    });
  }, []);

  const handleRemoveInterest = useCallback((eventId: string) => {
    const targetEvent = EVENTS_DATA.find((e) => e.id === eventId);
    setRegisteredIds((prev) => prev.filter((id) => id !== eventId));
    if (targetEvent) {
      setToastMessage(`Removed "${targetEvent.title.split('—')[0].trim()}" from your lineup.`);
    }
  }, []);

  const handleSelectEvent = useCallback((event: CampusEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Marquee event for the countdown banner (Neon Nights music festival)
  const countdownEvent = EVENTS_DATA[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F3EE] text-[#171717] selection:bg-[#D8FF3E] selection:text-[#141414]">
      {/* Navigation */}
      <Navbar
        registeredCount={registeredIds.length}
        onNavigateTo={scrollToSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <Hero
          totalEvents={EVENTS_DATA.length}
          onExploreClick={() => scrollToSection('discover')}
          onVibeClick={() => scrollToSection('find-your-vibe')}
        />

        {/* Section 2: Countdown Banner for Headline Event */}
        <CountdownBanner
          event={countdownEvent}
          isRegistered={registeredIds.includes(countdownEvent.id)}
          onToggleRegister={handleToggleRegister}
          onSelectEvent={handleSelectEvent}
        />

        {/* Section 3: Event Discovery & Search */}
        <EventDiscovery
          events={EVENTS_DATA}
          registeredIds={registeredIds}
          onToggleRegister={handleToggleRegister}
          onSelectEvent={handleSelectEvent}
        />

        {/* Section 4: Recommended for You */}
        <RecommendedSection
          registeredIds={registeredIds}
          selectedInterests={activeInterests}
          onSelectEvent={handleSelectEvent}
          onToggleRegister={handleToggleRegister}
          onExploreMoreClick={() => scrollToSection('discover')}
        />

        {/* Section 5: Find Your Vibe (WOW Feature) */}
        <FindYourVibeSection
          onSelectEvent={handleSelectEvent}
          registeredIds={registeredIds}
          onToggleRegister={handleToggleRegister}
          onInterestsChange={(interests) => setActiveInterests(interests)}
        />

        {/* Section 6: My Events Lineup */}
        <MyEventsSection
          events={EVENTS_DATA}
          registeredIds={registeredIds}
          onRemoveInterest={handleRemoveInterest}
          onSelectEvent={handleSelectEvent}
          onExploreClick={() => scrollToSection('discover')}
        />
      </main>

      {/* Section 7: Final CTA & Footer */}
      <Footer onNavigateTo={scrollToSection} />

      {/* Event Details Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isRegistered={selectedEvent ? registeredIds.includes(selectedEvent.id) : false}
        onToggleRegister={handleToggleRegister}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
