"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { OSSEvent } from "@/lib/events";
import { useRouter } from "next/navigation";

// Dynamically import react-globe.gl with SSR disabled since it requires the window object
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function EventsGlobe({ events }: { events: OSSEvent[] }) {
  const router = useRouter();
  const globeRef = useRef<any>(null);
  const [windowDimensions, setWindowDimensions] = useState({ width: 800, height: 600 });
  const [mounted, setMounted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: Math.min(window.innerHeight * 0.7, 800)
      });
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) {
    return <div className="h-[600px] w-full flex items-center justify-center bg-base"><div className="w-16 h-16 border-4 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin"></div></div>;
  }

  // Pre-process points
  const points = events
    .filter((e) => e.location.lat !== null && e.location.lng !== null)
    .map((e) => {
      const isSoon = e.startDate && new Date(e.startDate).getTime() < new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      
      return {
        id: e.id,
        lat: e.location.lat!,
        lng: e.location.lng!,
        name: e.name,
        date: e.startDate,
        city: e.location.city,
        isSoon,
        // Calculate size based on if multiple events share a location (simplified here, in reality we'd group them)
        size: 0.1
      };
    });

  const globeSize = Math.min(windowDimensions.width - 32, 700);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-surface-highlight bg-base/50 flex items-center justify-center h-[600px] sm:h-[700px]">
      <div
        className="relative shrink-0 overflow-hidden rounded-full cursor-grab active:cursor-grabbing"
        style={{ width: globeSize, height: globeSize }}
        onMouseEnter={() => {
          if (globeRef.current) globeRef.current.controls().autoRotate = false;
        }}
        onMouseLeave={() => {
          if (globeRef.current) globeRef.current.controls().autoRotate = true;
        }}
      >
        <Globe
          ref={globeRef}
          width={globeSize}
          height={globeSize}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)" // Transparent background
        onGlobeReady={() => {
          const controls = globeRef.current.controls();
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.5;
          controls.enableZoom = false;
          globeRef.current.pointOfView({ lat: 40, lng: 10, altitude: 2 });
        }}
        onGlobeClick={({ lat, lng }: { lat: number; lng: number }) => {
          const altitude = isZoomed ? 2 : 1.25;
          globeRef.current?.pointOfView({ lat, lng, altitude }, 700);
          setIsZoomed(!isZoomed);
        }}
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        onPointClick={(point: any) => {
          router.push(`/events/${point.id}`);
        }}
        pointColor={(d: any) => d.isSoon ? "#34D399" : "#38BDF8"} // Green if soon, else blue
        pointAltitude={0.05}
        pointRadius="size"
        pointsMerge={false}
        pointResolution={32}
        ringsData={points.filter((d: any) => d.isSoon)}
        ringColor={() => "#34D399"}
        ringMaxRadius={2}
        ringPropagationSpeed={1}
        ringRepeatPeriod={1000}
        htmlElementsData={points}
        htmlElement={(d: any) => {
          const el = document.createElement('div');
          el.innerHTML = `<div class="hidden group-hover:block absolute bg-surface border border-surface-highlight text-primary p-2 rounded shadow-lg text-xs whitespace-nowrap z-10 bottom-4 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity">
            <strong class="text-accent-blue">${d.name}</strong><br/>
            ${d.city}
          </div>`;
          el.className = "group relative w-3 h-3 hover:z-20 cursor-pointer";
          
          el.onclick = () => {
            // Fly to point
            globeRef.current.pointOfView({ lat: d.lat, lng: d.lng, altitude: 1 }, 1000);
            
            // Navigate to event after short delay
            setTimeout(() => {
              router.push(`/events/${d.id}`);
            }, 1000);
          };
          
          return el;
        }}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-white/10" />
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2 text-xs text-secondary bg-surface/80 p-2 rounded backdrop-blur-sm border border-surface-highlight">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></div>
          <span>Happening soon (30 days)</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-secondary bg-surface/80 p-2 rounded backdrop-blur-sm border border-surface-highlight">
          <div className="w-2 h-2 rounded-full bg-accent-blue"></div>
          <span>Upcoming event</span>
        </div>
      </div>
    </div>
  );
}
