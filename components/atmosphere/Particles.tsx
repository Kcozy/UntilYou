"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  id: number;
  x: number; // percentage from left
  size: number; // px
  duration: number; // seconds for full float
  delay: number; // seconds delay
  opacity: number;
  xOffset: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 15 + Math.random() * 25,
    delay: Math.random() * 20,
    opacity: 0.2 + Math.random() * 0.4,
    xOffset: (Math.random() - 0.5) * 60,
  }));
}

export function Particles() {
  const prefersReduced = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const mobile = window.innerWidth < 640;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(generateParticles(mobile ? 6 : 12));
  }, []);

  if (prefersReduced || particles.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            backgroundColor: "var(--accent)",
            opacity: 0,
          }}
          animate={{
            y: [0, -(window?.innerHeight || 800) - 50],
            x: [0, p.xOffset],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
