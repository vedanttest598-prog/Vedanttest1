import { ArrowUpRight, Compass } from 'lucide-react';

interface FooterProps {
  onNavigateTo: (sectionId: string) => void;
}

export function Footer({ onNavigateTo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#141414] text-[#F5F3EE] relative overflow-hidden">
      {/* Upper Pre-Footer Call to Action */}
      <div className="border-b border-white/10 py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#D8FF3E] uppercase tracking-widest bg-white/5 px-3 py-1.5 border border-white/10">
            <span>FALL SEMESTER IS TICKING</span>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter uppercase leading-[0.9]">
              MAKE MORE OF YOUR CAMPUS.
            </h2>
            <p className="font-display text-xl sm:text-2xl text-[#F5F3EE]/75 max-w-xl mx-auto">
              The best college memories rarely happen when you're sitting in your room.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateTo('discover')}
              className="group inline-flex items-center gap-3 bg-[#D8FF3E] text-[#141414] hover:bg-white px-9 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-xl hover:-translate-y-0.5"
            >
              <span>DISCOVER WHAT'S NEXT</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Block */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-4 h-4 bg-[#D8FF3E] flex items-center justify-center text-[10px] text-[#141414] font-bold">
                ✳
              </span>
              <span className="font-headline text-2xl font-bold tracking-tight uppercase">
                CampusConnect
              </span>
            </div>

            <p className="text-sm text-[#F5F3EE]/70 max-w-sm leading-relaxed font-normal">
              The internet's coolest place to discover what's happening on campus. Connecting student builders, performers, athletes, and thinkers without notice-board chaos.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-white/50 pt-2">
              <Compass className="w-3.5 h-3.5 text-[#D8FF3E]" />
              <span>Campus Grid Coordinates: 42.3601° N, 71.0942° W</span>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-[#D8FF3E] uppercase font-bold tracking-wider">
              Directory Index
            </div>
            <ul className="space-y-2 text-[#F5F3EE]/75">
              <li>
                <button
                  onClick={() => onNavigateTo('discover')}
                  className="hover:text-[#D8FF3E] transition-colors cursor-pointer"
                >
                  Discover Events ↗
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('categories')}
                  className="hover:text-[#D8FF3E] transition-colors cursor-pointer"
                >
                  Browse Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('find-your-vibe')}
                  className="hover:text-[#D8FF3E] transition-colors cursor-pointer"
                >
                  Find Your Vibe Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('my-events')}
                  className="hover:text-[#D8FF3E] transition-colors cursor-pointer"
                >
                  My Saved Lineup
                </button>
              </li>
            </ul>
          </div>

          {/* Manifesto / Editorial Note Col */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-[#D8FF3E] uppercase font-bold tracking-wider">
              Campus Intelligence Protocol
            </div>
            <p className="text-[#F5F3EE]/65 leading-relaxed font-normal">
              Curated independently by university student collectives. Built for seamless discovery without social media spam, dead links, or paywalled registration gates.
            </p>
            <div className="pt-2 text-[11px] text-white/40">
              Platform Status: Local storage cache synchronized.
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div>
            © {currentYear} CampusConnect. Crafted for collegiate culture and discovery.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[#D8FF3E] hover:underline cursor-pointer"
            >
              Back to Top ↑
            </button>
            <span aria-hidden="true">·</span>
            <span>Local Storage Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
