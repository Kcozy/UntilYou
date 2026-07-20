"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { calculateRemaining, type CountdownValues } from "@/lib/countdown";

/**
 * Core countdown hook — zero drift.
 *
 * Every tick recalculates from scratch:
 *   remaining = targetTimestamp - Date.now()
 *
 * No interval accumulation. No stored client state.
 * If the user opens the page 10 days later, it's still correct.
 */
export function useCountdown(
  targetTimestamp: number,
  createdTimestamp: number,
): CountdownValues {
  const calculate = useCallback(
    () => calculateRemaining(targetTimestamp, createdTimestamp),
    [targetTimestamp, createdTimestamp],
  );

  const [values, setValues] = useState<CountdownValues>(calculate);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Immediately recalculate
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues(calculate());

    // Tick every second — but always recalculate from Date.now()
    intervalRef.current = setInterval(() => {
      const next = calculate();
      setValues(next);

      // Stop ticking once complete
      if (next.isComplete && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [calculate]);

  return values;
}
