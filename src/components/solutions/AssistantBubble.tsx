import React from 'react';
import { motion } from 'framer-motion';

export type BubbleSide = 'left' | 'right';

type AssistantBubbleProps = {
  side: BubbleSide;
  children: React.ReactNode;
};

/**
 * Chat card for the AI Assistant. The tail sits on the edge facing the
 * problem the assistant is answering.
 */
export function AssistantBubble({ side, children }: AssistantBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{ transformOrigin: side === 'left' ? 'top left' : 'top right' }}
      className="relative rounded-2xl bg-white p-4 shadow-[0_24px_60px_-24px_rgba(255,0,0,0.55)]">
      
      <span
        aria-hidden="true"
        className={`absolute top-9 h-4 w-4 rotate-45 bg-white ${
        side === 'left' ? '-left-1.5' : '-right-1.5'}`
        } />
      
      <div className="relative">{children}</div>
    </motion.div>);

}