"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProgressBarProps {
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  const prefersReduced = useReducedMotion();
  const clampedPercent = Math.min(100, Math.max(0, percent));

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col items-center gap-3">
      {/* Track */}
      <div
        className="w-full h-[2px] rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--border)" }}
        role="progressbar"
        aria-valuenow={Math.round(clampedPercent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${Math.round(clampedPercent)}% of the wait completed`}
      >
        {/* Fill */}
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
          initial={
            prefersReduced ? { width: `${clampedPercent}%` } : { width: 0 }
          }
          animate={{ width: `${clampedPercent}%` }}
          transition={{ duration: prefersReduced ? 0 : 1.5, ease: "easeOut" }}
        />
      </div>
      {/* Label */}
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "clamp(0.7rem, 1.2vw, 0.8rem)",
          color: "var(--text-secondary)",
        }}
      >
        {Math.round(clampedPercent)}% of the wait done
      </span>
    </div>
  );
}
