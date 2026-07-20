"use client";

import { useTheme, type ThemeMode } from "@/hooks/useTheme";

const icons: Record<ThemeMode, string> = {
  auto: "◑",
  day: "☀",
  night: "☾",
};

const labels: Record<ThemeMode, string> = {
  auto: "Theme: auto (follows time of day)",
  day: "Theme: day mode",
  night: "Theme: night mode",
};

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer p-2 rounded-full transition-colors duration-200 hover:opacity-70"
      style={{
        color: "var(--text-secondary)",
        fontSize: "1.1rem",
        background: "transparent",
        border: "none",
        lineHeight: 1,
      }}
      aria-label={labels[mode]}
      aria-pressed={mode !== "auto"}
      title={labels[mode]}
    >
      {icons[mode]}
    </button>
  );
}
