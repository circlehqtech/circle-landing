import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { MagneticButton } from "../common/MagneticButton";
import { ArrowRightIcon } from "lucide-react";

interface WordItem {
  text: string;
  isRed?: boolean;
  isBold?: boolean;
}

const P1_WORDS: WordItem[] = [
  { text: "Coming" },
  { text: "from" },
  { text: "marketing," },
  { text: "we" },
  { text: "had" },
  { text: "a" },
  { text: "front-row" },
  { text: "seat" },
  { text: "to" },
  { text: "how" },
  { text: "companies" },
  { text: "operate." },
  { text: "We" },
  { text: "saw" },
  { text: "where" },
  { text: "time" },
  { text: "disappears," },
  { text: "what" },
  { text: "customers" },
  { text: "respond" },
  { text: "to," },
  { text: "and" },
  { text: "how" },
  { text: "much" },
  { text: "smoother" },
  { text: "things" },
  { text: "run" },
  { text: "when" },
  { text: "systems", isRed: true },
  { text: "support" },
  { text: "people" },
  { text: "instead" },
  { text: "of" },
  { text: "slowing" },
  { text: "them" },
  { text: "down." },
  { text: "Those" },
  { text: "years" },
  { text: "showed" },
  { text: "us" },
  { text: "that" },
  { text: "smart", isBold: true },
  { text: "people", isBold: true },
  { text: "are", isBold: true },
  { text: "not", isBold: true },
  { text: "the", isBold: true },
  { text: "problem.", isBold: true },
  { text: "Broken", isRed: true, isBold: true },
  { text: "systems", isRed: true, isBold: true },
  { text: "are.", isRed: true, isBold: true },
];

const P2_WORDS: WordItem[] = [
  { text: "Circle" },
  { text: "HQ" },
  { text: "started" },
  { text: "with" },
  { text: "the" },
  { text: "belief" },
  { text: "that" },
  { text: "tech" },
  { text: "should" },
  { text: "lighten" },
  { text: "the" },
  { text: "workload," },
  { text: "not" },
  { text: "add" },
  { text: "to" },
  { text: "it." },
  { text: "Today," },
  { text: "we" },
  { text: "work" },
  { text: "remotely" },
  { text: "with" },
  { text: "clients" },
  { text: "anywhere," },
  { text: "helping" },
  { text: "them" },
  { text: "automate" },
  { text: "routine" },
  { text: "tasks," },
  { text: "organise" },
  { text: "their" },
  { text: "processes," },
  { text: "and" },
  { text: "run" },
  { text: "more" },
  { text: "efficiently." },
  { text: "We" },
  { text: "build" },
  { text: "intelligent," },
  { text: "AI-driven" },
  { text: "systems" },
  { text: "that" },
  { text: "take" },
  { text: "on" },
  { text: "the" },
  { text: "heavy" },
  { text: "lifting," },
  { text: "so" },
  { text: "you" },
  { text: "can" },
  { text: "focus" },
  { text: "on" },
  { text: "the" },
  { text: "strategy" },
  { text: "and" },
  { text: "decisions" },
  { text: "that" },
  { text: "lead" },
  { text: "to" },
  { text: "growth." },
];

const P3_WORDS: WordItem[] = [
  { text: "If" },
  { text: "you" },
  { text: "are" },
  { text: "building" },
  { text: "something" },
  { text: "and" },
  { text: "want" },
  { text: "your" },
  { text: "systems" },
  { text: "to" },
  { text: "help" },
  { text: "you," },
  { text: "we" },
  { text: "would" },
  { text: "love" },
  { text: "to" },
  { text: "work" },
  { text: "with" },
  { text: "you." },
];

const ALL_WORDS = [...P1_WORDS, ...P2_WORDS, ...P3_WORDS];

function StoryWord({
  word,
  range,
  progress,
  extraClass = "",
}: {
  word: WordItem;
  range: [number, number];
  progress: MotionValue<number>;
  extraClass?: string;
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <span className={`inline-block mr-[0.28em] my-0.5 ${extraClass}`}>
      <motion.span
        style={{ opacity }}
        className={`${
          word.isRed
            ? "text-hq-red font-bold"
            : word.isBold
              ? "text-hq-ink font-bold"
              : "text-hq-ink/80 font-medium"
        }`}
      >
        {word.text}
      </motion.span>
    </span>
  );
}

export function OurStoryScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  });

  let currentIndex = 0;

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Paragraph 1 */}
      <p className="font-display text-xl sm:text-2xl font-bold leading-relaxed tracking-tight text-hq-ink">
        {P1_WORDS.map((w, i) => {
          const index = currentIndex++;
          const start = index / ALL_WORDS.length;
          const end = start + 1 / ALL_WORDS.length;
          return (
            <StoryWord
              key={`p1-${i}`}
              word={w}
              range={[start, end]}
              progress={scrollYProgress}
            />
          );
        })}
      </p>

      {/* Paragraph 2 */}
      <p className="text-base sm:text-lg leading-relaxed text-hq-ink/75 font-bold">
        {P2_WORDS.map((w, i) => {
          const index = currentIndex++;
          const start = index / ALL_WORDS.length;
          const end = start + 1 / ALL_WORDS.length;
          return (
            <StoryWord
              key={`p2-${i}`}
              word={w}
              range={[start, end]}
              progress={scrollYProgress}
            />
          );
        })}
      </p>

      {/* Paragraph 3 */}
      <p className="text-base sm:text-lg font-bold leading-relaxed text-hq-ink">
        {P3_WORDS.map((w, i) => {
          const index = currentIndex++;
          const start = index / ALL_WORDS.length;
          const end = start + 1 / ALL_WORDS.length;
          return (
            <StoryWord
              key={`p3-${i}`}
              word={w}
              range={[start, end]}
              progress={scrollYProgress}
            />
          );
        })}
      </p>

      {/* CTA Button */}
      <div className="pt-4">
        <MagneticButton
          href="/consultation"
          className="inline-flex items-center gap-2 rounded-full bg-hq-red px-7 py-3.5 text-sm font-medium text-white shadow-md hover:bg-hq-red-deep transition-all"
        >
          Talk to Us <ArrowRightIcon size={16} />
        </MagneticButton>
      </div>
    </div>
  );
}
