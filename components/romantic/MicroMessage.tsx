"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { romanticMessages } from "@/lib/messages";

export function MicroMessage() {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % romanticMessages.length);
    }, 45_000);

    return () => clearInterval(interval);
  }, []);

  const message = romanticMessages[index];

  return (
    <div
      className="h-8 flex items-center justify-center"
      style={{ minHeight: "2rem" }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center italic"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(0.95rem, 2vw, 1.25rem)",
            color: "var(--text-secondary)",
            fontStyle: "italic",
          }}
        >
          &ldquo;{message}&rdquo;
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
