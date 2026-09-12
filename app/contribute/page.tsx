// import Link from "next/link";
import { GitPullRequest, FileJson, CheckCircle2 } from "lucide-react";

export default function ContributePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold text-primary mb-4">Contribute to OSS Events</h1>
        <p className="text-secondary text-lg">Help us build the most comprehensive directory of open-source events in the world.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="p-8 rounded-2xl bg-surface border border-surface-highlight flex flex-col h-full relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileJson className="h-32 w-32 text-accent-green" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-4 relative z-10">Add or Update Events</h2>
          <p className="text-secondary mb-8 relative z-10 flex-grow">
            Know about an open-source conference, meetup, or hackathon? The event data is stored as a simple JSON file on GitHub.
          </p>
          <a 
            href="https://github.com/OSS-Globe/events/blob/main/data/events.json"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent-green text-surface-highlight font-bold transition-transform hover:-translate-y-1 relative z-10 w-full sm:w-auto shadow-lg shadow-accent-green/20"
          >
            <GitPullRequest className="h-5 w-5" />
            Submit Event via PR
          </a>
        </div>
        
        <div className="p-8 rounded-2xl bg-surface border border-surface-highlight flex flex-col h-full relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-accent-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-4 relative z-10">Improve the Website</h2>
          <p className="text-secondary mb-8 relative z-10 flex-grow">
            Want to add a feature or fix a bug on this website? We welcome code contributions! The site is built with Next.js, Tailwind, and react-globe.gl.
          </p>
          <a 
            href="https://github.com/OSS-Globe/events/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent-blue text-white font-bold transition-transform hover:-translate-y-1 relative z-10 w-full sm:w-auto shadow-lg shadow-accent-blue/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            Find Good First Issues
          </a>
        </div>
      </div>
      
      <div className="prose prose-invert max-w-none">
        <h3 className="text-2xl font-display font-bold text-primary border-b border-surface-highlight pb-4 mb-6">How to add an event manually</h3>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="shrink-0 mt-1">
              <CheckCircle2 className="h-6 w-6 text-accent-green" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary m-0 mb-2">1. Fork the repository</h4>
              <p className="text-secondary m-0">Go to the <a href="https://github.com/OSS-Globe/events" className="text-accent-blue hover:underline">OSS-Globe/events</a> repository and click the &quot;Fork&quot; button.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="shrink-0 mt-1">
              <CheckCircle2 className="h-6 w-6 text-accent-green" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary m-0 mb-2">2. Edit the data file</h4>
              <p className="text-secondary m-0">Open <code>data/events.json</code> and add your event object to the array, following the existing schema. Make sure to get accurate latitude and longitude for the location!</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="shrink-0 mt-1">
              <CheckCircle2 className="h-6 w-6 text-accent-green" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary m-0 mb-2">3. Submit a Pull Request</h4>
              <p className="text-secondary m-0">Commit your changes and open a Pull Request against the main repository. A maintainer will review and merge it.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 p-6 rounded-xl bg-surface-highlight/30 border border-surface-highlight text-sm text-secondary">
          <p className="m-0">
            <strong>Note:</strong> We are planning to build a web-based &quot;Add Event&quot; form that will automatically create a GitHub PR for you in the future. For now, we use the standard GitHub open-source workflow!
          </p>
        </div>
      </div>
    </div>
  );
}
