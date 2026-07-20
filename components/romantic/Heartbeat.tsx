"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Heartbeat() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <span
        className="inline-block select-none"
        style={{
          fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)",
          color: "var(--accent)",
          animation: prefersReduced
            ? "none"
            : "heartbeat 2s ease-in-out infinite",
          animationDelay: "1s",
        }}
      >
        &#9825;
      </span>
    </div>
  );
}
