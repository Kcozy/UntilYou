"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/hooks/useTheme";

export function BackgroundGlow() {
  const prefersReduced = useReducedMotion();
  const { activeTheme, timeOfDay } = useTheme();

  if (prefersReduced) return null;

  // Determine gradient colors based on time of day
  const gradients: Record<string, string> = {
    sunrise:
      "radial-gradient(ellipse at 50% 50%, rgba(255, 232, 214, 0.4) 0%, transparent 70%)",
    day: "radial-gradient(ellipse at 50% 50%, rgba(232, 196, 184, 0.15) 0%, transparent 70%)",
    sunset:
      "radial-gradient(ellipse at 50% 50%, rgba(212, 160, 144, 0.3) 0%, transparent 70%)",
    night:
      "radial-gradient(ellipse at 50% 50%, rgba(196, 160, 138, 0.08) 0%, transparent 70%)",
  };

  const gradient =
    activeTheme === "night"
      ? gradients.night
      : gradients[timeOfDay] || gradients.day;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: gradient,
        animation: "breathe 8s ease-in-out infinite",
      }}
      aria-hidden="true"
    />
  );
}
