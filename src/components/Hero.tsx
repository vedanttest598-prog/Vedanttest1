import { useState } from 'react';
import { ArrowUpRight, Compass, Sparkles, Volume2, VolumeX, Eye } from 'lucide-react';
import { heroFestImg, hackathonImg } from '../data/events';

interface HeroProps {
  totalEvents: number;
  onExploreClick: () => void;
  onVibeClick: () => void;
}

export function Hero({ totalEvents, onExploreClick, onVibeClick }: HeroProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Native Web Audio API procedural atmospheric chime (no external audio files needed)
  const toggleAmbientSound = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      setIsPlayingAudio(true);

      // Harmonious warm chords (F# minor 9: F#, A, C#, E, G#)
      const frequencies = [185.0, 220.0, 277.18, 329.63, 415.3];
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.8);
      masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5);
      masterGain.connect(ctx.destination);

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Subtle slow vibrato for warmth
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 3.5 + idx * 0.4;
        lfoGain.gain.value = 1.2;
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.12 / frequencies.length, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + 4.8);
        lfo.stop(ctx.currentTime + 4.8);
      });

      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 4800);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-[#171717]/10 bg-grain">
      {/* Precision architectural crosshair markers */}
      <div className="absolute top-24 left-8 text-xs font-mono text-[#171717]/30 select-none pointer-events-none hidden lg:block">
        + 42.3601° N / 71.0942° W
      </div>
      <div className="absolute top-24 right-8 text-xs font-mono text-[#171717]/30 select-none pointer-events-none hidden lg:block">
        + CC-DISPATCH-2026
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        {/* Editorial Index Kicker */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#171717]/12 text-xs font-mono uppercase tracking-wider text-[#171717]/70">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#171717] rotate-45 inline-block" />
            <span className="font-bold text-[#171717]">Campus Life Gazette</span>
            <span aria-hidden="true" className="text-[#171717]/30">/</span>
            <span>Vol. 04 · Autumn Term 2026</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Interactive Campus Sound Bite */}
            <button
              onClick={toggleAmbientSound}
              className={`inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-[#141414] text-[#D8FF3E] border-[#141414]'
                  : 'bg-white border-[#171717]/15 text-[#171717]/80 hover:border-[#171717]'
              }`}
              title="Procedural ambient audio chime"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#D8FF3E] animate-pulse" />
                  <span>QUAD SOUND ACTIVE</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>LISTEN TO QUAD SOUND</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2 font-bold text-[#141414] bg-[#D8FF3E] px-3 py-1 text-[11px] tracking-widest border border-[#141414]">
              <span className="w-1.5 h-1.5 bg-[#141414] inline-block animate-ping" />
              <span>{totalEvents} EVENTS ON RADAR</span>
            </div>
          </div>
        </div>

        {/* Hero Body: Asymmetric Typographic Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-8 lg:pt-14 items-center">
          {/* Left Column: Monumental Expressive Headline */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#171717]/60">
                <span>[DISPATCH NO. 01]</span>
                <span aria-hidden="true">·</span>
                <span>CENTRALIZED HORIZON</span>
              </div>

              <h1 className="font-headline text-5xl sm:text-7xl lg:text-[6.5rem] xl:text-[7.2rem] font-extrabold leading-[0.88] tracking-tighter text-[#171717] uppercase">
                YOUR CAMPUS.<br />
                <span className="font-serif-italic font-bold tracking-tight text-[#141414] normal-case inline-block text-4xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.2rem]">
                  your world.
                </span>
                <span className="inline-block ml-3 align-middle bg-[#141414] text-[#D8FF3E] px-3 py-1 text-xs sm:text-sm font-mono tracking-widest font-bold uppercase not-italic">
                  ✳ 2026
                </span>
              </h1>
            </div>

            <div className="space-y-4 max-w-xl">
              <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#171717]">
                Find the things you didn't know you were missing.
              </h2>
              <p className="text-base sm:text-lg text-[#171717]/80 leading-relaxed font-normal">
                From underground gigs to game-changing workshops, discover everything happening around your campus — all in one place. No scattered notice boards, no missed deadlines.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="group relative inline-flex items-center gap-3 bg-[#141414] text-[#F5F3EE] hover:bg-[#D8FF3E] hover:text-[#141414] px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                <span>EXPLORE EVENTS</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <button
                onClick={onVibeClick}
                className="group inline-flex items-center gap-2.5 bg-transparent border-2 border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-[#F5F3EE] px-7 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-[#7C3AED] group-hover:text-[#D8FF3E] transition-colors" />
                <span>FIND MY VIBE ✳</span>
              </button>
            </div>

            {/* Editorial Metadata Bar */}
            <div className="pt-6 border-t border-[#171717]/10 flex flex-wrap items-center gap-6 text-xs text-[#171717]/70 font-mono">
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#171717]" />
                <span>Zero Notice-Board Clutter</span>
              </div>
              <span aria-hidden="true" className="text-[#171717]/30">·</span>
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#171717]" />
                <span>Synchronized Weekly Lineup</span>
              </div>
              <span aria-hidden="true" className="text-[#171717]/30">·</span>
              <div>Curated for 28,000 Students</div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Image Montage */}
          <div className="lg:col-span-5 relative">
            <div className="relative group mx-auto max-w-lg lg:max-w-none">
              {/* Asymmetrical background solid shadow slab */}
              <div className="absolute -inset-3 bg-[#141414] -rotate-1 transition-transform group-hover:-rotate-2 duration-300 pointer-events-none" />

              {/* Main Image Container */}
              <div className="relative overflow-hidden bg-[#141414] aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 border-2 border-[#141414]">
                <img
                  src={heroFestImg}
                  alt="Students enjoying a packed campus music festival amphitheater"
                  className="w-full h-full object-cover object-center filter saturate-115 brightness-95 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Measured Scrim for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                {/* Overlaid Editorial Category Tag */}
                <div className="absolute top-4 right-4 bg-[#D8FF3E] text-[#141414] font-mono text-[10px] font-bold tracking-widest px-3 py-1 uppercase shadow-md border border-[#141414]">
                  LIVE CAMPUS SCENE
                </div>

                {/* Corner Swiss Crosshair */}
                <div className="absolute top-4 left-4 text-xs font-mono text-[#D8FF3E] font-bold">
                  + 01
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

              {/* Overlapping secondary editorial sticker: Hackathon preview */}
              <div className="absolute -top-6 -left-6 hidden sm:block bg-white border border-[#171717] p-2.5 shadow-xl max-w-[190px] rotate-2 hover:rotate-0 transition-transform">
                <div className="aspect-16/10 overflow-hidden bg-black mb-1.5">
                  <img
                    src={hackathonImg}
                    alt="CodeStorm hackathon snippet"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-[9px] font-mono font-bold uppercase text-[#171717] flex items-center justify-between">
                  <span>CodeStorm 24H</span>
                  <span className="text-[#7C3AED]">Oct 24</span>
                </div>
              </div>

              {/* Rotating Circular Stamp Badge */}
              <div className="absolute -bottom-6 -right-6 hidden sm:flex w-24 h-24 rounded-full bg-[#141414] text-[#F5F3EE] items-center justify-center border-2 border-[#D8FF3E] p-2 shadow-2xl">
                <div className="relative w-full h-full flex items-center justify-center animate-spin [animation-duration:18s]">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                      />
                    </defs>
                    <text fontSize="10.5" fontWeight="bold" fill="#F5F3EE" letterSpacing="2.5">
                      <textPath href="#circlePath">
                        YOUR CAMPUS · UNLOCKED ·
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

        {/* Dynamic Continuous Marquee Ticker */}
        <div className="mt-14 pt-4 pb-2 border-y border-[#171717]/10 overflow-hidden select-none">
          <div className="animate-marquee flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-[#171717]/70 whitespace-nowrap">
            <span className="font-bold text-[#171717]">CODESTORM 24-HOUR HACKATHON</span>
            <span className="text-[#D8FF3E] bg-[#141414] px-1.5 py-0.5 text-[10px]">OCT 24</span>
            <span aria-hidden="true">✦</span>
            <span>NEON NIGHTS AMPHITHEATER</span>
            <span className="text-[#D8FF3E] bg-[#141414] px-1.5 py-0.5 text-[10px]">NOV 06</span>
            <span aria-hidden="true">✦</span>
            <span>CAMPUS CUP VARSITY SHOWDOWN</span>
            <span className="text-[#D8FF3E] bg-[#141414] px-1.5 py-0.5 text-[10px]">NOV 14</span>
            <span aria-hidden="true">✦</span>
            <span>DESIGN PLAYGROUND STUDIO WORKSHOP</span>
            <span className="text-[#D8FF3E] bg-[#141414] px-1.5 py-0.5 text-[10px]">OCT 29</span>
            <span aria-hidden="true">✦</span>
            <span>CULTURE COLLECTIVE WORLD NIGHT</span>
            <span className="text-[#D8FF3E] bg-[#141414] px-1.5 py-0.5 text-[10px]">NOV 20</span>
            <span aria-hidden="true">✦</span>
            <span>PITCH PERFECT VENTURE SEED CUP</span>
            <span className="text-[#D8FF3E] bg-[#141414] px-1.5 py-0.5 text-[10px]">NOV 03</span>
            <span aria-hidden="true">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
}
