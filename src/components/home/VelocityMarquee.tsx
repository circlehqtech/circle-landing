import React, { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity } from
'framer-motion';

const ITEMS = [
  'AI Systems',
  'Workflow Automation',
  'Live Dashboards',
  'Circle Academy',
  'Agent Building',
  'Workforce Literacy'];

/**
 * A slow, continuously drifting band that eases faster and skews slightly with
 * scroll velocity, then settles back to a calm baseline.
 */
export function VelocityMarquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 60, stiffness: 250 });
  const factor = useTransform(smooth, [-1500, 0, 1500], [-2.2, 1, 2.2], { clamp: true });
  const skew = useTransform(smooth, [-1500, 0, 1500], [-3, 0, 3], { clamp: true });
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    const v = factor.get();
    direction.current = v < 0 ? -1 : 1;
    // Baseline drift is intentionally gentle; scroll only nudges it.
    const move = direction.current * 0.0022 * delta * Math.max(0.6, Math.abs(v));
    let next = baseX.get() + move;
    if (next <= -50) next += 50;
    if (next >= 0) next -= 50;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden border-y border-hq-line bg-hq-panel/30 py-6">
      <motion.div style={{ skewX: skew }}>
        <motion.div style={{ x }} className="flex w-max whitespace-nowrap">
          {[0, 1, 2, 3].map((copy) =>
            <div key={copy} className="flex shrink-0 items-center">
              {ITEMS.map((item) =>
                <span key={`${copy}-${item}`} className="flex items-center">
                  <span className="px-6 font-display text-2xl font-semibold tracking-tight text-white/70 sm:text-3xl">
                    {item}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-hq-red" />
                </span>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
