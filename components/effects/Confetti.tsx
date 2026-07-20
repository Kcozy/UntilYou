"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ConfettiProps {
  fire: boolean;
}

export function Confetti({ fire }: ConfettiProps) {
  const hasFired = useRef(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (fire && !hasFired.current && !prefersReduced) {
      hasFired.current = true;

      // Warm-toned confetti — cream, rose, gold. Not rainbow.
      const colors = ["#FAF6F0", "#E8C4B8", "#D4A090", "#C4A08A", "#B8956A"];

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors,
        ticks: 200,
        gravity: 0.8,
        scalar: 1.2,
        shapes: ["circle", "square"],
        disableForReducedMotion: true,
      });

      // Second burst slightly delayed for a fuller effect
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 100,
          origin: { y: 0.5 },
          colors,
          ticks: 150,
          gravity: 1,
          scalar: 0.8,
          shapes: ["circle"],
          disableForReducedMotion: true,
        });
      }, 300);
    }
  }, [fire, prefersReduced]);

  return null;
}
