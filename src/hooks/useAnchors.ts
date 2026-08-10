import { useCallback, useLayoutEffect, useRef, useState } from "react";

export type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type Size = { width: number; height: number };

function sameRects(a: Record<string, Rect>, b: Record<string, Rect>) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every((key) => {
    const x = a[key];
    const y = b[key];
    return (
      y !== undefined &&
      Math.abs(x.top - y.top) < 0.5 &&
      Math.abs(x.left - y.left) < 0.5 &&
      Math.abs(x.width - y.width) < 0.5 &&
      Math.abs(x.height - y.height) < 0.5
    );
  });
}

export function useAnchors() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodes = useRef(new Map<string, HTMLElement>());
  const callbacks = useRef(new Map<string, (el: HTMLElement | null) => void>());
  const observer = useRef<ResizeObserver | null>(null);
  const frame = useRef<number | null>(null);

  const [rects, setRects] = useState<Record<string, Rect>>({});
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const base = container.getBoundingClientRect();

    const next: Record<string, Rect> = {};
    nodes.current.forEach((el, id) => {
      const r = el.getBoundingClientRect();
      next[id] = {
        top: r.top - base.top,
        left: r.left - base.left,
        width: r.width,
        height: r.height,
      };
    });

    setRects((prev) => (sameRects(prev, next) ? prev : next));
    setSize((prev) =>
      Math.abs(prev.width - base.width) < 0.5 &&
      Math.abs(prev.height - base.height) < 0.5
        ? prev
        : { width: base.width, height: base.height },
    );
  }, []);

  const scheduleMeasure = useCallback(() => {
    if (frame.current !== null) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = null;
      measure();
    });
  }, [measure]);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(scheduleMeasure);
    observer.current = ro;
    if (containerRef.current) ro.observe(containerRef.current);
    nodes.current.forEach((el) => ro.observe(el));
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      ro.disconnect();
      observer.current = null;
      window.removeEventListener("resize", scheduleMeasure);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, [measure, scheduleMeasure]);

  // Stable callback per id, so refs are not detached/reattached on every render.
  const register = useCallback(
    (id: string) => {
      const existing = callbacks.current.get(id);
      if (existing) return existing;

      const callback = (el: HTMLElement | null) => {
        const previous = nodes.current.get(id);
        if (previous && observer.current) observer.current.unobserve(previous);

        if (el) {
          nodes.current.set(id, el);
          if (observer.current) observer.current.observe(el);
        } else {
          nodes.current.delete(id);
        }
        scheduleMeasure();
      };

      callbacks.current.set(id, callback);
      return callback;
    },
    [scheduleMeasure],
  );

  return { containerRef, register, rects, size };
}
