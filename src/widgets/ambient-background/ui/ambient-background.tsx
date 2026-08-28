"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";

/**
 * Fixed, non-interactive backdrop behind the whole site. Sections with their own
 * background (sand, ink) paint over it — it only shows through the plain white
 * stretches, which is exactly where the page used to look flat.
 *
 * Everything here is deliberately low-contrast: soft brand-tinted glows plus a
 * paper grain. No hard edges, nothing that competes with the content.
 */

interface Glow {
  className: string;
  animate: TargetAndTransition;
  /** One full drift cycle, in seconds. */
  duration: number;
}

/** Slow drifting glows, in brand gold / green / amber. */
const GLOWS: Glow[] = [
  {
    className:
      "left-[-14%] top-[6%] size-[46vw] bg-[radial-gradient(circle,rgba(189,139,0,0.16),transparent_68%)]",
    animate: { x: [0, 70, -30, 0], y: [0, -50, 40, 0], scale: [1, 1.08, 0.96, 1] },
    duration: 34,
  },
  {
    className:
      "right-[-12%] top-[34%] size-[40vw] bg-[radial-gradient(circle,rgba(43,178,76,0.13),transparent_68%)]",
    animate: { x: [0, -60, 35, 0], y: [0, 60, -35, 0], scale: [1, 0.94, 1.07, 1] },
    duration: 42,
  },
  {
    className:
      "bottom-[4%] left-[26%] size-[52vw] bg-[radial-gradient(circle,rgba(227,162,30,0.11),transparent_70%)]",
    animate: { x: [0, 50, -55, 0], y: [0, -35, 25, 0], scale: [1, 1.06, 0.95, 1] },
    duration: 50,
  },
];

/** Fractal noise baked into an SVG data URI — a texture with no extra request. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {GLOWS.map((glow, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[90px] ${glow.className}`}
          animate={reduceMotion ? undefined : glow.animate}
          transition={{ duration: glow.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Hairline grid, faded out towards the edges so it never reads as a table. */}
      <div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(14,14,14,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,14,14,0.035) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />

      {/* Paper grain — the thing that stops large flat areas from banding. */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat" }}
      />
    </div>
  );
}
