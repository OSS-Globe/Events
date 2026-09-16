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
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: Math.min(window.innerHeight * 0.7, 800)
      });
      
      // Update zoom controls dynamically if the user resizes the window
      if (globeRef.current && globeRef.current.controls) {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.enableZoom = window.innerWidth < 768;
        }
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (globeRef.current && globeRef.current.controls) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = !reduceMotion;
      }
    }
  }, [reduceMotion]);

  if (!mounted) {
    return <div className="atlas-grid flex h-[430px] w-full items-center justify-center border border-surface-highlight bg-surface/40 sm:h-[560px] lg:h-[640px]"><div className="h-10 w-10 rounded-full border-2 border-accent-blue/25 border-t-accent-blue animate-spin" aria-label="Loading event globe" /></div>;
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

  const globeSize = Math.min(windowDimensions.width < 640 ? windowDimensions.width - 40 : windowDimensions.width - 96, Math.min(windowDimensions.height, 660));

  return (
    <div className="atlas-grid relative flex h-[430px] w-full items-center justify-center overflow-hidden border border-surface-highlight bg-surface/35 sm:h-[560px] lg:h-[640px]" aria-label="Interactive globe showing open-source events worldwide">
      <div className="pointer-events-none absolute left-4 top-4 z-10 font-mono text-[0.62rem] font-bold uppercase tracking-[0.11em] text-tertiary">
        Event signals / global coordinates
      </div>
      <div
        className="relative shrink-0 overflow-hidden rounded-full cursor-grab [filter:drop-shadow(0_24px_35px_rgba(0,0,0,0.52))] active:cursor-grabbing touch-none"
        style={{ width: globeSize, height: globeSize }}
        onMouseEnter={() => {
          if (globeRef.current && globeRef.current.controls) {
            const controls = globeRef.current.controls();
            if (controls) controls.autoRotate = false;
          }
        }}
        onMouseLeave={() => {
          if (globeRef.current && globeRef.current.controls) {
            const controls = globeRef.current.controls();
            if (controls) controls.autoRotate = true;
          }
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
            const initGlobe = (retries = 0) => {
              if (!globeRef.current || !globeRef.current.controls) {
                // Retry up to 20 times (2 seconds)
                if (retries < 20) {
                  setTimeout(() => initGlobe(retries + 1), 100);
                }
                return;
              }
              const controls = globeRef.current.controls();
              if (controls) {
                controls.autoRotate = !reduceMotion;
                controls.autoRotateSpeed = 0.5;
                // Enable zoom only for mobile viewport widths (under 768px)
                const isMobileViewport = window.innerWidth < 768;
                controls.enableZoom = isMobileViewport;
              }
              globeRef.current.pointOfView({ lat: 40, lng: 10, altitude: 2 });
            };
            
            initGlobe();
          }}
          onGlobeClick={({ lat, lng }: { lat: number; lng: number }) => {
            const altitude = isZoomed ? 2 : 1.25;
            if (globeRef.current) {
              globeRef.current.pointOfView({ lat, lng, altitude }, 700);
            }
            setIsZoomed(!isZoomed);
          }}
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          onPointClick={(point: any) => {
            router.push(`/events/${point.id}`);
          }}
          pointColor={(d: any) => d.isSoon ? "#9BCB5A" : "#63D8F5"} // Green if soon, else blue
          pointAltitude={0.05}
          pointRadius="size"
          pointsMerge={false}
          pointResolution={32}
          ringsData={points.filter((d: any) => d.isSoon)}
          ringColor={() => "#9BCB5A"}
          ringMaxRadius={2}
          ringPropagationSpeed={1}
          ringRepeatPeriod={1000}
          htmlElementsData={points}
          htmlElement={(d: any) => {
            const el = document.createElement('div');
            el.innerHTML = `<div class="hidden group-hover:block absolute bg-surface border border-surface-highlight text-primary p-2 text-xs whitespace-nowrap z-10 bottom-4 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity">
              <strong class="text-accent-blue">${d.name}</strong><br/>
              ${d.city}
            </div>`;
            el.className = "group relative w-3 h-3 hover:z-20 cursor-pointer";
            
            el.onclick = () => {
              // Fly to point
              if (globeRef.current) {
                globeRef.current.pointOfView({ lat: d.lat, lng: d.lng, altitude: 1 }, 1000);
              }
              
              // Navigate to event after short delay
              setTimeout(() => {
                router.push(`/events/${d.id}`);
              }, 1000);
            };
            
            return el;
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-surface-highlight/70 pt-3 sm:bottom-4 sm:left-4 sm:right-auto sm:border-0 sm:pt-0">
        <div className="flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-secondary">
          <div className="h-2 w-2 rounded-full bg-accent-green animate-pulse"></div>
          <span>Happening soon (30 days)</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-secondary">
          <div className="h-2 w-2 rounded-full bg-accent-blue"></div>
          <span>Upcoming event</span>
        </div>
      </div>
    </div>
  );
}
