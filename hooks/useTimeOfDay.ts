"use client";

import { useEffect, useState } from "react";

export type TimeOfDay = "sunrise" | "day" | "sunset" | "night";

/**
 * Returns the current time-of-day phase based on the visitor's local time.
 *
 * Phases:
 *   5am – 8am  → sunrise (warm peach gradient)
 *   8am – 5pm  → day     (soft cream)
 *   5pm – 8pm  → sunset  (cream → dusty rose)
 *   8pm – 5am  → night   (deep warm charcoal)
 *
 * Updates every minute.
 */
export function useTimeOfDay(): TimeOfDay {
  const getPhase = (): TimeOfDay => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) return "sunrise";
    if (hour >= 8 && hour < 17) return "day";
    if (hour >= 17 && hour < 20) return "sunset";
    return "night";
  };

  const [phase, setPhase] = useState<TimeOfDay>(getPhase);

  useEffect(() => {
    // Update immediately
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase(getPhase());

    // Check every minute for phase changes
    const interval = setInterval(() => {
      setPhase(getPhase());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  return phase;
}
