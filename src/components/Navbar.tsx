import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Bookmark } from 'lucide-react';

interface NavbarProps {
  registeredCount: number;
  onNavigateTo: (sectionId: string) => void;
}

export function Navbar({ registeredCount, onNavigateTo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigateTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F3EE]/95 backdrop-blur-md border-b border-[#171717]/10 py-3 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="group flex items-center gap-2.5 text-left focus-visible:outline-2 focus-visible:outline-[#171717] rounded-xs"
        >
          <span className="w-4 h-4 bg-[#141414] group-hover:bg-[#D8FF3E] transition-colors duration-200 flex items-center justify-center text-[10px] text-[#F5F3EE] group-hover:text-[#141414] font-bold">
            ✳
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-[#171717] uppercase">
            CampusConnect
          </span>
        </button>

        {/* Zone 2: 4 single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#171717]/80">
          <button
            onClick={() => handleLinkClick('discover')}
            className="hover:text-[#171717] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#171717] after:scale-x-0 hover:after:scale-x-100 after:transition-transform cursor-pointer whitespace-nowrap shrink-0"
          >
            Discover
          </button>
          <button
            onClick={() => handleLinkClick('categories')}
            className="hover:text-[#171717] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#171717] after:scale-x-0 hover:after:scale-x-100 after:transition-transform cursor-pointer whitespace-nowrap shrink-0"
          >
            Categories
          </button>
          <button
            onClick={() => handleLinkClick('my-events')}
            className="hover:text-[#171717] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#171717] after:scale-x-0 hover:after:scale-x-100 after:transition-transform cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>My Events</span>
            {registeredCount > 0 && (
              <span className="font-mono text-[11px] font-bold text-[#141414] bg-[#D8FF3E] px-1.5 py-0.2">
                {registeredCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleLinkClick('find-your-vibe')}
            className="hover:text-[#171717] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#171717] after:scale-x-0 hover:after:scale-x-100 after:transition-transform cursor-pointer whitespace-nowrap shrink-0"
          >
            Find Your Vibe
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={() => handleLinkClick('discover')}
            className="group inline-flex items-center gap-2 bg-[#141414] text-[#F5F3EE] hover:bg-[#D8FF3E] hover:text-[#141414] px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Explore Events</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          {registeredCount > 0 && (
            <button
              onClick={() => handleLinkClick('my-events')}
              className="p-2 text-xs font-mono font-bold bg-[#D8FF3E] text-[#141414] flex items-center gap-1"
              aria-label="View lineup"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{registeredCount}</span>
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#171717] hover:bg-black/5 rounded-xs cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F3EE] border-b border-[#171717]/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3 font-display text-lg font-semibold">
            <button
              onClick={() => handleLinkClick('discover')}
              className="text-left text-[#171717] py-2 border-b border-[#171717]/5"
            >
              Discover
            </button>
            <button
              onClick={() => handleLinkClick('categories')}
              className="text-left text-[#171717] py-2 border-b border-[#171717]/5"
            >
              Categories
            </button>
            <button
              onClick={() => handleLinkClick('my-events')}
              className="text-left text-[#171717] py-2 border-b border-[#171717]/5 flex items-center justify-between"
            >
              <span>My Lineup</span>
              <span className="font-mono text-xs bg-[#D8FF3E] text-[#141414] px-2 py-0.5 font-bold">
                {registeredCount} saved
              </span>
            </button>
            <button
              onClick={() => handleLinkClick('find-your-vibe')}
              className="text-left text-[#171717] py-2 border-b border-[#171717]/5"
            >
              Find Your Vibe ✳
            </button>
          </div>
          <button
            onClick={() => handleLinkClick('discover')}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#141414] text-[#F5F3EE] py-3 text-xs font-semibold tracking-wider uppercase"
          >
            <span>Explore All Events</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
