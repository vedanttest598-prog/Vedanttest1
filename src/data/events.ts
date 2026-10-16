import { CampusEvent, EventCategory, VibeInterest, VibeInterestId, VibeMatchResult } from '../types';

import heroFestImg from '../assets/images/hero_campus_fest_1792163743837.jpg';
import hackathonImg from '../assets/images/event_hackathon_1792163744824.jpg';
import concertImg from '../assets/images/event_music_concert_1792163745658.jpg';
import workshopImg from '../assets/images/event_design_workshop_1792163746298.jpg';
import sportsImg from '../assets/images/event_sports_cup_1792163746478.jpg';

export { heroFestImg, hackathonImg, concertImg, workshopImg, sportsImg };

export const CATEGORIES: EventCategory[] = [
  'All Events',
  'Technical',
  'Cultural',
  'Music',
  'Sports',
  'Workshops',
  'Seminars',
  'Entrepreneurship',
];

export const VIBE_INTERESTS: VibeInterest[] = [
  {
    id: 'coding-tech',
    label: 'Coding & Technology',
    tagline: 'Hackathons, dev sprints, algorithms & AI labs',
    categoryTags: ['Technical', 'Seminars'],
    keywords: ['code', 'hack', 'software', 'ai', 'cloud', 'dev', 'algorithm', 'system', 'tech', 'data'],
  },
  {
    id: 'music-live',
    label: 'Music & Live Events',
    tagline: 'Gigs, amphitheater concerts & underground sets',
    categoryTags: ['Music', 'Cultural'],
    keywords: ['music', 'band', 'concert', 'sound', 'live', 'stage', 'synth', 'rhythm', 'amps'],
  },
  {
    id: 'design-creative',
    label: 'Design & Creativity',
    tagline: 'Visual arts, UI/UX, typography & physical prototyping',
    categoryTags: ['Workshops', 'Cultural'],
    keywords: ['design', 'visual', 'prototype', 'studio', 'art', 'ux', 'craft', 'graphic', 'typography'],
  },
  {
    id: 'entrepreneurship',
    label: 'Entrepreneurship',
    tagline: 'Venture pitches, founders, angels & product validation',
    categoryTags: ['Entrepreneurship', 'Seminars', 'Workshops'],
    keywords: ['startup', 'pitch', 'venture', 'founder', 'business', 'investor', 'mvp', 'market'],
  },
  {
    id: 'sports-fitness',
    label: 'Sports & Fitness',
    tagline: 'Intercollegiate cups, track showdowns & team spirit',
    categoryTags: ['Sports'],
    keywords: ['sports', 'tournament', 'athletic', 'field', 'match', 'cup', 'team', 'fitness', 'race'],
  },
  {
    id: 'photography',
    label: 'Photography',
    tagline: 'Golden hour walks, analog labs & documentary captures',
    categoryTags: ['Cultural', 'Workshops'],
    keywords: ['photo', 'camera', 'lens', 'light', 'walk', 'visual', 'shoot', 'framing', 'film'],
  },
  {
    id: 'culture-performance',
    label: 'Culture & Performance',
    tagline: 'Theater, global dance, spoken word & campus heritage',
    categoryTags: ['Cultural', 'Music'],
    keywords: ['culture', 'dance', 'performance', 'heritage', 'tradition', 'theater', 'stage', 'arts'],
  },
  {
    id: 'networking-learning',
    label: 'Networking & Learning',
    tagline: 'Industry leaders, keynotes & cross-disciplinary firesides',
    categoryTags: ['Seminars', 'Entrepreneurship', 'Workshops'],
    keywords: ['career', 'network', 'learn', 'keynote', 'industry', 'mentorship', 'panel', 'insight'],
  },
];

export const EVENTS_DATA: CampusEvent[] = [
  {
    id: 'event-01',
    title: 'Neon Nights — College Music Festival',
    tagline: 'Three stages, nine student bands, and an amphitheater bathed in sound.',
    category: 'Music',
    date: 'Fri, Nov 6, 2026',
    isoDate: '2026-11-06T18:00:00',
    startTime: '18:00',
    endTime: '23:30',
    venue: 'East Quad Amphitheater & Sound Lawn',
    shortDescription: 'The biggest annual indie music celebration on campus featuring headline student acts, brass ensembles, and ambient audiovisual projections.',
    fullDescription: 'Neon Nights unites the university musical underground for five continuous hours of live performances across three stages. From fuzzy indie dream-pop to heavy brass-infused rhythms, this is the autumn soundtrack of student life. Food trucks from across the city, community merch stalls, and collaborative laser art projections will illuminate the quad.',
    imageUrl: concertImg,
    organizer: 'Campus Live Music Union & Student Activities Council',
    registrationDeadline: 'Nov 5, 2026 at 23:59',
    capacity: '2,400 students',
    expectedAttendance: '1,800+ attendees',
    interestTags: ['music-live', 'culture-performance'],
    isFeatured: true,
  },
  {
    id: 'event-02',
    title: 'CodeStorm — 24-Hour Hackathon',
    tagline: 'Build, break, iterate. A weekend of relentless engineering and caffeine.',
    category: 'Technical',
    date: 'Sat, Oct 24, 2026',
    isoDate: '2026-10-24T10:00:00',
    startTime: '10:00',
    endTime: 'Next Day 10:00',
    venue: 'Turing Innovation Pavilion & Glass Atrium',
    shortDescription: 'Over 300 student builders constructing intelligent agents, decentralized protocols, and climate tech prototypes with mentor backing.',
    fullDescription: 'CodeStorm is the premier university hackathon challenging collegiate engineers, designers, and domain specialists to ship functional prototypes within 24 intense hours. Includes complimentary midnight pizza, cloud computing credits, hardware lab access, and technical mentorship from leading tech alumni.',
    imageUrl: hackathonImg,
    organizer: 'Department of Computer Science & Open Source Guild',
    registrationDeadline: 'Oct 22, 2026 at 18:00',
    capacity: '320 hackers (80 teams of 4)',
    expectedAttendance: '300 builders',
    interestTags: ['coding-tech', 'entrepreneurship'],
    isFeatured: true,
  },
  {
    id: 'event-03',
    title: 'Design Playground — Creative Studio Workshop',
    tagline: 'Get your hands dirty with physical modeling, generative typography, and tactile craft.',
    category: 'Workshops',
    date: 'Thu, Oct 29, 2026',
    isoDate: '2026-10-29T14:00:00',
    startTime: '14:00',
    endTime: '18:00',
    venue: 'Bauhaus Makerspace & Studio 4',
    shortDescription: 'A four-hour tactile immersion into rapid physical prototyping, laser cutting, and contemporary editorial publication design.',
    fullDescription: 'Step away from Figma for an afternoon and discover the tactile magic of tangible studio craft. Led by visiting faculty and senior industrial designers, participants will explore laser-cut foam board architectures, silkscreen printmaking, and layout composition for limited-edition campus zines. All materials provided.',
    imageUrl: workshopImg,
    organizer: 'School of Architecture & Visual Design Society',
    registrationDeadline: 'Oct 28, 2026 at 12:00',
    capacity: '45 participants',
    expectedAttendance: '45 designers',
    interestTags: ['design-creative', 'photography'],
    isFeatured: false,
  },
  {
    id: 'event-04',
    title: 'Campus Cup — Intercollegiate Sports Showdown',
    tagline: 'The annual fall rivalry. Pitch battles, roaring bleachers, and sheer adrenaline.',
    category: 'Sports',
    date: 'Sat, Nov 14, 2026',
    isoDate: '2026-11-14T09:00:00',
    startTime: '09:00',
    endTime: '19:00',
    venue: 'Varsity Athletic Complex & Main Floodlit Field',
    shortDescription: 'Eight regional universities clashing in rugby sevens, 5v5 soccer, and sprint relays under the stadium lights.',
    fullDescription: 'The fiercest athletic tradition of the semester returns. Cheer on campus teams across soccer championships, high-stakes rugby sevens, and track sprint finals. Featuring live sideline commentary, brass band walk-ins, food stalls, and an evening trophy celebration under stadium lights.',
    imageUrl: sportsImg,
    organizer: 'Athletic Department & Student Sports Federation',
    registrationDeadline: 'Nov 12, 2026 at 17:00',
    capacity: '3,000 spectators',
    expectedAttendance: '2,200 spectators',
    interestTags: ['sports-fitness', 'culture-performance'],
    isFeatured: false,
  },
  {
    id: 'event-05',
    title: 'Culture Collective — Global Rhythm & Arts Night',
    tagline: 'A celebration of cross-continental folklore, culinary heritage, and dance performance.',
    category: 'Cultural',
    date: 'Fri, Nov 20, 2026',
    isoDate: '2026-11-20T19:00:00',
    startTime: '19:00',
    endTime: '23:00',
    venue: 'Student Union Great Hall & Terrace',
    shortDescription: 'Student cultural societies present traditional choreography, acoustic folk instruments, and culinary tastings from over 35 countries.',
    fullDescription: 'Culture Collective transforms the Great Hall into a vibrant bazaar of world arts. Experience traditional dance troupes, spoken word poetry in multiple tongues, hand-crafted folk textile exhibitions, and culinary sampling booths prepared by diverse student associations.',
    imageUrl: heroFestImg,
    organizer: 'International Students Association & Arts Collective',
    registrationDeadline: 'Nov 19, 2026 at 20:00',
    capacity: '800 attendees',
    expectedAttendance: '750 attendees',
    interestTags: ['culture-performance', 'music-live'],
    isFeatured: false,
  },
  {
    id: 'event-06',
    title: 'Pitch Perfect — Seed Venture Competition',
    tagline: 'Ten student venture teams. 5 minutes on the clock. $25,000 non-dilutive grant pool.',
    category: 'Entrepreneurship',
    date: 'Tue, Nov 3, 2026',
    isoDate: '2026-11-03T15:00:00',
    startTime: '15:00',
    endTime: '18:30',
    venue: 'Kresge Auditorium & Founder Lounge',
    shortDescription: 'Witness collegiate founders pitch hardware, climate tech, and consumer software innovations to visiting angel investors and alumni partners.',
    fullDescription: 'Experience the electric atmosphere of the campus venture showcase. Ten student finalist teams present live product demonstrations to an expert panel of venture partners, angel investors, and experienced operators. Audience voting decides the $5,000 People Choice Innovation Award.',
    imageUrl: hackathonImg,
    organizer: 'University Venture Lab & Entrepreneurship Club',
    registrationDeadline: 'Nov 2, 2026 at 16:00',
    capacity: '350 seats',
    expectedAttendance: '320 attendees',
    interestTags: ['entrepreneurship', 'networking-learning', 'coding-tech'],
    isFeatured: false,
  },
  {
    id: 'event-07',
    title: 'Lens & Light — Golden Hour Campus Photo Walk',
    tagline: 'Mastering natural architectural lighting, dynamic framing, and visual narrative.',
    category: 'Cultural',
    date: 'Tue, Oct 27, 2026',
    isoDate: '2026-10-27T16:30:00',
    startTime: '16:30',
    endTime: '19:00',
    venue: 'Memorial Belltower & West Botanical Garden',
    shortDescription: 'A guided documentary photography session exploring autumn light, brutalist concrete textures, and candid student portraits.',
    fullDescription: 'Bring your mirrorless camera, 35mm film body, or even your phone. Led by an award-winning editorial photojournalist alumnus, this walking masterclass explores capturing dramatic diagonal shadows, architectural negative space, and evocative candid moments before finishing with print reviews over hot cider.',
    imageUrl: workshopImg,
    organizer: 'Campus Photographic Society',
    registrationDeadline: 'Oct 26, 2026 at 19:00',
    capacity: '35 photographers',
    expectedAttendance: '35 participants',
    interestTags: ['photography', 'design-creative', 'culture-performance'],
    isFeatured: false,
  },
  {
    id: 'event-08',
    title: 'Beyond the Classroom — Future of Tech & AI Summit',
    tagline: 'Distinguished alumni keynotes on frontier models, quantum computing, and ethical systems.',
    category: 'Seminars',
    date: 'Wed, Nov 11, 2026',
    isoDate: '2026-11-11T13:00:00',
    startTime: '13:00',
    endTime: '17:00',
    venue: 'Center for Computing & Data Sciences, Hall A',
    shortDescription: 'A four-hour symposium featuring research scientists, silicon valley founders, and campus faculty probing the frontier of artificial intelligence.',
    fullDescription: 'A high-signal symposium cutting through marketing hype to examine technical breakthroughs in multi-modal architectures, neuromorphic computing, and algorithmic accountability. Followed by a networking coffee hour connecting undergraduates directly with research labs and industry fellows.',
    imageUrl: hackathonImg,
    organizer: 'Institute for Computing & Technology Ethics Council',
    registrationDeadline: 'Nov 10, 2026 at 12:00',
    capacity: '400 attendees',
    expectedAttendance: '380 attendees',
    interestTags: ['coding-tech', 'networking-learning', 'entrepreneurship'],
    isFeatured: false,
  },
  {
    id: 'event-09',
    title: 'Sonic Alchemy — Modular Synth & Electronic Live Lab',
    tagline: 'Patch cables, analog oscillators, and improvisational sub-bass frequencies.',
    category: 'Music',
    date: 'Wed, Nov 18, 2026',
    isoDate: '2026-11-18T20:00:00',
    startTime: '20:00',
    endTime: '01:00',
    venue: 'Underground Media Cellar, Room B12',
    shortDescription: 'An experimental electronic audio session where student producers patch Eurorack synthesizers live, blending ambient techno and IDM.',
    fullDescription: 'Descend into the acoustic bunker beneath the fine arts library for an evening of pure sound exploration. No laptops allowed on stage: only tactile knobs, CV voltage triggers, and analog signal paths. Features quadraphonic spatial sound setup and hands-on patch stations for curious attendees.',
    imageUrl: concertImg,
    organizer: 'Audio Engineering Society & Electronic Music Guild',
    registrationDeadline: 'Nov 17, 2026 at 22:00',
    capacity: '120 sound enthusiasts',
    expectedAttendance: '120 attendees',
    interestTags: ['music-live', 'design-creative'],
    isFeatured: false,
  },
  {
    id: 'event-10',
    title: 'Sprint & Scale — Product Sprint Masterclass',
    tagline: 'From fuzzy customer problem to tested interactive prototype in five hours.',
    category: 'Workshops',
    date: 'Wed, Dec 2, 2026',
    isoDate: '2026-12-02T11:00:00',
    startTime: '11:00',
    endTime: '16:00',
    venue: 'Innovation Garage, Suite 202',
    shortDescription: 'Hands-on product strategy sprint modeled after top venture studio methodologies. Learn user interviewing, wireframing, and rapid validation.',
    fullDescription: 'Whether you have a startup idea or want to sharpen your product management chops, this intensive workshop guides interdisciplinary teams through rapid user persona mapping, storyboard prototyping, and guerrilla guerrilla testing across campus lunch areas. Lunch and sprint workbooks included.',
    imageUrl: workshopImg,
    organizer: 'Student Product Guild & Venture Accelerator',
    registrationDeadline: 'Dec 1, 2026 at 15:00',
    capacity: '50 students',
    expectedAttendance: '50 attendees',
    interestTags: ['entrepreneurship', 'design-creative', 'networking-learning'],
    isFeatured: false,
  },
];

/**
 * Local heuristic matching algorithm for the "Find Your Vibe" feature.
 * Calculates relevance score based on:
 * 1. Direct interest tag matches
 * 2. Category alignment
 * 3. Keyword co-occurrence in event title, tagline, and description
 */
export function calculateVibeMatches(selectedInterestIds: VibeInterestId[]): VibeMatchResult[] {
  if (selectedInterestIds.length === 0) {
    return [];
  }

  const selectedInterests = VIBE_INTERESTS.filter((interest) =>
    selectedInterestIds.includes(interest.id)
  );

  const results: VibeMatchResult[] = EVENTS_DATA.map((event) => {
    let score = 0;
    const matchReasons: string[] = [];

    // 1. Tag overlap (high weight)
    const tagOverlap = event.interestTags.filter((tag) =>
      selectedInterestIds.includes(tag)
    );
    if (tagOverlap.length > 0) {
      score += tagOverlap.length * 40;
      const matchingInterestLabels = selectedInterests
        .filter((i) => tagOverlap.includes(i.id))
        .map((i) => i.label);
      matchReasons.push(`Direct fit for ${matchingInterestLabels.join(' & ')}`);
    }

    // 2. Category overlap (medium weight)
    for (const interest of selectedInterests) {
      if (interest.categoryTags.includes(event.category)) {
        score += 20;
        if (!matchReasons.some((r) => r.includes(interest.label))) {
          matchReasons.push(`Matches your interest in ${interest.label}`);
        }
      }
    }

    // 3. Keyword scan (textual relevance)
    const searchableText = `${event.title} ${event.tagline} ${event.shortDescription} ${event.venue}`.toLowerCase();
    let keywordHits = 0;
    for (const interest of selectedInterests) {
      for (const kw of interest.keywords) {
        if (searchableText.includes(kw.toLowerCase())) {
          keywordHits++;
        }
      }
    }
    score += Math.min(keywordHits * 4, 30);

    // Normalize percentage (cap at 98% for realistic heuristic feel, minimum 35% if some match)
    const maxPossibleScore = selectedInterestIds.length * 60 + 30;
    const rawPct = Math.round((score / Math.max(maxPossibleScore, 70)) * 100);
    const matchPercentage = Math.min(Math.max(rawPct, 42), 98);

    const primaryReason =
      matchReasons[0] || `Curated for students passionate about ${selectedInterests[0].label}`;

    return {
      event,
      score,
      matchPercentage,
      reason: primaryReason,
    };
  });

  // Sort descending by score
  return results
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

/**
 * Get personalized recommendations based on either registered events or default vibe
 */
export function getRecommendedEvents(
  registeredEventIds: string[],
  selectedInterests: VibeInterestId[]
): { event: CampusEvent; rationale: string }[] {
  // If user has specific interest tags selected, run vibe match
  if (selectedInterests.length > 0) {
    const matches = calculateVibeMatches(selectedInterests);
    return matches.slice(0, 3).map((m) => ({
      event: m.event,
      rationale: m.reason,
    }));
  }

  // If user registered for events, find similar ones
  if (registeredEventIds.length > 0) {
    const savedEvents = EVENTS_DATA.filter((e) => registeredEventIds.includes(e.id));
    const savedCategories = new Set(savedEvents.map((e) => e.category));
    const savedTags = new Set(savedEvents.flatMap((e) => e.interestTags));

    const recommendations = EVENTS_DATA.filter(
      (e) => !registeredEventIds.includes(e.id)
    ).map((event) => {
      let score = 0;
      let reason = 'Curated pick for your taste';
      if (savedCategories.has(event.category)) {
        score += 30;
        reason = `Because you showed interest in ${event.category} events`;
      }
      const tagMatch = event.interestTags.filter((t) => savedTags.has(t));
      if (tagMatch.length > 0) {
        score += tagMatch.length * 20;
        reason = 'Alongsides your existing campus lineup';
      }
      return { event, score, rationale: reason };
    });

    recommendations.sort((a, b) => b.score - a.score);
    return recommendations.slice(0, 3);
  }

  // Default curated 3 highlights
  return [
    {
      event: EVENTS_DATA[0], // Neon Nights
      rationale: 'Largest campus gathering of the semester',
    },
    {
      event: EVENTS_DATA[1], // CodeStorm
      rationale: 'Top rated for builders & creative technologists',
    },
    {
      event: EVENTS_DATA[2], // Design Playground
      rationale: 'High-demand tactile workshop with limited seats',
    },
  ];
}
