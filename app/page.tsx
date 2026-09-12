import Link from "next/link";
import { ArrowRight, MapPin, CalendarDays, Users } from "lucide-react";
import EventsGlobe from "@/components/Globe";
import { getAllEvents, getUpcomingEvents, getAllCountries } from "@/lib/events";

export default function Home() {
  const allEvents = getAllEvents();
  const upcomingEvents = getUpcomingEvents();
  const countries = getAllCountries();
  
  const upcomingThisMonth = upcomingEvents.filter(e => {
    const eventDate = new Date(e.startDate!);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return eventDate <= thirtyDaysFromNow;
  });

  return (
    <div className="flex flex-col w-full max-w-[1400px] mx-auto">
      {/* Hero Section */}
      <section className="relative px-4 pt-12 pb-24 md:pt-20 md:pb-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-primary max-w-4xl mb-6">
          Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-green">open-source</span> world.
        </h1>
        <p className="text-lg md:text-xl text-secondary max-w-2xl mb-10">
          A community-maintained atlas of open-source conferences, meetups, hackathons, and summits happening around the globe.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link 
            href="/events" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-base font-medium transition-transform hover:scale-105"
          >
            Browse All Events
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link 
            href="/contribute" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-surface border border-surface-highlight text-primary font-medium transition-colors hover:bg-surface-highlight"
          >
            Add an Event
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-surface border border-surface-highlight">
            <CalendarDays className="h-6 w-6 text-accent-blue mb-2" />
            <span className="text-3xl font-display font-bold text-primary">{allEvents.length}</span>
            <span className="text-sm font-medium text-secondary">Total Events</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-surface border border-surface-highlight">
            <MapPin className="h-6 w-6 text-accent-green mb-2" />
            <span className="text-3xl font-display font-bold text-primary">{countries.length}</span>
            <span className="text-sm font-medium text-secondary">Countries</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-surface border border-surface-highlight relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-green/10" />
            <div className="relative z-10 flex flex-col items-center">
              <Users className="h-6 w-6 text-accent-blue mb-2" />
              <span className="text-3xl font-display font-bold text-primary">{upcomingThisMonth.length}</span>
              <span className="text-sm font-medium text-secondary">Soon (30 days)</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-surface border border-surface-highlight">
            <span className="text-3xl font-display font-bold text-primary">{upcomingEvents.length}</span>
            <span className="text-sm font-medium text-secondary">Upcoming</span>
          </div>
        </div>
      </section>

      {/* Globe Section */}
      <section className="px-4 pb-24 w-full">
        <div className="w-full mx-auto shadow-2xl shadow-accent-blue/5 rounded-xl">
          <EventsGlobe events={allEvents} />
        </div>
      </section>
    </div>
  );
}
