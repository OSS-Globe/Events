import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Building2, CalendarDays, ExternalLink, Globe2, MapPin, Pencil, Tag, Ticket } from "lucide-react";
import { formatEventDate, getAllEvents, getEventById } from "@/lib/events";

export function generateStaticParams() {
  return getAllEvents().map((event) => ({ slug: event.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const event = getEventById(params.slug);
  if (!event) return { title: "Event Not Found" };

  return {
    title: `${event.name} | OSS Events`,
    description: event.description,
  };
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = getEventById(params.slug);

  if (!event) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate || undefined,
    endDate: event.endDate || event.startDate || undefined,
    eventAttendanceMode: event.online ? (event.hybrid ? "https://schema.org/MixedEventAttendanceMode" : "https://schema.org/OnlineEventAttendanceMode") : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: event.online && !event.hybrid ? {
      "@type": "VirtualLocation",
      url: event.officialWebsite || "https://ossevents.dev",
    } : {
      "@type": "Place",
      name: event.location.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location.city,
        addressCountry: event.location.country,
      },
    },
    organizer: { "@type": "Organization", name: event.organizer },
  };

  const isVirtualOnly = event.online && !event.hybrid;
  const location = isVirtualOnly
    ? "Virtual event"
    : event.location.city
      ? `${event.location.city}${event.location.country ? `, ${event.location.country}` : ""}`
      : "Location TBA";
  const attendance = isVirtualOnly ? "Online" : event.hybrid ? "Hybrid" : "In person";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="site-container py-8 sm:py-10 lg:py-12">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to all events
        </Link>

        <article className="mt-8 border-t-2 border-accent-blue">
          <header className="border-b border-surface-highlight py-8 sm:py-10 lg:py-12">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="atlas-kicker">{event.type.replace(/-/g, " ")}</p>
              <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] text-tertiary">{attendance}</span>
              {event.cfp.status === "open" && (
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.09em] text-accent-green">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
                  CFP open{event.cfp.closesOn ? ` (closes ${event.cfp.closesOn})` : ""}
                </span>
              )}
            </div>

            <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-[1.02] tracking-[-0.05em] text-primary sm:text-5xl lg:text-6xl">{event.name}</h1>

            <dl className="mt-8 grid divide-y divide-surface-highlight border-y border-surface-highlight sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="py-4 sm:pr-5">
                <dt className="flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-tertiary"><CalendarDays className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" />When</dt>
                <dd className="mt-2 text-sm font-semibold leading-6 text-primary">{formatEventDate(event.startDate, event.endDate)}</dd>
              </div>
              <div className="py-4 sm:px-5">
                <dt className="flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-tertiary">{isVirtualOnly ? <Globe2 className="h-3.5 w-3.5 text-accent-green" aria-hidden="true" /> : <MapPin className="h-3.5 w-3.5 text-accent-green" aria-hidden="true" />}Where</dt>
                <dd className="mt-2 text-sm font-semibold leading-6 text-primary">{location}{event.hybrid ? <span className="block text-xs font-medium text-accent-green">Also available online</span> : null}</dd>
              </div>
              <div className="py-4 sm:pl-5">
                <dt className="flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-tertiary"><Building2 className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" />Organized by</dt>
                <dd className="mt-2 text-sm font-semibold leading-6 text-primary">{event.organizer}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              {event.registrationLink && (
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="button-primary">
                  <Ticket className="h-4 w-4" aria-hidden="true" />
                  Register now <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
              {event.officialWebsite && (
                <a href={event.officialWebsite} target="_blank" rel="noopener noreferrer" className="button-secondary">
                  <ExternalLink className="h-4 w-4 text-accent-blue" aria-hidden="true" />
                  Official website
                </a>
              )}
              <a href="https://github.com/OSS-Globe/events/edit/main/data/events.json" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-secondary transition-colors hover:text-primary">
                <Pencil className="h-4 w-4" aria-hidden="true" />
                Edit on GitHub
              </a>
            </div>
          </header>

          <div className="grid gap-10 py-9 sm:py-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
            <section>
              <p className="atlas-kicker">Event brief</p>
              <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-primary">About this event</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-secondary sm:text-lg">{event.description}</p>
              {event.placeholderDescription && (
                <p className="mt-5 border-l-2 border-accent-green pl-4 text-sm leading-6 text-secondary">
                  This is a placeholder description. Know more about this event? Contribute a better description on GitHub.
                </p>
              )}
            </section>

            <aside className="border-l border-surface-highlight pl-5 sm:pl-6">
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] text-tertiary">Topics</p>
              <div className="mt-4 flex flex-col items-start gap-2">
                {event.tags.map((tag) => (
                  <Link key={tag} href={`/categories/${tag}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-accent-blue">
                    <Tag className="h-3.5 w-3.5 text-accent-green" aria-hidden="true" />
                    {tag}
                  </Link>
                ))}
              </div>
              <p className="mt-8 border-t border-surface-highlight pt-4 font-mono text-[0.61rem] font-semibold uppercase tracking-[0.08em] text-tertiary">Last updated {event.lastUpdated}</p>
            </aside>
          </div>
        </article>
      </div>
    </>
  );
}
