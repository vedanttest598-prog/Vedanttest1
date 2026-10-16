import { useState, useEffect } from 'react';
import { ArrowUpRight, Flame, MapPin } from 'lucide-react';
import { CampusEvent } from '../types';

interface CountdownBannerProps {
  event: CampusEvent;
  isRegistered: boolean;
  onToggleRegister: (event: CampusEvent) => void;
  onSelectEvent: (event: CampusEvent) => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function CountdownBanner({
  event,
  isRegistered,
  onToggleRegister,
  onSelectEvent,
}: CountdownBannerProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(event.isoDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [event.isoDate]);

  return (
    <section className="bg-[#141414] text-[#F5F3EE] py-16 sm:py-20 relative overflow-hidden border-y border-[#D8FF3E]/20">
      {/* Background Graphic Marquee Lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D8FF3E] to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          {/* Left Block: Editorial Typography & Context */}
          <div className="max-w-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-[#D8FF3E] uppercase">
              <Flame className="w-4 h-4 text-[#D8FF3E]" />
              <span>MARQUEE SPOTLIGHT</span>
              <span aria-hidden="true" className="text-white/30">/</span>
              <span>{event.category}</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase leading-[0.95]">
              THE COUNTDOWN IS ON.
            </h2>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-[#F5F3EE]">
                {event.title}
              </h3>
              <p className="text-[#F5F3EE]/70 text-sm sm:text-base leading-relaxed">
                {event.tagline}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#F5F3EE]/60 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#D8FF3E]" />
                <span>{event.venue}</span>
                <span aria-hidden="true">·</span>
                <span>{event.date}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onToggleRegister(event)}
                className={`px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  isRegistered
                    ? 'bg-[#D8FF3E] text-[#141414]'
                    : 'bg-[#F5F3EE] text-[#141414] hover:bg-[#D8FF3E]'
                }`}
              >
                {isRegistered ? '✓ INTERESTED' : 'REGISTER INTEREST ↗'}
              </button>

              <button
                onClick={() => onSelectEvent(event)}
                className="inline-flex items-center gap-1.5 px-5 py-3 text-xs font-bold tracking-widest uppercase border border-[#F5F3EE]/30 text-[#F5F3EE] hover:border-[#D8FF3E] hover:text-[#D8FF3E] transition-colors cursor-pointer"
              >
                <span>EVENT DOSSIER</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Block: Dramatic Numerals Timer Grid */}
          <div className="w-full lg:w-auto">
            {timeLeft.isExpired ? (
              <div className="border border-[#D8FF3E] p-8 text-center bg-[#1d1d1d]">
                <p className="font-display text-2xl font-bold text-[#D8FF3E]">EVENT CURRENTLY UNDERWAY</p>
                <p className="text-xs font-mono text-white/60 mt-1">Doors opened at {event.venue}</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                {/* Days */}
                <div className="bg-[#1c1c1c] border border-white/10 p-3 sm:p-5 flex flex-col justify-center min-w-[70px] sm:min-w-[100px]">
                  <span className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#F5F3EE] tabular-nums">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-[#F5F3EE]/50 mt-1">
                    DAYS
                  </span>
                </div>

                {/* Hours */}
                <div className="bg-[#1c1c1c] border border-white/10 p-3 sm:p-5 flex flex-col justify-center min-w-[70px] sm:min-w-[100px]">
                  <span className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#F5F3EE] tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-[#F5F3EE]/50 mt-1">
                    HOURS
                  </span>
                </div>

                {/* Minutes */}
                <div className="bg-[#1c1c1c] border border-white/10 p-3 sm:p-5 flex flex-col justify-center min-w-[70px] sm:min-w-[100px]">
                  <span className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#F5F3EE] tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-[#F5F3EE]/50 mt-1">
                    MINUTES
                  </span>
                </div>

                {/* Seconds - Accent highlighted */}
                <div className="bg-[#1c1c1c] border border-[#D8FF3E]/40 p-3 sm:p-5 flex flex-col justify-center min-w-[70px] sm:min-w-[100px] relative">
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#D8FF3E]" />
                  <span className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#D8FF3E] tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-[#D8FF3E]/80 mt-1">
                    SECONDS
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
