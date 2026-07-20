import { getDb } from "./mongodb";

export interface CountdownConfig {
  _id: string;
  targetDate: string; // e.g. "2026-08-15"
  targetTime: string; // e.g. "18:00"
  timezone: string; // e.g. "Asia/Kolkata"
  title: string; // e.g. "Until I can finally hug you again."
  subtitle: string; // optional second line
  youtubeUrl: string; // YouTube link for background music
  locationUrl: string; // Google Maps embed URL
  completionMessage: string; // Message shown when countdown hits zero
  createdAt: string; // ISO timestamp — when config was first created
  updatedAt: string; // ISO timestamp — last save
}

export type CountdownConfigInput = Omit<
  CountdownConfig,
  "_id" | "createdAt" | "updatedAt"
>;

const COLLECTION = "config";
const DOC_ID = "countdown";

/**
 * Fetch the countdown configuration from MongoDB.
 * Returns null if no config exists yet.
 */
export async function getConfig(): Promise<CountdownConfig | null> {
  const db = await getDb();
  const doc = await db
    .collection(COLLECTION)
    .findOne({ _id: DOC_ID as unknown as import("mongodb").ObjectId });
  return doc as unknown as CountdownConfig | null;
}

/**
 * Save the countdown configuration to MongoDB.
 * Uses upsert — creates if doesn't exist, updates if it does.
 */
export async function saveConfig(
  input: CountdownConfigInput,
): Promise<CountdownConfig> {
  const db = await getDb();
  const now = new Date().toISOString();

  const existing = await getConfig();

  const doc: CountdownConfig = {
    _id: DOC_ID,
    ...input,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  await db
    .collection(COLLECTION)
    .updateOne(
      { _id: DOC_ID as unknown as import("mongodb").ObjectId },
      { $set: doc },
      { upsert: true },
    );

  return doc;
}

/**
 * Compute the target timestamp in milliseconds from the config.
 * This is the absolute point in time the countdown counts toward.
 */
export function computeTargetTimestamp(config: CountdownConfig): number {
  // Create a date string in the target timezone
  const dateTimeStr = `${config.targetDate}T${config.targetTime}:00`;

  // Use Intl to find the UTC offset for the given timezone at the target time
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: config.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Parse the target date/time as if it's in the specified timezone
  // We need to find what UTC time corresponds to this local time
  const targetLocal = new Date(dateTimeStr);

  // Get the UTC offset by comparing formatted output
  const parts = formatter.formatToParts(targetLocal);
  const getPart = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  // Reconstruct the date in the target timezone
  const tzDate = new Date(
    `${getPart("year")}-${getPart("month")}-${getPart("day")}T${getPart("hour")}:${getPart("minute")}:${getPart("second")}`,
  );

  // The difference tells us the UTC offset
  const offsetMs = targetLocal.getTime() - tzDate.getTime();

  // The actual target timestamp is the local time in that timezone converted to UTC
  const localDate = new Date(dateTimeStr);
  return localDate.getTime() + offsetMs;
}
