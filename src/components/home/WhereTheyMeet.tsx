import React from 'react';
import { motion } from 'framer-motion';
import { ScrollRevealText } from '../common/ScrollRevealText';

export function WhereTheyMeet() {
  return (
    <section className="relative mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red">
        Where they meet
      </motion.p>
      <ScrollRevealText
        text="A system is only as good as the people running it. That's the sweet spot Circle HQ sits in — build the AI, then build the capability to run it. You can work with either side on its own, or both, depending on what your business needs right now."
        accent={['sweet', 'spot', 'build', 'capability']}
        className="font-display text-2xl font-semibold leading-[1.28] tracking-[-0.02em] text-white sm:text-4xl" />
    </section>
  );
}
