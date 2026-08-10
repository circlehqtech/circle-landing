import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';

type Shot = { src: string; label: string; };

const ROW_ONE: Shot[] = [
  {
    src: "/04142454-c400-4763-b6ad-67e42d6533fd.jpg",
    label: 'The studio · Lagos'
  },
  {
    src: "/3a189f97-4d04-43b7-ad66-524fad486114.jpg",
    label: 'Live operations dashboard'
  },
  {
    src: "/fc1b4738-d5c0-44fa-80be-c83cd0a3a8d1.jpg",
    label: 'Workflow automation map'
  },
  {
    src: "/0ebc1652-0ca4-4ab7-93ef-92e86aa33b02.jpg",
    label: 'Systems research'
  }
];

const ROW_TWO: Shot[] = [
  {
    src: "/e09b6faa-e971-40ef-a82d-f1711d7ff579.jpg",
    label: 'Academy workshop'
  },
  {
    src: "/9676547c-bb5b-49a6-b12f-91640f0ea60b.jpg",
    label: 'Team training day'
  },
  {
    src: "/8ddb7eec-73d5-4524-a4d4-d16ae945ad64.jpg",
    label: 'Agent architecture'
  },
  {
    src: "/2716ccb6-35bb-43e3-b2b5-908f2d8c7302.jpg",
    label: 'Client discovery'
  }
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
