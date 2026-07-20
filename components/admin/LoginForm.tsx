"use client";

import { useState, useRef } from "react";


export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const currentPassword = passwordRef.current?.value || password;

    if (!currentPassword) {
      setError("Please enter a password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: currentPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = "/admin";
      } else {
        setError(data.error || "Incorrect password.");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#FAF6F0" }}
    >
      <div
        className={`w-full max-w-sm flex flex-col gap-6 ${shake ? "animate-shake" : ""}`}
        style={{
          animation: shake ? "shake 0.5s ease-in-out" : undefined,
        }}
      >
        <div className="text-center">
          <h1
            className="mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.8rem",
              fontWeight: 300,
              color: "#2C2825",
            }}
          >
            Welcome back
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              color: "#5C5652",
            }}
          >
            Enter your password to continue
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoFocus
            ref={passwordRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              backgroundColor: "#FFF8F2",
              borderColor: error ? "#D4A090" : "#E8E2DA",
              color: "#2C2825",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#C4A08A";
              e.target.style.boxShadow = "0 0 0 3px rgba(196, 160, 138, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = error ? "#D4A090" : "#E8E2DA";
              e.target.style.boxShadow = "none";
            }}
            aria-label="Admin password"
            aria-describedby={error ? "login-error" : undefined}
          />
          {error && (
            <p
              id="login-error"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                color: "#D4A090",
              }}
              role="alert"
            >
              {error}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-lg cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 500,
            backgroundColor: "#2C2825",
            color: "#FAF6F0",
            border: "none",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              (e.target as HTMLButtonElement).style.backgroundColor = "#3C3835";
            }
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = "#2C2825";
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-8px);
          }
          50% {
            transform: translateX(8px);
          }
          75% {
            transform: translateX(-4px);
          }
        }
      `}</style>
    </div>
  );
}
