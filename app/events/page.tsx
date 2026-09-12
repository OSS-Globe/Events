"use client";

import { useState } from "react";
import { ChevronDown, Filter, Search, SlidersHorizontal } from "lucide-react";
import EventCard from "@/components/EventCard";
import { getAllEvents } from "@/lib/events";

export default function EventsPage() {
  const allEvents = getAllEvents();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [showPast, setShowPast] = useState(false);

  const filteredEvents = allEvents.filter((event) => {
    if (search && !event.name.toLowerCase().includes(search.toLowerCase()) && !event.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterType !== "all" && event.type !== filterType) return false;
    if (!showPast && event.startDate && new Date(event.startDate) < new Date()) return false;
    return true;
  }).sort((a, b) => {
    if (!a.startDate) return 1;
    if (!b.startDate) return -1;
    return a.startDate > b.startDate ? 1 : -1;
  });

  return (
    <div className="site-container py-12 sm:py-16 lg:py-20">
      <section className="max-w-3xl">
        <p className="atlas-kicker">Open-source event index</p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.045em] text-primary sm:text-5xl">Find the room you&apos;re looking for.</h1>
        <p className="mt-4 text-base leading-7 text-secondary sm:text-lg">Search the global directory, then narrow it to the kinds of gatherings that matter to you.</p>
      </section>

      <section className="mt-10 border-y border-surface-highlight/80 py-4 sm:mt-12 sm:py-5">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_210px_auto] lg:items-center">
          <div className="group flex min-w-0 items-center gap-3 border border-surface-highlight bg-surface/35 px-3 transition-colors focus-within:border-accent-blue">
            <Search className="h-4 w-4 shrink-0 text-tertiary group-focus-within:text-accent-blue" aria-hidden="true" />
            <label className="sr-only" htmlFor="event-search">Search events</label>
            <input
              id="event-search"
              type="search"
              placeholder="Search name or description"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full min-w-0 bg-transparent py-3 text-sm text-primary outline-none placeholder:text-tertiary"
            />
          </div>

          <div className="relative">
            <label className="sr-only" htmlFor="event-type">Filter by event type</label>
            <select
              id="event-type"
              value={filterType}
              onChange={(event) => setFilterType(event.target.value)}
              className="w-full appearance-none border border-surface-highlight bg-surface/35 px-3 py-3 pr-9 text-sm font-semibold text-primary outline-none transition-colors hover:border-secondary focus:border-accent-blue"
            >
              <option value="all">All event types</option>
              <option value="conference">Conference</option>
              <option value="summit">Summit</option>
              <option value="forum">Forum</option>
              <option value="community-day">Community Day</option>
              <option value="member-meeting">Member Meeting</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tertiary" aria-hidden="true" />
          </div>

          <label className="flex min-h-11 cursor-pointer items-center gap-2 border border-transparent px-2 text-sm font-semibold text-secondary transition-colors hover:text-primary">
            <input
              type="checkbox"
              checked={showPast}
              onChange={(event) => setShowPast(event.target.checked)}
              className="h-4 w-4 border-surface-highlight bg-surface text-accent-blue accent-accent-blue"
            />
            Include past events
          </label>
        </div>
      </section>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-tertiary">{showPast ? "Complete archive" : "Upcoming calendar"}</p>
        <p className="inline-flex items-center gap-2 text-sm text-secondary" aria-live="polite"><SlidersHorizontal className="h-4 w-4 text-accent-green" aria-hidden="true" /><span className="font-semibold text-primary">{filteredEvents.length}</span> {filteredEvents.length === 1 ? "event" : "events"}</p>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      ) : (
        <div className="mt-6 border border-dashed border-surface-highlight px-6 py-20 text-center">
          <Filter className="mx-auto h-7 w-7 text-tertiary" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold text-primary">No events match this view.</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-secondary">Try a different phrase or broaden the event type and date filters.</p>
          <button onClick={() => { setSearch(""); setFilterType("all"); setShowPast(true); }} className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent-blue transition-colors hover:text-primary">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
