import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { heroFestImg } from '../data/events';

interface HeroProps {
  totalEvents: number;
  onExploreClick: () => void;
  onVibeClick: () => void;
}

export function Hero({ totalEvents, onExploreClick, onVibeClick }: HeroProps) {
  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-[#171717]/10">
      {/* Background subtle architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        {/* Top Editorial Kicker Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#171717]/10 text-xs font-mono uppercase tracking-wider text-[#171717]/70">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#171717] rotate-45 inline-block" />
            <span className="font-semibold text-[#171717]">Campus Life Intelligence</span>
            <span aria-hidden="true" className="text-[#171717]/30">/</span>
            <span>Fall Semester 2026</span>
          </div>

          <div className="flex items-center gap-2 font-bold text-[#141414] bg-[#D8FF3E] px-3 py-1 text-[11px] tracking-widest">
            <span className="w-1.5 h-1.5 bg-[#141414] inline-block animate-ping" />
            <span>{totalEvents} EVENTS ON THE RADAR</span>
          </div>
        </div>

        {/* Main Grid: Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 lg:pt-12 items-center">
          {/* Left Column: Big Expressive Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-widest text-[#171717]/60">
                The Curated University Hub
              </p>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold leading-[0.92] tracking-tighter text-[#171717] uppercase">
                YOUR CAMPUS.<br />
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#171717] via-[#2a2a2a] to-[#171717]">
                  YOUR WORLD.
                </span>
              </h1>
            </div>

            <div className="space-y-4 max-w-xl">
              <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#171717]">
                Find the things you didn't know you were missing.
              </h2>
              <p className="text-base sm:text-lg text-[#171717]/80 leading-relaxed">
                From underground gigs to game-changing workshops, discover everything happening around your campus — all in one place. No scattered group chats, no missed deadlines.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="group inline-flex items-center gap-3 bg-[#141414] text-[#F5F3EE] hover:bg-[#D8FF3E] hover:text-[#141414] px-7 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
              >
                <span>EXPLORE EVENTS</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <button
                onClick={onVibeClick}
                className="group inline-flex items-center gap-2.5 bg-transparent border-2 border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-[#F5F3EE] px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#7C3AED] group-hover:text-[#D8FF3E] transition-colors" />
                <span>FIND MY VIBE ✳</span>
              </button>
            </div>

            {/* Metadata ticker info */}
            <div className="pt-6 border-t border-[#171717]/10 flex flex-wrap items-center gap-6 text-xs text-[#171717]/70 font-mono">
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#171717]" />
                <span>Zero Notice-Board Noise</span>
              </div>
              <span aria-hidden="true" className="text-[#171717]/30">·</span>
              <div>Direct Calendar Lineup</div>
              <span aria-hidden="true" className="text-[#171717]/30">·</span>
              <div>100% Student Curated</div>
            </div>
          </div>

          {/* Right Column: Layered Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative group mx-auto max-w-lg lg:max-w-none">
              {/* Asymmetric decorative framing card behind */}
              <div className="absolute -inset-3 bg-[#141414] -rotate-1 transition-transform group-hover:-rotate-2 duration-300 pointer-events-none" />

              {/* Main Image Container */}
              <div className="relative overflow-hidden bg-[#141414] aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 border border-[#141414]">
                <img
                  src={heroFestImg}
                  alt="Students enjoying a packed campus music festival amphitheater"
                  className="w-full h-full object-cover object-center filter saturate-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Scrim for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Overlaid Editorial Tag */}
                <div className="absolute top-4 right-4 bg-[#D8FF3E] text-[#141414] font-mono text-[10px] font-bold tracking-widest px-3 py-1 uppercase shadow-md">
                  LIVE CAMPUS SCENE
                </div>

                {/* Bottom caption overlay inside image */}
                <div className="absolute bottom-4 left-4 right-4 text-[#F5F3EE] space-y-1">
                  <div className="text-[11px] font-mono text-[#D8FF3E] uppercase tracking-wider">
                    Annual Quad Amphitheater Fest
                  </div>
                  <div className="font-display font-bold text-lg leading-tight">
                    "2,400 voices under the autumn sky."
                  </div>
                </div>
              </div>

              {/* Rotating Circular Stamp Badge floating over edge */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex w-24 h-24 rounded-full bg-[#141414] text-[#F5F3EE] items-center justify-center border-2 border-[#D8FF3E] p-2 shadow-2xl">
                <div className="relative w-full h-full flex items-center justify-center animate-spin [animation-duration:16s]">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                      />
                    </defs>
                    <text fontSize="10.5" fontWeight="bold" fill="#F5F3EE" letterSpacing="2.5">
                      <textPath href="#circlePath">
                        CAMPUS · UNLOCKED · CAMPUS ·
                      </textPath>
                    </text>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-bold text-sm text-[#D8FF3E]">
                    ✳
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
