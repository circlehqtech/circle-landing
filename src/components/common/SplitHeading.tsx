import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
  /** Words rendered in muted grey instead of white. */
  muted?: string[];
  /** Class applied to muted words. */
  mutedClassName?: string;
  as?: 'h2' | 'h3' | 'p';
};

/**
 * Word-by-word mask reveal driven by scroll position.
 */
export function SplitHeading({
  text,
  className = '',
  muted = [],
  mutedClassName = 'text-hq-mute',
  as = 'h2'
}: Props) {
  const Tag = motion[as];
  const words = text.split(' ');

  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      variants={{ show: { transition: { staggerChildren: 0.045 } } }}
      className={className}>
      
      {words.map((word, i) =>
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: '0%', opacity: 1 }
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`mr-[0.24em] inline-block ${
              muted.includes(word.replace(/[.,]/g, '')) ? mutedClassName : ''
            }`}>
            {word}
          </motion.span>
        </span>
      )}
    </Tag>
  );
}
