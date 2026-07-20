/**
 * Extract the YouTube video ID from various URL formats.
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID&list=...
 * - VIDEO_ID (raw ID, 11 chars)
 */
export function extractYouTubeId(url: string): string | null {
  if (!url || url.trim() === "") return null;

  const trimmed = url.trim();

  // Raw video ID (11 alphanumeric chars + hyphens/underscores)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);

    // youtu.be/VIDEO_ID
    if (parsed.hostname === "youtu.be" || parsed.hostname === "www.youtu.be") {
      const id = parsed.pathname.slice(1);
      return id.length === 11 ? id : null;
    }

    // youtube.com/watch?v=VIDEO_ID
    if (
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "m.youtube.com"
    ) {
      const v = parsed.searchParams.get("v");
      if (v && v.length === 11) return v;

      // youtube.com/embed/VIDEO_ID
      if (parsed.pathname.startsWith("/embed/")) {
        const id = parsed.pathname.split("/embed/")[1]?.split("/")[0];
        if (id && id.length === 11) return id;
      }
    }
  } catch {
    // Not a valid URL — not a video ID either
    return null;
  }

  return null;
}
