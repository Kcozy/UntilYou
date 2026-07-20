"use client";

import { useState, useEffect, type FormEvent } from "react";

// Common timezones
const TIMEZONES = [
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Dubai",
  "Asia/Singapore",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Australia/Sydney",
  "Pacific/Auckland",
  "UTC",
];

interface ConfigData {
  targetDate: string;
  targetTime: string;
  timezone: string;
  title: string;
  subtitle: string;
  youtubeUrl: string;
}

export function ConfigForm() {
  const [config, setConfig] = useState<ConfigData>({
    targetDate: "",
    targetTime: "00:00",
    timezone: "Asia/Kolkata",
    title: "Until I can finally hug you again.",
    subtitle: "",
    youtubeUrl: "",
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Load existing config on mount
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch("/api/config");
        const data = await res.json();
        if (data.config) {
          setConfig({
            targetDate: data.config.targetDate || "",
            targetTime: data.config.targetTime || "00:00",
            timezone: data.config.timezone || "Asia/Kolkata",
            title: data.config.title || "Until I can finally hug you again.",
            subtitle: data.config.subtitle || "",
            youtubeUrl: data.config.youtubeUrl || "",
          });
        }
      } catch (err) {
        console.error("Failed to load config:", err);
      } finally {
        setLoading(false);
      }
    };
    loadConfig();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: "success", text: "Saved. The countdown is live." });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const inputStyles = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.9rem",
    backgroundColor: "#FFF8F2",
    borderColor: "#E8E2DA",
    color: "#2C2825",
  };

  const labelStyles = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.8rem",
    fontWeight: 500 as const,
    color: "#5C5652",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p style={{ fontFamily: "'Inter', sans-serif", color: "#5C5652" }}>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-12"
      style={{ backgroundColor: "#FAF6F0" }}
    >
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              fontWeight: 300,
              color: "#2C2825",
              marginBottom: "0.5rem",
            }}
          >
            Configure Countdown
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              color: "#5C5652",
            }}
          >
            Set the date, time, and message for the countdown page.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Target Date */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="targetDate" style={labelStyles}>
              Target Date
            </label>
            <input
              id="targetDate"
              type="date"
              required
              value={config.targetDate}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, targetDate: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200 focus:border-[#C4A08A] focus:shadow-[0_0_0_3px_rgba(196,160,138,0.15)]"
              style={inputStyles}
            />
          </div>

          {/* Target Time */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="targetTime" style={labelStyles}>
              Target Time
            </label>
            <input
              id="targetTime"
              type="time"
              required
              value={config.targetTime}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, targetTime: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200 focus:border-[#C4A08A] focus:shadow-[0_0_0_3px_rgba(196,160,138,0.15)]"
              style={inputStyles}
            />
          </div>

          {/* Timezone */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="timezone" style={labelStyles}>
              Timezone
            </label>
            <select
              id="timezone"
              value={config.timezone}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, timezone: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200 focus:border-[#C4A08A] focus:shadow-[0_0_0_3px_rgba(196,160,138,0.15)] cursor-pointer"
              style={inputStyles}
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" style={labelStyles}>
              Title
            </label>
            <input
              id="title"
              type="text"
              value={config.title}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Until I can finally hug you again."
              className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200 focus:border-[#C4A08A] focus:shadow-[0_0_0_3px_rgba(196,160,138,0.15)]"
              style={inputStyles}
            />
          </div>

          {/* Subtitle */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="subtitle" style={labelStyles}>
              Subtitle (optional)
            </label>
            <input
              id="subtitle"
              type="text"
              value={config.subtitle}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, subtitle: e.target.value }))
              }
              placeholder="Every second is worth waiting for."
              className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200 focus:border-[#C4A08A] focus:shadow-[0_0_0_3px_rgba(196,160,138,0.15)]"
              style={inputStyles}
            />
          </div>

          {/* YouTube URL */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="youtubeUrl" style={labelStyles}>
              Background Music (YouTube URL)
            </label>
            <input
              id="youtubeUrl"
              type="text"
              value={config.youtubeUrl}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, youtubeUrl: e.target.value }))
              }
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200 focus:border-[#C4A08A] focus:shadow-[0_0_0_3px_rgba(196,160,138,0.15)]"
              style={inputStyles}
            />
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                color: "#8A8078",
              }}
            >
              Paste any YouTube link. Audio plays when she clicks the music
              icon.
            </p>
          </div>

          {/* Status message */}
          {message && (
            <div
              className="px-4 py-3 rounded-lg text-center"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                backgroundColor:
                  message.type === "success" ? "#F0F8F0" : "#FFF0F0",
                color: message.type === "success" ? "#2D5A2D" : "#8B3A3A",
                border: `1px solid ${message.type === "success" ? "#C8E6C8" : "#E6C8C8"}`,
              }}
              role="alert"
            >
              {message.text}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving || !config.targetDate}
              className="flex-1 py-3 rounded-lg cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
                backgroundColor: "#2C2825",
                color: "#FAF6F0",
                border: "none",
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg text-center transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
                backgroundColor: "transparent",
                color: "#2C2825",
                border: "1px solid #E8E2DA",
                textDecoration: "none",
              }}
            >
              Preview
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
