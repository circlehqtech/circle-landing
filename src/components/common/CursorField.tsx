import React, { useEffect, useRef } from 'react';

type Dot = {
  x: number;
  y: number;
  ox: number;
  oy: number;
};

type CursorFieldProps = {
  theme?: 'dark' | 'light';
};

/**
 * A canvas dot-matrix that reacts to the cursor: dots are pushed outward,
 * brighten toward the brand red, and a soft red light follows the pointer.
 * Supports both dark and light themes.
 */
export function CursorField({ theme = 'dark' }: CursorFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLight = theme === 'light';

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    const spacing = 30;
    const radius = 190;

    const pointer = { x: -9999, y: -9999 };
    const eased = { x: -9999, y: -9999 };
    let active = false;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          dots.push({ x, y, ox: x, oy: y });
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      if (!active) {
        eased.x = pointer.x;
        eased.y = pointer.y;
        active = true;
      }
    };

    const onPointerLeave = () => {
      active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    let t = 0;
    const render = () => {
      t += 0.006;
      eased.x += (pointer.x - eased.x) * 0.12;
      eased.y += (pointer.y - eased.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      if (active) {
        const glow = ctx.createRadialGradient(eased.x, eased.y, 0, eased.x, eased.y, radius * 1.5);
        glow.addColorStop(0, isLight ? 'rgba(224, 20, 44, 0.12)' : 'rgba(224, 20, 44, 0.16)');
        glow.addColorStop(1, 'rgba(224, 20, 44, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const drift = reduceMotion ? 0 : Math.sin(t + d.ox * 0.01 + d.oy * 0.012) * 1.6;

        const dx = d.ox - eased.x;
        const dy = d.oy - eased.y;
        const dist = Math.hypot(dx, dy);

        let force = 0;
        if (active && dist < radius) force = 1 - dist / radius;

        const push = force * force * 26;
        const tx = d.ox + (dist ? dx / dist * push : 0);
        const ty = d.oy + (dist ? dy / dist * push : 0) + drift;

        d.x += (tx - d.x) * 0.14;
        d.y += (ty - d.y) * 0.14;

        const size = 1 + force * 2.1;
        if (force > 0.02) {
          ctx.fillStyle = isLight 
            ? `rgba(224, 20, 44, ${0.30 + force * 0.70})`
            : `rgba(224, 20, 44, ${0.18 + force * 0.82})`;
        } else {
          ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255, 255, 255, 0.09)';
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Connective threads only very close to the pointer.
        if (force > 0.62) {
          ctx.strokeStyle = isLight 
            ? `rgba(224, 20, 44, ${(force - 0.62) * 0.8})`
            : `rgba(224, 20, 44, ${(force - 0.62) * 0.7})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(eased.x, eased.y);
          ctx.stroke();
        }
      }

      frameRef.current = requestAnimationFrame(render);
    };

    build();
    render();

    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(canvas);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerdown', onPointerMove);
    document.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none" />
  );
}
