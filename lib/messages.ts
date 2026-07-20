/**
 * Romantic micro-messages that rotate every 45 seconds.
 * Each one should feel whispered, not shouted.
 */
export const romanticMessages: string[] = [
  "I miss your laugh.",
  "Only a little longer.",
  "Every second is worth waiting for.",
  "Almost there.",
  "Thinking of you right now.",
  "The wait makes it sweeter.",
  "You are my favorite hello.",
  "Counting the moments.",
  "Soon.",
  "You make the distance feel smaller.",
  "I carry you in my thoughts.",
  "The best things are worth waiting for.",
  "Every heartbeat brings us closer.",
  "Distance means so little when someone means so much.",
  "See you soon, my love.",
  "I promise it will be worth the wait.",
  "You are the reason I smile at my phone.",
  "A little more patience, a lot more love.",
  "Not long now.",
  "Missing you is my heart's way of reminding me that I love you.",
];

/**
 * Get a message based on elapsed time.
 * Rotates every 45 seconds, cycling through all messages.
 */
export function getMessageIndex(now: number = Date.now()): number {
  const cycleSeconds = 45;
  const elapsed = Math.floor(now / 1000 / cycleSeconds);
  return elapsed % romanticMessages.length;
}
