import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Step } from "../../data/steps";

type StepPanelProps = {
  step: Step;
  position: number;
  total: number;
};

export function StepPanel({ step, position, total }: StepPanelProps) {
  return (
    <div
      id="step-panel"
      role="tabpanel"
      aria-live="polite"
      className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0E0E0E] p-8 sm:p-12"
    >
      <span
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-hq-red opacity-[0.12] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex min-h-[360px] flex-col sm:min-h-[440px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-hq-red">
              Step {step.index}
            </span>

            <h3 className="mt-5 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-[2.75rem]">
              {step.title}
            </h3>

            <p className="mt-7 max-w-2xl text-base leading-[1.85] text-zinc-400 sm:text-lg">
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Position meter */}
        <div className="mt-auto pt-16">
          <div className="flex items-center gap-4">
            <span className="font-display text-xs font-semibold tracking-[0.18em] text-zinc-500">
              {step.index} / {String(total).padStart(2, "0")}
            </span>
            <span className="flex flex-1 gap-1.5" aria-hidden="true">
              {Array.from({ length: total }).map((_, i) => (
                <motion.span
                  key={i}
                  className="h-1 flex-1 rounded-full"
                  animate={{
                    backgroundColor:
                      i <= position
                        ? "rgba(255,0,0,1)"
                        : "rgba(255,255,255,0.12)",
                  }}
                  transition={{ duration: 0.35 }}
                />
              ))}
            </span>
          </div>
          <p className="mt-3 text-xs text-zinc-600">
            Keep scrolling to move through the process.
          </p>
        </div>
      </div>
    </div>
  );
}
