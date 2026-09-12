import { OSSEvent, formatEventDate } from "@/lib/events";
import Link from "next/link";
import { Calendar, MapPin, Globe } from "lucide-react";

export default function EventCard({ event }: { event: OSSEvent }) {
  return (
    <Link 
      href={`/events/${event.id}`}
      className="group block rounded-xl border border-surface-highlight bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent-blue hover:shadow-lg hover:shadow-accent-blue/10"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <span className="inline-flex rounded-full bg-surface-highlight px-2.5 py-0.5 text-xs font-semibold text-secondary uppercase tracking-wider">
          {event.type.replace('-', ' ')}
        </span>
        {event.cfp.status === "open" && (
          <span className="inline-flex rounded-full bg-accent-green/10 px-2.5 py-0.5 text-xs font-semibold text-accent-green uppercase tracking-wider border border-accent-green/20">
            CFP Open
          </span>
        )}
      </div>
      
      <h3 className="mb-2 text-xl font-bold text-primary group-hover:text-accent-blue transition-colors">
        {event.name}
      </h3>
      
      <p className="mb-6 line-clamp-2 text-sm text-secondary">
        {event.description}
      </p>
      
      <div className="flex flex-col gap-2 text-sm text-secondary">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0 text-accent-blue" />
          <span>{formatEventDate(event.startDate, event.endDate)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {event.online && !event.hybrid ? (
            <Globe className="h-4 w-4 shrink-0 text-accent-green" />
          ) : (
            <MapPin className="h-4 w-4 shrink-0 text-accent-green" />
          )}
          
          <span className="truncate">
            {event.online && !event.hybrid ? "Virtual" : (
              event.location.city ? `${event.location.city}${event.location.country ? `, ${event.location.country}` : ''}${event.hybrid ? ' & Virtual' : ''}` : 'Location TBA'
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
