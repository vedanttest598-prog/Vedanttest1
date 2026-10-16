export type EventCategory = 
  | 'All Events'
  | 'Technical'
  | 'Cultural'
  | 'Music'
  | 'Sports'
  | 'Workshops'
  | 'Seminars'
  | 'Entrepreneurship';

export type VibeInterestId =
  | 'coding-tech'
  | 'music-live'
  | 'design-creative'
  | 'entrepreneurship'
  | 'sports-fitness'
  | 'photography'
  | 'culture-performance'
  | 'networking-learning';

export interface VibeInterest {
  id: VibeInterestId;
  label: string;
  tagline: string;
  categoryTags: EventCategory[];
  keywords: string[];
}

export interface CampusEvent {
  id: string;
  title: string;
  tagline: string;
  category: Exclude<EventCategory, 'All Events'>;
  date: string; // ISO format or formatted string
  isoDate: string; // YYYY-MM-DDTHH:mm:ss for accurate calculations
  startTime: string;
  endTime: string;
  venue: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  organizer: string;
  registrationDeadline: string;
  capacity?: string;
  expectedAttendance?: string;
  interestTags: VibeInterestId[];
  isFeatured?: boolean;
}

export interface VibeMatchResult {
  event: CampusEvent;
  score: number;
  matchPercentage: number;
  reason: string;
}
