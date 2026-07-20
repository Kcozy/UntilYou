"use client";

import { useState, useEffect } from "react";

export function LocalTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      return now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(formatTime());

    const interval = setInterval(() => {
      setTime(formatTime());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <p
      className="text-center"
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
        color: "var(--text-secondary)",
        letterSpacing: "0.02em",
      }}
    >
      <time dateTime={new Date().toISOString()}>
        It&apos;s {time} where you are
      </time>
    </p>
  );
}
