"use client";

import { useEffect, useRef, useState } from "react";

/** Counts a value like "320+", "98%" or "4.9★" up from zero when scrolled into view. */
export function StatCounter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const decimals = match && match[1].includes(".") ? 1 : 0;

  const [n, setN] = useState(0);

  // Start when the number scrolls into view — but also start straight away if
  // it is already on screen at mount, or if IntersectionObserver is missing.
  // A stat whose trigger never fires must still show its real value rather
  // than sit at "0" forever.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScreen = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    if (typeof IntersectionObserver === "undefined" || onScreen()) {
      setStarted(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      let p = Math.min((now - t0) / dur, 1);
      p = 1 - Math.pow(1 - p, 3);
      setN(target * p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  return (
    <span ref={ref} className={className}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
