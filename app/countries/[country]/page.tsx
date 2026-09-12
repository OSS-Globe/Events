import { getEventsByCountry, getAllCountries } from "@/lib/events";
import EventCard from "@/components/EventCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

export function generateStaticParams() {
  return getAllCountries().map((country) => ({
    country: encodeURIComponent(country),
  }));
}

export default function CountryEventsPage({ params }: { params: { country: string } }) {
  const decodedCountry = decodeURIComponent(params.country);
  const events = getEventsByCountry(decodedCountry);
  
  if (events.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/countries" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" />
        All Countries
      </Link>
      
      <div className="mb-12 flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-surface border border-surface-highlight flex items-center justify-center shrink-0 shadow-lg shadow-accent-green/5">
          <MapPin className="h-8 w-8 text-accent-green" />
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold text-primary mb-2">Events in {decodedCountry}</h1>
          <p className="text-secondary">{events.length} {events.length === 1 ? 'event' : 'events'} found</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
