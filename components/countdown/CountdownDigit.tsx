"use client";

import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountdownDigitProps {
  value: string;
  label: string;
}

export function CountdownDigit({ value, label }: CountdownDigitProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <div
        className="relative overflow-hidden"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 500,
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
          minWidth: "clamp(4rem, 10vw, 9rem)",
          textAlign: "center" as const,
        }}
        aria-hidden="true"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={
              prefersReduced
                ? false
                : { y: 20, opacity: 0, filter: "blur(2px)" }
            }
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={
              prefersReduced
                ? undefined
                : { y: -20, opacity: 0, filter: "blur(2px)" }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="block"
            suppressHydrationWarning
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className="uppercase tracking-[0.2em]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "clamp(0.6rem, 1.2vw, 0.8rem)",
          fontWeight: 400,
          color: "var(--text-secondary)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
