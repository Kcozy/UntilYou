# Until You — Implementation Memory

> This file is the living memory of this project. Updated as we build.

---

## Project Overview

A handcrafted romantic countdown website. When she opens the URL, it shows a live countdown to a configurable target date/time. Feels intimate, warm, personal — not templated.

## Key Decisions

| Decision   | Choice                        | Reason                                         |
| ---------- | ----------------------------- | ---------------------------------------------- |
| Framework  | Next.js 15 (App Router)       | Server components + modern routing             |
| Language   | TypeScript (strict)           | Type safety                                    |
| Styling    | Tailwind CSS v4               | Custom design tokens, rapid iteration          |
| Animations | `motion` (Framer Motion v12+) | Subtle, physics-based. Client components only. |
| Data Store | MongoDB Atlas (free M0)       | User preference. Single config document.       |
| Auth       | JWT via `jose` + bcrypt       | Single admin user. Edge-compatible.            |
| Music      | YouTube IFrame API            | Admin pastes YT link. Hidden player.           |
| Fonts      | Cormorant Garamond + Inter    | Elegant serif + clean sans. via `next/font`    |
| Deployment | Vercel (default URL)          | Zero-config for Next.js                        |
| UI Library | None — 100% custom            | No template feel                               |

## Locked Content

- **Title**: "Until I can finally hug you again."
- **Reveal on zero**: Nothing — just confetti burst
- **Theme**: Auto (time-of-day) + manual override toggle
- **Music default**: Off. Requires click.

## Color Palette

| Token         | Hex     | Role              |
| ------------- | ------- | ----------------- |
| cream         | #FAF6F0 | Primary bg        |
| warm-white    | #FFF8F2 | Elevated surfaces |
| dusty-rose    | #C4A08A | Primary accent    |
| muted-rose    | #D4A090 | Secondary accent  |
| blush         | #E8C4B8 | Highlights        |
| charcoal      | #2C2825 | Day text          |
| soft-charcoal | #5C5652 | Secondary text    |
| whisper       | #E8E2DA | Borders           |
| night-bg      | #1A1714 | Night background  |
| night-surface | #2A2520 | Night cards       |
| night-text    | #E8DFD4 | Night text        |

## Typography

- Headings: Cormorant Garamond (300, 400)
- Body/Digits: Inter (400, 500)
- Micro-messages: Cormorant Garamond italic

## Environment Variables

```
MONGODB_URI=mongodb+srv://...
ADMIN_PASSWORD_HASH=$2b$10$...
JWT_SECRET=random-32-char-string
```

---

## Build Progress

### Step 1: Scaffold — ⏳ In Progress

- [ ] Create Next.js 15 project in `d:\Kitty&Q\until-you\`
- [ ] Install dependencies: motion, mongodb, jose, bcryptjs, canvas-confetti
- [ ] Configure Tailwind with custom design tokens
- [ ] Set up fonts via next/font
- [ ] Create .env.local.example

### Step 2: Data Layer — ⬜ Not Started

- [ ] MongoDB client singleton (`lib/mongodb.ts`)
- [ ] Config types (`lib/config.ts`)
- [ ] Fetch/save helpers

### Step 3: Auth — ⬜ Not Started

- [ ] JWT utilities (`lib/auth.ts`)
- [ ] Login API route (`app/api/auth/login/route.ts`)
- [ ] Middleware (`middleware.ts`)

### Step 4: Admin — ⬜ Not Started

- [ ] Login form
- [ ] Config dashboard form
- [ ] Save/load config

### Step 5: Countdown Engine — ⬜ Not Started

- [ ] `useCountdown` hook (zero-drift)
- [ ] `CountdownDisplay` component
- [ ] `CountdownDigit` with transitions
- [ ] `ProgressBar`

### Step 6: Homepage Layout — ⬜ Not Started

- [ ] Server component page
- [ ] Typography & spacing
- [ ] Responsive centering

### Step 7: Atmosphere — ⬜ Not Started

- [ ] Background glow (breathing)
- [ ] Film grain overlay
- [ ] Floating particles
- [ ] Time-of-day backgrounds
- [ ] Cursor glow
- [ ] Star field (night mode)

### Step 8: Romantic Details — ⬜ Not Started

- [ ] Micro-messages (rotating)
- [ ] Heartbeat animation
- [ ] Local time display

### Step 9: Controls — ⬜ Not Started

- [ ] Theme toggle (auto + manual)
- [ ] Music toggle + YouTube player

### Step 10: Confetti — ⬜ Not Started

- [ ] Confetti on zero

### Step 11: Polish — ⬜ Not Started

- [ ] Accessibility audit
- [ ] Performance audit
- [ ] Lighthouse check

### Step 12: Deploy — ⬜ Not Started

- [ ] Vercel config
- [ ] Env vars documentation
- [ ] Production test

---

## Issues & Notes

_(Updated as we encounter things)_

---

## File Registry

_(Key files and what they do — updated as created)_

| File | Purpose | Server/Client |
| ---- | ------- | ------------- |
|      |         |               |

---

_Last updated: 2026-07-20T18:57+05:30_
