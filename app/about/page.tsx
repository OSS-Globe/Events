import { Globe2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-12 flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-surface border border-surface-highlight flex items-center justify-center shrink-0 shadow-lg shadow-accent-green/5">
          <Globe2 className="h-8 w-8 text-accent-green" />
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold text-primary">About OSS Globe</h1>
        </div>
      </div>
      
      <div className="prose prose-invert prose-blue max-w-none text-secondary">
        <p className="text-xl leading-relaxed text-primary font-medium">
          OSS Globe is an open-source organization building tools for the open-source community.
        </p>
        
        <h2 className="text-2xl font-display font-bold text-primary mt-12 mb-4">OSS Events</h2>
        <p>
          <strong>OSS Events</strong> is our first project — a community-maintained platform for discovering open-source events around the world.
        </p>
        <p>
          We realized that while there are countless amazing open-source conferences, summits, meetups, and hackathons happening globally, finding them all in one place is difficult. Many are scattered across different foundation websites, social media, or small community pages.
        </p>
        <p>
          OSS Events solves this by acting as a living, contributor-editable atlas of the open-source event calendar. The data is entirely open-source and managed via GitHub, ensuring it remains community-driven and accessible to everyone.
        </p>
        
        <h2 className="text-2xl font-display font-bold text-primary mt-12 mb-4">The Long-Term Vision</h2>
        <p>
          OSS Events is just the beginning. Our vision for OSS Globe is to become an umbrella organization for multiple projects that help people participate in open source:
        </p>
        <ul className="space-y-2 mt-4">
          <li>🌍 <strong>OSS Events</strong>: Global open-source event directory</li>
          <li>👥 <strong>OSS Communities</strong>: Directory of active open-source groups (Planned)</li>
          <li>🚀 <strong>OSS Projects</strong>: Discover new and impactful open-source projects (Planned)</li>
          <li>🎓 <strong>OSS Opportunities</strong>: Programs, internships, and mentorships (Planned)</li>
        </ul>
        
        <div className="mt-16 p-6 rounded-2xl bg-surface border border-surface-highlight">
          <h3 className="text-xl font-bold text-primary mt-0 mb-2">Built by the community, for the community</h3>
          <p className="mb-0">
            OSS Globe is entirely open-source. We participate in programs like SSoC and GSSoC to encourage contributions from developers around the world. If you&apos;d like to get involved, check out our <a href="https://github.com/OSS-Globe/events" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">GitHub repository</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
