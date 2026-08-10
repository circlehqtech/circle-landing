import { useEffect, useRef } from 'react';

export type DwellEntry = {label: string;seconds: number;};

export type TelemetrySnapshot = {
  seconds: number;
  scrollDepth: number;
  cursorMeters: number;
  interactions: number;
  dwell: DwellEntry[];
  focus: DwellEntry | null;
  focusShare: number;
};

const TICK_MS = 250;
/** CSS pixels -> metres (96 CSS px per inch). */
const PX_TO_M = 0.0254 / 96;

/**
 * Passively observes how the visitor actually uses the page: time, scroll depth,
 * cursor travel, interactions, and how long each tracked surface held attention.
 * Everything stays in refs — no re-renders — and never leaves the browser.
 */
export function useTelemetry() {
  const start = useRef(Date.now());
  const scrollDepth = useRef(0);
  const cursorPx = useRef(0);
  const interactions = useRef(0);
  const dwell = useRef<Record<string, number>>({});
  const last = useRef<{x: number;y: number;} | null>(null);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (last.current) {
        cursorPx.current += Math.hypot(e.clientX - last.current.x, e.clientY - last.current.y);
      }
      last.current = { x: e.clientX, y: e.clientY };
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const depth = total > 0 ? window.scrollY / total * 100 : 0;
      scrollDepth.current = Math.max(scrollDepth.current, Math.min(100, depth));
    };

    const onInteract = () => {
      interactions.current += 1;
    };

    const tick = () => {
      if (document.hidden) return;
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>('[data-sage-track]')
      );
      let bestLabel: string | null = null;
      let bestArea = 0;
      const vh = window.innerHeight;
      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        const visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
        if (visible > bestArea) {
          bestArea = visible;
          bestLabel = node.dataset.sageTrack || null;
        }
      }
      if (bestLabel && bestArea > vh * 0.2) {
        dwell.current[bestLabel] = (dwell.current[bestLabel] || 0) + TICK_MS / 1000;
      }
    };

    onScroll();
    const interval = window.setInterval(tick, TICK_MS);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointerdown', onInteract);
    window.addEventListener('keydown', onInteract);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('keydown', onInteract);
    };
  }, []);

  const read = (): TelemetrySnapshot => {
    const entries: DwellEntry[] = Object.entries(dwell.current).
    map(([label, seconds]) => ({ label, seconds })).
    sort((a, b) => b.seconds - a.seconds);

    const totalDwell = entries.reduce((sum, e) => sum + e.seconds, 0);
    const focus = entries[0] || null;

    return {
      seconds: Math.round((Date.now() - start.current) / 1000),
      scrollDepth: Math.round(scrollDepth.current),
      cursorMeters: cursorPx.current * PX_TO_M,
      interactions: interactions.current,
      dwell: entries.slice(0, 4),
      focus,
      focusShare: focus && totalDwell > 0 ? focus.seconds / totalDwell : 0
    };
  };

  return { read };
}