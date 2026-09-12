import { getAllCountries, getEventsByCountry } from "@/lib/events";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function CountriesPage() {
  const countries = getAllCountries();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold text-primary mb-4">Browse by Country</h1>
        <p className="text-secondary text-lg">Discover open-source events happening in {countries.length} countries around the world.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map(country => {
          const count = getEventsByCountry(country).length;
          return (
            <Link 
              key={country}
              href={`/countries/${encodeURIComponent(country)}`}
              className="flex items-center justify-between p-5 rounded-xl bg-surface border border-surface-highlight hover:border-accent-blue transition-all group"
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent-green" />
                <span className="font-medium text-primary group-hover:text-accent-blue transition-colors">{country}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-secondary bg-surface-highlight px-2 py-0.5 rounded-md">{count}</span>
                <ArrowRight className="h-4 w-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
