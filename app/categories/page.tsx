import { getAllTags, getEventsByTag } from "@/lib/events";
import Link from "next/link";
import { Tag } from "lucide-react";

export default function CategoriesPage() {
  const tags = getAllTags();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold text-primary mb-4">Browse by Category</h1>
        <p className="text-secondary text-lg">Find events by topic, technology, or ecosystem.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tags.map(tag => {
          const count = getEventsByTag(tag).length;
          return (
            <Link 
              key={tag}
              href={`/categories/${encodeURIComponent(tag)}`}
              className="flex items-center justify-between p-4 rounded-xl bg-surface border border-surface-highlight hover:border-accent-blue transition-all group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <Tag className="h-4 w-4 text-accent-blue shrink-0" />
                <span className="font-medium text-primary group-hover:text-accent-blue transition-colors truncate">{tag}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-medium text-secondary bg-surface-highlight px-2 py-0.5 rounded-md">{count}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
