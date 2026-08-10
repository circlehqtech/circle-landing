import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { SplitHeading } from '../common/SplitHeading';

const PRINCIPLES = [
  {
    title: 'Built for Your Business, Not a Template',
    body: 'Every system we build starts with your actual operations — your bottlenecks, your workflows, your team. We don’t sell a fixed product; we build what your business needs.'
  },
  {
    title: 'Honest AI, Not Hype',
    body: 'We’d rather tell you your business isn’t ready for AI yet than sell you something that won’t work. Every recommendation is grounded in what will genuinely move your operation forward.'
  },
  {
    title: 'Systems, Not One-Off Tools',
    body: 'We build durable infrastructure your business runs on for years — not a quick automation that breaks the moment your workflow changes.'
  },
  {
    title: 'People Who Can Actually Use It',
    body: 'A system means nothing if the humans behind it don’t know how to run it. We make sure they do.'
  }
];

const STATS = [
  { value: 2, suffix: '', label: 'Core divisions under one HQ' },
  { value: 24, suffix: '/7', label: 'Systems running after handover' },
  { value: 100, suffix: '%', label: 'Free student outreach programmes' }
];

export function Standard() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  const lineScale = useSpring(useTransform(scrollYProgress, [0.1, 0.85], [0, 1]), {
    stiffness: 90,
    damping: 26
  });

  return (
    <section
      id="standard"
      ref={sectionRef}
      data-sage-track="Why Circle HQ"
      className="relative border-y border-hq-line bg-hq-panel/40">
      
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red">
              Why Circle HQ
            </p>
            <SplitHeading
              text="Built in Lagos. Held to one bar."
              muted={['Held', 'to', 'one', 'bar']}
              className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl" />
            
            <p className="mt-6 max-w-md text-sm leading-relaxed text-hq-mute">
              We work with founders and teams who are past experimenting and want systems that hold
              under real volume.
            </p>

            <dl className="mt-12 space-y-6">
              {STATS.map((stat, i) =>
                <StatRow key={stat.label} {...stat} delay={i * 0.1} />
              )}
            </dl>
          </div>

          <div className="relative">
            {/* Scroll-driven spine */}
            <motion.span
              aria-hidden="true"
              style={{ scaleY: lineScale }}
              className="absolute left-0 top-0 hidden h-full w-px origin-top bg-hq-red sm:block" />
            
            <ol className="space-y-4 sm:pl-10">
              {PRINCIPLES.map((principle, i) =>
                <PrincipleCard key={principle.title} index={i} {...principle} />
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrincipleCard({
  index,
  title,
  body
}: { index: number; title: string; body: string; }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-25% 0px -25% 0px' });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 34, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-hq-line bg-hq-black p-7 transition-colors duration-300 hover:border-hq-red/50">
      
      <span
        aria-hidden="true"
        className="absolute -left-10 top-1/2 hidden h-px w-10 -translate-y-1/2 bg-hq-red sm:block" />
      
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[11px] text-hq-red">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-display text-lg font-semibold tracking-tight text-white">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-hq-mute">{body}</p>
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-7 bottom-0 h-px origin-left bg-hq-red/40" />
    </motion.li>
  );
}

function StatRow({
  value,
  suffix,
  label,
  delay
}: { value: number; suffix: string; label: string; delay: number; }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    let start = 0;
    const step = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / 1200);
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="flex items-baseline gap-5 border-b border-hq-line pb-4">
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-3xl font-semibold tabular-nums text-hq-red">
        {display}
        {suffix}
      </dd>
      <span className="text-sm text-hq-mute">{label}</span>
    </motion.div>
  );
}
