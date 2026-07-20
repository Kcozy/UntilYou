export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isComplete: boolean;
  percentComplete: number;
}

/**
 * Calculate remaining time from target timestamp.
 * Pure function — no side effects, no drift.
 */
export function calculateRemaining(
  targetTimestamp: number,
  createdTimestamp: number,
  now: number = Date.now(),
): CountdownValues {
  const remaining = Math.max(0, targetTimestamp - now);
  const totalDuration = Math.max(1, targetTimestamp - createdTimestamp);
  const elapsed = Math.max(0, now - createdTimestamp);

  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining % 86_400_000) / 3_600_000),
    minutes: Math.floor((remaining % 3_600_000) / 60_000),
    seconds: Math.floor((remaining % 60_000) / 1000),
    totalMs: remaining,
    isComplete: remaining <= 0,
    percentComplete: Math.min(
      100,
      Math.max(0, (elapsed / totalDuration) * 100),
    ),
  };
}

/**
 * Format a number with leading zero.
 */
export function padTwo(n: number): string {
  return n.toString().padStart(2, "0");
}
