import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, TriangleAlertIcon } from "lucide-react";
import { ProblemIcon } from "./ProblemIcon";
import type { Problem } from "../../data/problems";

type ProblemTileProps = {
  problem: Problem;
  active: boolean;
  dimmed: boolean;
  solved: boolean;
  anchorRef: (el: HTMLElement | null) => void;
  onActivate: () => void;
  onRelease: () => void;
  className?: string;
};

export function ProblemTile({
  problem,
  active,
  dimmed,
  solved,
  anchorRef,
  onActivate,
  onRelease,
  className = "",
}: ProblemTileProps) {
  return (
    <motion.button
      ref={anchorRef as React.Ref<HTMLButtonElement>}
      type="button"
      aria-pressed={active}
      aria-label={`${problem.title} — summon the AI Assistant`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onMouseLeave={onRelease}
      onBlur={onRelease}
      onClick={onActivate}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-3xl border p-6 text-left outline-none transition-[transform,border-color,background-color,opacity] duration-300 focus-visible:ring-2 focus-visible:ring-hq-red ${
        active
          ? "-translate-y-1 border-hq-red/60 bg-[#111111]"
          : "border-white/[0.08] bg-[#0B0B0B] hover:border-hq-red/20"
      } ${dimmed ? "opacity-45" : "opacity-100"} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] transition-colors duration-300 ${
          active ? "bg-hq-red" : "bg-white/[0.07]"
        }`}
      />

      <div className="flex items-start justify-between gap-4">
        <ProblemIcon name={problem.icon} active={active} />
        <span className="font-display text-[10px] tracking-widest text-zinc-600">
          {problem.index}
        </span>
      </div>

      <span
        className={`mt-5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-500 ${
          solved
            ? "border-white/20 bg-white text-black"
            : "border-hq-red/30 bg-hq-red/10 text-hq-red"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {solved ? (
            <motion.span
              key="solved"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5"
            >
              <CheckIcon className="h-3 w-3" aria-hidden="true" />
              Solved by AI
            </motion.span>
          ) : (
            <motion.span
              key="problem"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5"
            >
              <TriangleAlertIcon className="h-3 w-3" aria-hidden="true" />
              Without AI
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-white">
        {problem.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {problem.description}
      </p>
    </motion.button>
  );
}
