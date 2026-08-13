import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

export type RevealMedia = {
  src: string;
  caption: string;
  /** Horizontal nudge so cards from neighbouring words don't stack identically. */
  tilt?: number;
};

type Props = {
  children: React.ReactNode;
  media?: RevealMedia | RevealMedia[];
};

/**
 * A word that shoots a floating image card out above it on hover, GSAP-style:
 * the card springs up, rotates in, and drifts with the cursor.
 */
export function HoverRevealWord({ children, media }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [active, setActive] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);

  const x = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 16, mass: 0.5 });

  const mediaList = media ? (Array.isArray(media) ? media : [media]) : [];
  const currentMedia =
    mediaList.length > 0 ? mediaList[mediaIndex % mediaList.length] : null;

  const handleMouseEnter = () => {
    if (mediaList.length > 1 && !active) {
      setMediaIndex((prev) => prev + 1);
    }
    setActive(true);
  };

  const handleFocus = () => {
    if (mediaList.length > 1 && !active) {
      setMediaIndex((prev) => prev + 1);
    }
    setActive(true);
  };

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 40);
  };

  return (
    <span
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        setActive(false);
        x.set(0);
      }}
      onMouseMove={handleMove}
      onFocus={handleFocus}
      onBlur={() => setActive(false)}
      tabIndex={0}
      className="relative inline-block cursor-pointer transition-colors duration-300 hover:text-hq-red focus:text-hq-red"
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className={`absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-hq-red transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      />

      <AnimatePresence>
        {active && currentMedia && (
          <motion.span
            key={`${currentMedia.src}-${mediaIndex}`}
            aria-hidden="true"
            style={{ x: sx }}
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.6,
              rotate: currentMedia.tilt ?? -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: (currentMedia.tilt ?? -8) / 2,
            }}
            exit={{
              opacity: 0,
              y: 26,
              scale: 0.7,
              rotate: currentMedia.tilt ?? -8,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              mass: 0.6,
            }}
            className="pointer-events-none absolute bottom-[85%] left-1/2 z-20 block w-[clamp(9rem,18vw,15rem)] -translate-x-1/2 overflow-hidden rounded-xl border border-hq-red/40 bg-hq-panel shadow-[0_30px_70px_-25px_rgba(224,20,44,0.7)]"
          >
            <img
              src={currentMedia.src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />

            <span className="absolute inset-x-0 bottom-0 bg-hq-black/80 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-hq-red">
              {currentMedia.caption}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
