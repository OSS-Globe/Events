"use client";

import { useState } from "react";
import { getAllEvents } from "@/lib/events";
import EventCard from "@/components/EventCard";
import { Search, Filter } from "lucide-react";

export default function EventsPage() {
  const allEvents = getAllEvents();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [showPast, setShowPast] = useState(false);

  const filteredEvents = allEvents.filter(e => {
    // Search
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.description.toLowerCase().includes(search.toLowerCase())) return false;
    
    // Type filter
    if (filterType !== "all" && e.type !== filterType) return false;
    
    // Past events filter
    if (!showPast && e.startDate && new Date(e.startDate) < new Date()) return false;
    
    return true;
  }).sort((a, b) => {
    if (!a.startDate) return 1;
    if (!b.startDate) return -1;
    return a.startDate > b.startDate ? 1 : -1;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-primary mb-2">All Events</h1>
          <p className="text-secondary">Discover {filteredEvents.length} open-source events worldwide.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-surface border border-surface-highlight rounded-lg pl-10 pr-4 py-2 text-primary focus:outline-none focus:border-accent-blue transition-colors"
            />
          </div>
          
          <select 
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="bg-surface border border-surface-highlight rounded-lg px-4 py-2 text-primary focus:outline-none focus:border-accent-blue appearance-none cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="conference">Conference</option>
            <option value="summit">Summit</option>
            <option value="forum">Forum</option>
            <option value="community-day">Community Day</option>
            <option value="member-meeting">Member Meeting</option>
          </select>
          
          <label className="flex items-center gap-2 cursor-pointer text-sm text-secondary hover:text-primary transition-colors whitespace-nowrap">
            <input 
              type="checkbox" 
              checked={showPast}
              onChange={e => setShowPast(e.target.checked)}
              className="rounded border-surface-highlight bg-surface text-accent-blue focus:ring-accent-blue"
            />
            Include Past
          </label>
        </div>
      </div>
      
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-surface rounded-xl border border-surface-highlight">
          <Filter className="h-12 w-12 text-secondary mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-primary mb-2">No events found</h3>
          <p className="text-secondary mb-6">Try adjusting your search or filters to find what you&apos;re looking for.</p>
          <button 
            onClick={() => { setSearch(""); setFilterType("all"); setShowPast(true); }}
            className="text-accent-blue hover:underline font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
