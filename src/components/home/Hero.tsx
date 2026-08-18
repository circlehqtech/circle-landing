import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  MousePointerClickIcon,
} from "lucide-react";
import { CursorField } from "../common/CursorField";
import { MagneticButton } from "../common/MagneticButton";
import { HoverRevealWord, type RevealMedia } from "../common/HoverRevealWord";

type Word = {
  text: string;
  muted?: boolean;
  highlighted?: boolean;
  hoverable?: boolean;
  media?: RevealMedia | RevealMedia[];
};

const MEDIA = {
  orb: {
    src: "/8ddb7eec-73d5-4524-a4d4-d16ae945ad64.jpg",
    caption: "One HQ",
    tilt: -7,
  },
  systems: {
    src: "/3a189f97-4d04-43b7-ad66-524fad486114.jpg",
    caption: "AI Solutions",
    tilt: 6,
  },
  marketing: {
    src: "/0ebc1652-0ca4-4ab7-93ef-92e86aa33b02.jpg",
    caption: "Marketing Solutions",
    tilt: -9,
  },
  academy: {
    src: "/9676547c-bb5b-49a6-b12f-91640f0ea60b.jpg",
    caption: "Circle Academy",
    tilt: 8,
  },
} satisfies Record<string, RevealMedia>;

const LINE_ONE: Word[] = [{ text: "One" }, { text: "HQ.", media: MEDIA.orb }];

const LINE_TWO: Word[] = [
  { text: "Two", highlighted: true },
  { text: "Ways", highlighted: true },
  { text: "to", muted: true },
  { text: "Run", media: MEDIA.marketing },
  { text: "Your" },
  { text: "Business", media: MEDIA.systems },
  { text: "Smarter.", media: MEDIA.academy },
];

const PILLS = [
  { label: "AI Solutions", href: "/solutions" },
  { label: "Circle Academy", href: "/academy" },
];

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  let charCursor = 0;
  const nextIndex = (length: number) => {
    const start = charCursor;
    charCursor += length;
    return start;
  };

  return (
    <section
      id="top"
      ref={ref}
      data-sage-track="The pitch"
      className="hq-grain relative isolate flex min-h-svh w-full flex-col justify-end overflow-hidden pb-14 pt-32 sm:pb-20"
    >
      <motion.div style={{ scale: fieldScale }} className="absolute inset-0">
        <CursorField />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-hq-black [mask-image:linear-gradient(to_top,black,transparent)]" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-7xl px-5 sm:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-mute"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hq-red opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-hq-red" />
          </span>
          Circle HQ · Lagos, Nigeria
        </motion.p>

        <h1 className="font-display text-[13vw] font-semibold leading-[0.95] tracking-[-0.04em] sm:text-[9vw] lg:text-[6vw]">
          <span className="block">
            {LINE_ONE.map((word) => (
              <SplitWord
                key={word.text}
                word={word}
                startIndex={nextIndex(word.text.length)}
              />
            ))}
          </span>
          <span className="block">
            {LINE_TWO.map((word) => (
              <SplitWord
                key={word.text}
                word={word}
                startIndex={nextIndex(word.text.length)}
              />
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-hq-mute"
        >
          <MousePointerClickIcon size={13} className="text-hq-red" />
          Hover the underlined words
        </motion.p>

        <div className="mt-8 grid gap-10 border-t border-hq-line pt-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
            className="max-w-xl text-base leading-relaxed text-hq-mute sm:text-lg"
          >
            Circle HQ exists to make businesses run smarter. We build the
            systems and train the team who runs them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-start gap-6 lg:items-end"
          >
            <div className="flex flex-wrap gap-3">
              <MagneticButton
                href="/solutions"
                className="group inline-flex items-center gap-2 rounded-full bg-hq-red px-6 py-3 text-sm font-medium text-white"
              >
                Explore AI Solutions
                <ArrowRightIcon
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </MagneticButton>
              <MagneticButton
                href="/academy"
                strength={0.25}
                className="inline-flex items-center gap-2 rounded-full border border-hq-line px-6 py-3 text-sm text-white transition-colors duration-200 hover:border-hq-red hover:text-hq-red"
              >
                Explore Circle Academy
                <ArrowDownRightIcon size={16} />
              </MagneticButton>
            </div>

            <ul className="flex flex-wrap gap-2">
              {PILLS.map((pill) => (
                <li key={pill.label}>
                  <a
                    href={pill.href}
                    className="inline-block rounded-full border border-hq-line bg-white/[0.02] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-hq-mute transition-colors hover:border-hq-red/60 hover:text-white"
                  >
                    {pill.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function SplitWord({ word, startIndex }: { word: Word; startIndex: number }) {
  const colorClass = word.highlighted
    ? "text-hq-red"
    : word.muted
      ? "text-hq-mute"
      : "";

  const chars = (
    <span className={`inline-flex ${colorClass}`}>
      {word.text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="inline-block overflow-hidden pb-[0.06em]"
        >
          <motion.span
            initial={{ y: "115%", rotate: 6, opacity: 0 }}
            animate={{ y: "0%", rotate: 0, opacity: 1 }}
            transition={{
              delay: 0.2 + (startIndex + i) * 0.022,
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  );

  return (
    <span className="mr-[0.22em] inline-block">
      {word.hoverable || word.media ? (
        <HoverRevealWord media={word.media}>{chars}</HoverRevealWord>
      ) : (
        chars
      )}
    </span>
  );
}
