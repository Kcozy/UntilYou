"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { extractYouTubeId } from "@/lib/youtube";

interface MusicToggleProps {
  youtubeUrl: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type YTWindow = Window &
  typeof globalThis & { YT: any; onYouTubeIframeAPIReady: () => void };

export function MusicToggle({ youtubeUrl }: MusicToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const videoId = extractYouTubeId(youtubeUrl);

  const initPlayer = useCallback(() => {
    if (!videoId || !containerRef.current || playerRef.current) return;

    const yt = (window as unknown as YTWindow).YT;
    if (!yt?.Player) return;

    playerRef.current = new yt.Player(containerRef.current, {
      height: "0",
      width: "0",
      videoId,
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: videoId,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
      },
      events: {
        onReady: () => {
          setIsLoaded(true);
          playerRef.current?.setVolume(30);
          playerRef.current?.playVideo();
          setIsPlaying(true);
        },
      },
    });
  }, [videoId]);

  const loadYouTubeAPI = useCallback(() => {
    const ytWindow = window as unknown as YTWindow;

    if (ytWindow.YT?.Player) {
      initPlayer();
      return;
    }

    // Load YT IFrame API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(tag, firstScript);

    ytWindow.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };
  }, [initPlayer]);

  const toggleMusic = () => {
    if (!isLoaded) {
      // First click — load the API and start playing
      loadYouTubeAPI();
      return;
    }

    if (isPlaying) {
      playerRef.current?.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current?.playVideo();
      setIsPlaying(true);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      playerRef.current?.destroy();
    };
  }, []);

  // Don't render if no YouTube URL configured
  if (!videoId) return null;

  return (
    <>
      <button
        onClick={toggleMusic}
        className="cursor-pointer p-2 rounded-full transition-colors duration-200 hover:opacity-70"
        style={{
          color: "var(--text-secondary)",
          fontSize: "1.1rem",
          background: "transparent",
          border: "none",
          lineHeight: 1,
        }}
        aria-label={
          isPlaying ? "Pause background music" : "Play background music"
        }
        aria-pressed={isPlaying}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? "♫" : "♪"}
      </button>
      {/* Hidden YouTube player container */}
      <div
        ref={containerRef}
        className="fixed -left-[9999px] -top-[9999px]"
        style={{ width: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
      />
    </>
  );
}
