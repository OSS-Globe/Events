import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Search, Users } from "lucide-react";
import EventsGlobe from "@/components/Globe";
import { getAllCountries, getAllEvents, getUpcomingEvents } from "@/lib/events";

export default function Home() {
  const allEvents = getAllEvents();
  const upcomingEvents = getUpcomingEvents();
  const countries = getAllCountries();

  const upcomingThisMonth = upcomingEvents.filter((event) => {
    const eventDate = new Date(event.startDate!);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return eventDate <= thirtyDaysFromNow;
  });

  return (
    <div className="w-full">
      <section className="site-container grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-24">
        <div>
          <p className="atlas-kicker">Community-run event atlas</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-primary sm:text-6xl lg:text-7xl">
            Discover open-source events worldwide.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-secondary sm:text-lg sm:leading-8">
            A practical map of the conferences, summits, meetups, and gatherings where open-source communities come together.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link href="/events" className="button-primary">
              Browse the directory <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/contribute" className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary transition-colors hover:text-accent-green">
              Add an event <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="border-l border-surface-highlight pl-5 sm:pl-7 lg:pb-2">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-tertiary">Atlas index</p>
          <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-6 sm:gap-x-8">
            <div>
              <dt className="flex items-center gap-2 text-xs font-semibold text-secondary"><CalendarDays className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" />Events listed</dt>
              <dd className="mt-1 font-display text-3xl font-bold tracking-[-0.04em] text-primary">{allEvents.length}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-xs font-semibold text-secondary"><MapPin className="h-3.5 w-3.5 text-accent-green" aria-hidden="true" />Countries</dt>
              <dd className="mt-1 font-display text-3xl font-bold tracking-[-0.04em] text-primary">{countries.length}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-xs font-semibold text-secondary"><Users className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" />Upcoming</dt>
              <dd className="mt-1 font-display text-3xl font-bold tracking-[-0.04em] text-primary">{upcomingEvents.length}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-xs font-semibold text-secondary"><span className="h-2 w-2 rounded-full bg-accent-green" aria-hidden="true" />Next 30 days</dt>
              <dd className="mt-1 font-display text-3xl font-bold tracking-[-0.04em] text-primary">{upcomingThisMonth.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="border-y border-surface-highlight/75">
        <div className="site-container py-5 sm:py-6">
          <Link href="/events" className="group flex items-center gap-3 text-left text-sm text-secondary transition-colors hover:text-primary">
            <Search className="h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
            <span className="font-medium">Search events by name or description</span>
            <span className="ml-auto font-mono text-xs font-bold uppercase tracking-[0.1em] text-tertiary transition-colors group-hover:text-accent-green">Open directory</span>
          </Link>
        </div>
      </section>

      <section className="site-container py-12 sm:py-16 lg:py-20">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="atlas-kicker">Live global view</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-primary sm:text-4xl">Follow the signals.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-secondary">Choose a marker to open an event record. Green signals are happening within 30 days.</p>
        </div>

        <EventsGlobe events={allEvents} />
      </section>
    </div>
  );
}
