"use client";

import { useEffect, useState, useCallback } from "react";
import { useTimeOfDay, type TimeOfDay } from "./useTimeOfDay";

export type ThemeMode = "auto" | "day" | "night";

interface ThemeState {
  mode: ThemeMode;
  activeTheme: "day" | "night";
  timeOfDay: TimeOfDay;
  toggleTheme: () => void;
}

/**
 * Theme management hook.
 *
 * - Auto mode: theme follows time of day (sunrise/day = light, sunset/night = dark)
 * - Manual override: user can force day or night mode
 * - Persists preference in localStorage
 * - Applies data-theme attribute to <html> for CSS overrides
 */
export function useTheme(): ThemeState {
  const timeOfDay = useTimeOfDay();

  const [mode, setMode] = useState<ThemeMode>("auto");

  // Determine if auto resolves to 'day' or 'night'
  const autoTheme =
    timeOfDay === "night" || timeOfDay === "sunset" ? "night" : "day";
  const activeTheme = mode === "auto" ? autoTheme : mode;

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("until-you-theme") as ThemeMode | null;
    if (saved && ["auto", "day", "night"].includes(saved)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode(saved);
    }
  }, []);

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", activeTheme);
  }, [activeTheme]);

  // Cycle: auto → day → night → auto
  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      let next: ThemeMode;
      if (prev === "auto") next = "day";
      else if (prev === "day") next = "night";
      else next = "auto";

      localStorage.setItem("until-you-theme", next);
      return next;
    });
  }, []);

  return { mode, activeTheme, timeOfDay, toggleTheme };
}
