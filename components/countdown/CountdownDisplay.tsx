"use client";

import { motion } from "motion/react";
import { useCountdown } from "@/hooks/useCountdown";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { padTwo } from "@/lib/countdown";
import { CountdownDigit } from "./CountdownDigit";

interface CountdownDisplayProps {
  targetTimestamp: number;
  createdTimestamp: number;
  onComplete?: () => void;
}

export function CountdownDisplay({
  targetTimestamp,
  createdTimestamp,
  onComplete,
}: CountdownDisplayProps) {
  const { days, hours, minutes, seconds, isComplete, percentComplete } =
    useCountdown(targetTimestamp, createdTimestamp);
  const prefersReduced = useReducedMotion();

  // Fire onComplete callback when countdown hits zero
  if (isComplete && onComplete) {
    // Use setTimeout to avoid calling during render
    setTimeout(onComplete, 0);
  }

  // Screen reader text
  const srText = isComplete
    ? "The countdown has ended!"
    : `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`;

  return (
    <motion.div
      className="flex flex-col items-center gap-6 sm:gap-8"
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
    >
      {/* Screen reader announcement */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        suppressHydrationWarning
      >
        {srText}
      </div>

      {/* Digits grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-10"
        aria-hidden="true"
      >
        <CountdownDigit value={days.toString()} label="days" />
        <CountdownDigit value={padTwo(hours)} label="hours" />
        <CountdownDigit value={padTwo(minutes)} label="minutes" />
        <CountdownDigit value={padTwo(seconds)} label="seconds" />
      </div>

    </motion.div>
  );
}
