import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { getConfig, saveConfig, type CountdownConfigInput } from "@/lib/config";
import { cookies } from "next/headers";

/**
 * GET /api/config — Fetch current countdown config.
 * Public endpoint (the homepage needs it).
 */
export async function GET() {
  try {
    const config = await getConfig();
    if (!config) {
      return NextResponse.json({ config: null });
    }
    return NextResponse.json({ config });
  } catch (error) {
    console.error("Error fetching config:", error);
    return NextResponse.json(
      { error: "Failed to fetch configuration." },
      { status: 500 },
    );
  }
}

/**
 * POST /api/config — Save countdown config.
 * Protected — requires valid admin JWT.
 */
export async function POST(request: Request) {
  try {
    // Verify auth (defense in depth — middleware also checks)
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token." }, { status: 401 });
    }

    const body = await request.json();
    const { targetDate, targetTime, timezone, title, subtitle, youtubeUrl } =
      body;

    // Validate required fields
    if (!targetDate || !targetTime || !timezone) {
      return NextResponse.json(
        { error: "Target date, time, and timezone are required." },
        { status: 400 },
      );
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
      return NextResponse.json(
        { error: "Invalid date format. Use YYYY-MM-DD." },
        { status: 400 },
      );
    }

    // Validate time format (HH:MM)
    if (!/^\d{2}:\d{2}$/.test(targetTime)) {
      return NextResponse.json(
        { error: "Invalid time format. Use HH:MM." },
        { status: 400 },
      );
    }

    const input: CountdownConfigInput = {
      targetDate,
      targetTime,
      timezone,
      title: title || "Until I can finally hug you again.",
      subtitle: subtitle || "",
      youtubeUrl: youtubeUrl || "",
    };

    const saved = await saveConfig(input);
    return NextResponse.json({ config: saved, success: true });
  } catch (error) {
    console.error("Error saving config:", error);
    return NextResponse.json(
      { error: "Failed to save configuration." },
      { status: 500 },
    );
  }
}
