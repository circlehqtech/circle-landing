import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
  /** Words that stay brand red once revealed. */
  accent?: string[];
};

/**
 * Copy that brightens word-by-word as the section scrolls through the viewport.
 */
export function ScrollRevealText({ text, className = '', accent = [] }: Props) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45']
  });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[start, end]}
            accent={accent.includes(word.replace(/[.,—]/g, ''))}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span
        style={{ opacity, y }}
        className={`inline-block ${accent ? 'text-hq-red' : ''}`}>
        {children}
      </motion.span>
    </span>
  );
}
