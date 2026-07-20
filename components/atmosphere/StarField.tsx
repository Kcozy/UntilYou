"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/hooks/useTheme";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDuration: number;
  animationDelay: number;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 1.5,
    animationDuration: 3 + Math.random() * 5,
    animationDelay: Math.random() * 8,
  }));
}

export function StarField() {
  const prefersReduced = useReducedMotion();
  const { activeTheme } = useTheme();
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(generateStars(25));
  }, []);

  if (prefersReduced || activeTheme !== "night" || stars.length === 0)
    return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: "var(--night-text)",
            animation: `twinkle ${star.animationDuration}s ease-in-out ${star.animationDelay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
