"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AmbientSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  // Scope it thoughtfully: fit marketing pages, drop on dense pages.
  const isDensePage = pathname?.startsWith('/events') || pathname?.startsWith('/categories') || pathname?.startsWith('/countries');

  useEffect(() => {
    if (isDensePage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Switch to brighter theme tokens
    // --color-accent-blue: #63d8f5 (using as base so they pop on dark background)
    // --color-primary: #eaf1ec (using for intense cursor highlight)
    const colorBase = { r: 99, g: 216, b: 245 }; 
    const colorActive = { r: 234, g: 241, b: 236 }; 

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseOpacity: number;
    }

    const nodes: Node[] = [];
    const numNodes = 45; // Restored sparse field density

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      nodes.length = 0;
      for (let i = 0; i < numNodes; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2, // Slightly faster drift
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 1.5 + 1.2, // Slightly larger
          baseOpacity: Math.random() * 0.4 + 0.2, // 20% to 60% opacity baseline
        });
      }
    };

    init();
    window.addEventListener("resize", init);

    let mouseX = -1000;
    let mouseY = -1000;
    let isMouseIn = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseIn = true;
    };
    
    const onMouseLeave = () => {
      isMouseIn = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;
    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", onMotionChange);

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const maxDistance = 300; // Increased cursor interaction radius

      // Draw all baseline connections between nodes (Constellation)
      if (!prefersReducedMotion) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const nodeA = nodes[i];
            const nodeB = nodes[j];
            
            const dx = nodeA.x - nodeB.x;
            const dy = nodeA.y - nodeB.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 120) { // Nodes close to each other connect
              const nodeDistanceInfluence = 1 - (dist / 120);
              // Base line opacity independent of cursor
              let lineOpacity = nodeDistanceInfluence * 0.15;
              let lineColor = colorBase;

              // If near cursor, boost the connection line opacity and shift color
              if (isMouseIn) {
                const dxCursor = mouseX - ((nodeA.x + nodeB.x) / 2);
                const dyCursor = mouseY - ((nodeA.y + nodeB.y) / 2);
                const distCursor = Math.sqrt(dxCursor * dxCursor + dyCursor * dyCursor);
                
                if (distCursor < maxDistance) {
                  const cursorInfluence = 1 - (distCursor / maxDistance);
                  lineOpacity = Math.max(lineOpacity, cursorInfluence * nodeDistanceInfluence * 0.6); // Up to 60% opacity near cursor
                  
                  lineColor = {
                    r: colorBase.r + (colorActive.r - colorBase.r) * cursorInfluence,
                    g: colorBase.g + (colorActive.g - colorBase.g) * cursorInfluence,
                    b: colorBase.b + (colorActive.b - colorBase.b) * cursorInfluence,
                  };
                }
              }

              if (lineOpacity > 0.01) {
                ctx.beginPath();
                ctx.moveTo(nodeA.x, nodeA.y);
                ctx.lineTo(nodeB.x, nodeB.y);
                ctx.strokeStyle = `rgba(${lineColor.r}, ${lineColor.g}, ${lineColor.b}, ${lineOpacity})`;
                ctx.lineWidth = 1.0; // Thicker lines
                ctx.stroke();
              }
            }
          }
        }
      }

      nodes.forEach((node) => {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0) node.x = width;
          if (node.x > width) node.x = 0;
          if (node.y < 0) node.y = height;
          if (node.y > height) node.y = 0;
        }

        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let opacity = node.baseOpacity;
        let color = colorBase;

        if (isMouseIn && distance < maxDistance && !prefersReducedMotion) {
          const influence = 1 - Math.pow(distance / maxDistance, 1.5); 
          
          opacity = Math.min(1, node.baseOpacity + influence * 0.6); // Very bright highlight
          
          color = {
            r: colorBase.r + (colorActive.r - colorBase.r) * influence,
            g: colorBase.g + (colorActive.g - colorBase.g) * influence,
            b: colorBase.b + (colorActive.b - colorBase.b) * influence,
          };

          // Draw strong connection to cursor
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(${colorActive.r}, ${colorActive.g}, ${colorActive.b}, ${influence * 0.4})`; // 40% cursor line
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Node drifts towards cursor
          node.x += dx * 0.003 * influence;
          node.y += dy * 0.003 * influence;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      mediaQuery.removeEventListener("change", onMotionChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDensePage]);

  if (isDensePage) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      aria-hidden="true"
    />
  );
}
