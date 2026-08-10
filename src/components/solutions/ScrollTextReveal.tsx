import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface WordProps {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
  isRed?: boolean;
}

function Word({ children, range, progress, isRed }: WordProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="relative inline-block mr-[0.3em] my-1">
      <motion.span
        style={{ opacity }}
        className={isRed ? "text-hq-red font-bold" : "text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function ScrollTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"],
  });

  const fullText = [
    { text: "Most" },
    { text: "businesses" },
    { text: "do" },
    { text: "not" },
    { text: "need" },
    { text: "more" },
    { text: "software." },
    { text: "They" },
    { text: "need" },
    { text: "the" },
    { text: "drag", isRed: true },
    { text: "removed", isRed: true },
    { text: "—" },
    { text: "the" },
    { text: "retyping," },
    { text: "the" },
    { text: "missed" },
    { text: "replies," },
    { text: "the" },
    { text: "numbers" },
    { text: "nobody" },
    { text: "can" },
    { text: "see." },
    { text: "We" },
    { text: "build" },
    { text: "the" },
    { text: "system," },
    { text: "and" },
    { text: "we" },
    { text: "train" },
    { text: "the" },
    { text: "people" },
    { text: "who" },
    { text: "keep" },
    { text: "it" },
    { text: "alive." },
  ];

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-5xl px-5 sm:px-8 py-32 sm:py-48 min-h-[75vh] flex flex-col justify-center text-left"
    >
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red font-semibold">
        WHY WE EXIST
      </p>

      <h2 className="font-display text-2xl sm:text-4xl font-semibold leading-[1.3] tracking-[-0.02em] flex flex-wrap text-white/20 select-none">
        {fullText.map((word, i) => {
          const start = i / fullText.length;
          const end = start + 1 / fullText.length;
          return (
            <Word
              key={i}
              range={[start, end]}
              progress={scrollYProgress}
              isRed={word.isRed}
            >
              {word.text}
            </Word>
          );
        })}
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-10 text-hq-mute text-sm sm:text-base max-w-xl text-left leading-relaxed"
      >
        We exist to help businesses run efficiently in a future of work where
        the winners are not the ones with the most tools, but the ones whose
        systems and people move without friction.
      </motion.p>
    </div>
  );
}
