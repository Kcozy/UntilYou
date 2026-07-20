"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/hooks/useTheme";

// Countdown
import { CountdownDisplay } from "@/components/countdown/CountdownDisplay";

// Atmosphere
import { BackgroundGlow } from "@/components/atmosphere/BackgroundGlow";
import { Particles } from "@/components/atmosphere/Particles";
import { StarField } from "@/components/atmosphere/StarField";
import { CursorGlow } from "@/components/atmosphere/CursorGlow";

// Romantic
import { MicroMessage } from "@/components/romantic/MicroMessage";
import { Heartbeat } from "@/components/romantic/Heartbeat";
import { LocalTime } from "@/components/romantic/LocalTime";

// Controls
import { ThemeToggle } from "@/components/controls/ThemeToggle";
import { MusicToggle } from "@/components/controls/MusicToggle";

// Effects
import { Confetti } from "@/components/effects/Confetti";

interface HomePageProps {
  targetTimestamp: number;
  createdTimestamp: number;
  title: string;
  subtitle: string;
  youtubeUrl: string;
  locationUrl?: string;
  completionMessage?: string;
}

export function HomePage({
  targetTimestamp,
  createdTimestamp,
  title,
  subtitle,
  youtubeUrl,
  locationUrl,
  completionMessage,
}: HomePageProps) {
  const prefersReduced = useReducedMotion();
  useTheme();
  const [countdownComplete, setCountdownComplete] = useState(false);

  const handleComplete = useCallback(() => {
    setCountdownComplete(true);
  }, []);

  // Stagger animation delays
  const stagger = (index: number) => (prefersReduced ? 0 : 0.2 + index * 0.15);

  return (
    <>
      {/* Atmosphere layers */}
      <BackgroundGlow />
      <Particles />
      <StarField />
      <CursorGlow />
      <Confetti fire={countdownComplete} />

      {/* Controls — top right corner */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-1">
        <ThemeToggle />
        <MusicToggle youtubeUrl={youtubeUrl} />
      </div>

      {/* Main content */}
      <main
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12"
        style={{
          backgroundColor: "var(--bg-primary)",
          transition: "background-color 2s ease",
        }}
      >
        <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 max-w-2xl mx-auto w-full">
          {/* Title */}
          <motion.h1
            className="text-center"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)",
              fontWeight: 300,
              color: "var(--text-primary)",
              lineHeight: 1.4,
              letterSpacing: "0.01em",
              transition: "color 2s ease",
            }}
            initial={prefersReduced ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: stagger(0), ease: "easeOut" }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-center -mt-4"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
                fontWeight: 300,
                color: "var(--text-secondary)",
                fontStyle: "italic",
                transition: "color 2s ease",
              }}
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: stagger(1), ease: "easeOut" }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Countdown */}
          <CountdownDisplay
            targetTimestamp={targetTimestamp}
            createdTimestamp={createdTimestamp}
            onComplete={handleComplete}
          />

          {/* Completion State (Map & Message) */}
          {countdownComplete && (
            <motion.div
              className="flex flex-col items-center gap-6 w-full max-w-xl mt-2"
              initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {completionMessage && (
                <h2
                  className="text-center"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                    fontWeight: 300,
                    color: "var(--text-primary)",
                    lineHeight: 1.4,
                  }}
                >
                  {completionMessage}
                </h2>
              )}
              {locationUrl && (
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#E8E2DA] relative">
                  <iframe
                    src={locationUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              )}
            </motion.div>
          )}

          {/* Micro-message */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: stagger(3), ease: "easeOut" }}
          >
            <MicroMessage />
          </motion.div>

          {/* Heartbeat */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: stagger(4), ease: "easeOut" }}
          >
            <Heartbeat />
          </motion.div>

          {/* Local time */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: stagger(5), ease: "easeOut" }}
          >
            <LocalTime />
          </motion.div>
        </div>
      </main>
    </>
  );
}
