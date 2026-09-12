import Link from "next/link";
import { ArrowUpRight, CalendarDays, Globe2, MapPin } from "lucide-react";
import { OSSEvent, formatEventDate } from "@/lib/events";

function displayType(type: OSSEvent["type"]) {
  return type.replace(/-/g, " ");
}

export default function EventCard({ event }: { event: OSSEvent }) {
  const date = event.startDate ? new Date(event.startDate) : null;
  const dateMonth = date?.toLocaleDateString("en-US", { month: "short" }).toUpperCase() ?? "TBA";
  const dateDay = date?.toLocaleDateString("en-US", { day: "numeric" }) ?? "—";
  const isVirtualOnly = event.online && !event.hybrid;
  const attendance = isVirtualOnly ? "online" : event.hybrid ? "hybrid" : "in person";
  const location = isVirtualOnly
    ? "Virtual event"
    : event.location.city
      ? `${event.location.city}${event.location.country ? `, ${event.location.country}` : ""}${event.hybrid ? " + virtual" : ""}`
      : "Location TBA";

  return (
    <Link href={`/events/${event.id}`} className="group relative grid min-h-[19rem] grid-cols-[4.75rem_minmax(0,1fr)] border border-surface-highlight bg-surface/35 transition-colors duration-150 hover:border-accent-blue hover:bg-surface/70 focus-visible:outline-offset-4">
      <div className="flex flex-col items-center border-r border-surface-highlight bg-base/45 px-2 py-5">
        <span className="font-mono text-[0.62rem] font-bold tracking-[0.1em] text-tertiary">{dateMonth}</span>
        <span className="mt-1 font-display text-3xl font-bold leading-none tracking-[-0.05em] text-primary">{dateDay}</span>
        <span className="mt-5 h-px w-6 bg-surface-highlight" />
        <CalendarDays className="mt-4 h-4 w-4 text-accent-blue" aria-hidden="true" />
      </div>

      <div className="flex min-w-0 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-secondary">{displayType(event.type)}</p>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-tertiary transition-colors group-hover:text-accent-blue" aria-hidden="true" />
        </div>

        <h3 className="mt-3 text-xl font-bold leading-snug tracking-[-0.025em] text-primary transition-colors group-hover:text-accent-blue">{event.name}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-secondary">{event.description}</p>

        <div className="mt-auto border-t border-surface-highlight/75 pt-4">
          <div className="flex items-center gap-2 text-sm text-secondary">
            {isVirtualOnly ? <Globe2 className="h-4 w-4 shrink-0 text-accent-green" aria-hidden="true" /> : <MapPin className="h-4 w-4 shrink-0 text-accent-green" aria-hidden="true" />}
            <span className="truncate">{location}</span>
          </div>
          <p className="mt-2 truncate font-mono text-[0.64rem] font-semibold text-tertiary">{formatEventDate(event.startDate, event.endDate)}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-[0.61rem] font-semibold uppercase tracking-[0.08em] text-tertiary">{attendance}</span>
            {event.cfp.status === "open" && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.61rem] font-bold uppercase tracking-[0.08em] text-accent-green">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />CFP open
              </span>
            )}
            {event.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="font-mono text-[0.61rem] font-semibold text-tertiary">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
