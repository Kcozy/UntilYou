"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

export function GrainOverlay() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  // The actual styling is in globals.css (.grain-overlay)
  // This component just manages the reduced motion check
  // The overlay is rendered in layout.tsx
  return null;
}
