import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  strength?: number;
};

/**
 * A button/link that leans toward the cursor and springs back on exit.
 */
export function MagneticButton({
  children,
  href,
  type = 'button',
  onClick,
  disabled,
  className = '',
  strength = 0.35
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const shared = {
    ref: ref as never,
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className
  };

  if (href) {
    const isExternal = /^(https?:|mailto:|tel:)/.test(href) || href.startsWith('#');
    if (isExternal) {
      return (
        <motion.a href={href} onClick={onClick} {...shared}>
          {children}
        </motion.a>
      );
    }
    return (
      <motion.div {...shared}>
        <Link to={href} onClick={onClick} className="inline-flex items-center gap-2 w-full h-full text-inherit no-underline">
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} {...shared}>
      {children}
    </motion.button>
  );
}
