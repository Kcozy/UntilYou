"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CursorGlow() {
  const prefersReduced = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only show on desktop (no touch devices)
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isWideEnough = window.innerWidth >= 1024;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDesktop(!isTouch && isWideEnough);
  }, []);

  useEffect(() => {
    if (!isDesktop || prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop, prefersReduced]);

  if (prefersReduced || !isDesktop) return null;

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[2] -translate-x-1/2 -translate-y-1/2"
      style={{
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(196, 160, 138, 0.12) 0%, transparent 70%)",
        transition: "left 0.15s ease-out, top 0.15s ease-out",
      }}
      aria-hidden="true"
    />
  );
}
