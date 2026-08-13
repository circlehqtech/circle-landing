import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';

import img2809 from '../../assets/h-image/IMG_2809.webp';
import img2855 from '../../assets/h-image/IMG_2855.webp';
import img2919 from '../../assets/h-image/IMG_2919.webp';
import img2997 from '../../assets/h-image/IMG_2997.webp';
import img3050 from '../../assets/h-image/IMG_3050.webp';
import img3051 from '../../assets/h-image/IMG_3051.webp';
import img3089 from '../../assets/h-image/IMG_3089.webp';
import img3097 from '../../assets/h-image/IMG_3097.webp';
import img3140 from '../../assets/h-image/IMG_3140.webp';
import img3156 from '../../assets/h-image/IMG_3156.webp';
import img3159 from '../../assets/h-image/IMG_3159.webp';

type Shot = { src: string; label: string };

const ROW_ONE: Shot[] = [
  { src: img2809, label: 'The Studio · Circle HQ' },
  { src: img2855, label: 'Engineering Sprint' },
  { src: img2919, label: 'Architecture Review' },
  { src: img2997, label: 'Live Operations Dashboard' },
  { src: img3050, label: 'Systems Research Lab' },
  { src: img3051, label: 'AI Strategy Session' },
];

const ROW_TWO: Shot[] = [
  { src: img3089, label: 'Team Collaboration' },
  { src: img3097, label: 'Workflow Engine Teardown' },
  { src: img3140, label: 'Deployment & Telemetry' },
  { src: img3156, label: 'Agent Build Lab' },
  { src: img3159, label: 'Client Discovery' },
];

export function HorizontalGallery() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 });

  const xLeft = useTransform(smooth, [0, 1], ['2%', '-32%']);
  const xRight = useTransform(smooth, [0, 1], ['-32%', '2%']);

  return (
    <section
      ref={ref}
      data-sage-track="Inside Circle HQ"
      className="relative overflow-hidden border-y border-hq-line py-20 sm:py-28">
      
      <div className="mx-auto mb-12 flex max-w-7xl flex-col gap-4 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red">
            Inside the HQ
          </p>
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl">
            The work, the room, and the people in it.
          </h2>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-hq-mute">
          Scroll to move the rails
        </p>
      </div>

      <div className="space-y-4">
        <Rail shots={ROW_ONE} x={xLeft} />
        <Rail shots={ROW_TWO} x={xRight} reverse />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-hq-black [mask-image:linear-gradient(to_right,black,transparent)] sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-hq-black [mask-image:linear-gradient(to_left,black,transparent)] sm:w-28" />
    </section>
  );
}

function Rail({
  shots,
  x,
  reverse = false
}: { shots: Shot[]; x: MotionValue<string>; reverse?: boolean; }) {
  const items = [...shots, ...shots];
  return (
    <motion.div style={{ x }} className="flex w-max gap-4 px-4">
      {items.map((shot, i) =>
        <figure
          key={`${shot.label}-${i}`}
          className={`group relative h-44 w-64 shrink-0 overflow-hidden rounded-2xl border border-hq-line sm:h-60 sm:w-[22rem] ${
            reverse ? 'rotate-[0.6deg]' : '-rotate-[0.6deg]'
          }`}>
          <img
            src={shot.src}
            alt={shot.label}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0" />
          <span className="absolute inset-0 bg-hq-black/40 transition-opacity duration-500 group-hover:opacity-0" />
          <figcaption className="absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-hq-black/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
            <span className="h-1 w-1 rounded-full bg-hq-red" />
            {shot.label}
          </figcaption>
        </figure>
      )}
    </motion.div>
  );
}
