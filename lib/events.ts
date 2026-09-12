import eventsData from '../data/events.json';

export interface OSSEvent {
  id: string;
  name: string;
  description: string;
  placeholderDescription: boolean;
  type: "conference" | "summit" | "forum" | "community-day" | "member-meeting" | "themed-week";
  startDate: string | null;
  endDate: string | null;
  location: {
    city: string;
    country: string | null;
    lat: number | null;
    lng: number | null;
  };
  online: boolean;
  hybrid: boolean;
  officialWebsite: string | null;
  registrationLink: string | null;
  organizer: string;
  tags: string[];
  cfp: {
    status: "closed" | "open" | "none" | "tba" | "unknown";
    closesOn?: string;
  };
  lastUpdated: string;
}

export function getAllEvents(): OSSEvent[] {
  return eventsData as OSSEvent[];
}

export function getEventById(id: string): OSSEvent | undefined {
  return getAllEvents().find(e => e.id === id);
}

export function getUpcomingEvents(): OSSEvent[] {
  const today = new Date().toISOString().split('T')[0];
  return getAllEvents()
    .filter(e => e.startDate && e.startDate >= today)
    .sort((a, b) => (a.startDate! > b.startDate! ? 1 : -1));
}

export function getEventsByCountry(country: string): OSSEvent[] {
  return getAllEvents().filter(e => e.location.country === country);
}

export function getEventsByTag(tag: string): OSSEvent[] {
  return getAllEvents().filter(e => e.tags.includes(tag));
}

export function getAllCountries(): string[] {
  const countries = new Set<string>();
  getAllEvents().forEach(e => {
    if (e.location.country) countries.add(e.location.country);
  });
  return Array.from(countries).sort();
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllEvents().forEach(e => {
    e.tags.forEach(t => tags.add(t));
  });
  return Array.from(tags).sort();
}

export function formatEventDate(startDate: string | null, endDate: string | null): string {
  if (!startDate) return "Dates TBA";
  
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : start;
  
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  
  if (startDate === endDate || !endDate) {
    return start.toLocaleDateString('en-US', options);
  }
  
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}–${end.getDate()}, ${start.getFullYear()}`;
  }
  
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', options)}`;
}
