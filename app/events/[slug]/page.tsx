import { getEventById, getAllEvents, formatEventDate } from "@/lib/events";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Globe, ArrowLeft, Tag, ExternalLink, Ticket } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export function generateStaticParams() {
  return getAllEvents().map((event) => ({
    slug: event.id,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const event = getEventById(params.slug);
  if (!event) return { title: 'Event Not Found' };
  
  return {
    title: `${event.name} | OSS Events`,
    description: event.description,
  };
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = getEventById(params.slug);
  
  if (!event) {
    notFound();
  }

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate || undefined,
    "endDate": event.endDate || event.startDate || undefined,
    "eventAttendanceMode": event.online ? (event.hybrid ? "https://schema.org/MixedEventAttendanceMode" : "https://schema.org/OnlineEventAttendanceMode") : "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": event.online && !event.hybrid ? {
      "@type": "VirtualLocation",
      "url": event.officialWebsite || "https://ossevents.dev"
    } : {
      "@type": "Place",
      "name": event.location.city,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": event.location.city,
        "addressCountry": event.location.country
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": event.organizer
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to all events
        </Link>
        
        <div className="bg-surface border border-surface-highlight rounded-2xl overflow-hidden shadow-xl">
          <div className="h-32 bg-gradient-to-r from-accent-blue/20 to-accent-green/20 relative">
            <div className="absolute inset-0 bg-base/50 backdrop-blur-[2px]"></div>
          </div>
          
          <div className="px-6 md:px-10 pb-10 -mt-16 relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex rounded-full bg-surface-highlight px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider shadow-sm border border-surface-highlight">
                {event.type.replace('-', ' ')}
              </span>
              {event.cfp.status === "open" && (
                <span className="inline-flex rounded-full bg-accent-green/10 px-3 py-1 text-xs font-semibold text-accent-green uppercase tracking-wider border border-accent-green/20 shadow-sm shadow-accent-green/5">
                  CFP Open {event.cfp.closesOn ? `(Closes ${event.cfp.closesOn})` : ''}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">{event.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-secondary">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 shrink-0 text-accent-blue mt-0.5" />
                <div>
                  <p className="font-medium text-primary">{formatEventDate(event.startDate, event.endDate)}</p>
                  <p className="text-sm">Added to OSS Events</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                {event.online && !event.hybrid ? (
                  <Globe className="h-5 w-5 shrink-0 text-accent-green mt-0.5" />
                ) : (
                  <MapPin className="h-5 w-5 shrink-0 text-accent-green mt-0.5" />
                )}
                <div>
                  <p className="font-medium text-primary">
                    {event.online && !event.hybrid ? "Virtual Event" : (
                      event.location.city ? `${event.location.city}${event.location.country ? `, ${event.location.country}` : ''}` : 'Location TBA'
                    )}
                  </p>
                  {event.hybrid && <p className="text-sm text-accent-green font-medium mt-1">Also available online</p>}
                </div>
              </div>
            </div>
            
            <div className="prose prose-invert prose-blue max-w-none mb-10">
              <h3 className="text-xl font-bold text-primary mb-4 border-b border-surface-highlight pb-2">About this event</h3>
              <p className="text-lg leading-relaxed text-secondary/90">
                {event.description}
                {event.placeholderDescription && (
                  <span className="block mt-4 text-sm italic text-secondary/60">
                    This is a placeholder description. Know more about this event? Contribute a better description on GitHub!
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-10">
              {event.tags.map(tag => (
                <Link 
                  key={tag} 
                  href={`/categories/${tag}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface-highlight/50 px-3 py-1 text-sm text-secondary hover:bg-surface-highlight hover:text-primary transition-colors border border-surface-highlight"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Link>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 pt-6 border-t border-surface-highlight">
              {event.officialWebsite ? (
                <a 
                  href={event.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-surface-highlight px-5 py-2.5 text-sm font-medium text-primary hover:bg-surface-highlight/80 transition-colors border border-surface-highlight"
                >
                  <ExternalLink className="h-4 w-4" />
                  Official Website
                </a>
              ) : null}
              
              {event.registrationLink ? (
                <a 
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-blue/90 transition-colors shadow-lg shadow-accent-blue/20"
                >
                  <Ticket className="h-4 w-4" />
                  Register Now
                </a>
              ) : null}
              
              <a 
                href={`https://github.com/OSS-Globe/events/edit/main/data/events.json`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-transparent px-5 py-2.5 text-sm font-medium text-secondary hover:text-primary transition-colors ml-auto"
              >
                Edit on GitHub
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
