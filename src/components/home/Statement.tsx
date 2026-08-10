import React from 'react';
import { motion } from 'framer-motion';
import { ScrollRevealText } from '../common/ScrollRevealText';

export function Statement() {
  return (
    <section className="relative mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red">
        Why we exist
      </motion.p>
      <ScrollRevealText
        text="Most businesses do not need more software. They need the drag removed — the retyping, the missed replies, the numbers nobody can see. We build the system, and we train the people who keep it alive."
        accent={['drag', 'removed', 'system,', 'system']}
        className="font-display text-2xl font-semibold leading-[1.28] tracking-[-0.02em] text-white sm:text-4xl" />
    </section>
  );
}
