import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2Icon } from "lucide-react";
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
      className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0E0E0E] p-8 sm:p-12 shadow-2xl"
    >
      <span
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-hq-red opacity-[0.12] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex min-h-[360px] flex-col sm:min-h-[440px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-hq-red/40 bg-hq-red/10 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-hq-red">
              <span className="h-1.5 w-1.5 rounded-full bg-hq-red animate-pulse" />
              Step {step.index} // {step.shortTitle}
            </span>

            <h3 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-[2.75rem]">
              {step.title}
            </h3>

            <p className="max-w-2xl text-base leading-[1.85] text-zinc-400 sm:text-lg">
              {step.description}
            </p>

            {step.highlights && step.highlights.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-white/10">
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
                  Key Focus & Deliverables
                </p>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {step.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300"
                    >
                      <CheckCircle2Icon
                        size={16}
                        className="mt-0.5 shrink-0 text-hq-red"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Position meter */}
        <div className="mt-auto pt-10">
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
            Click any step on the left rail or scroll to explore the process.
          </p>
        </div>
      </div>
    </div>
  );
}
