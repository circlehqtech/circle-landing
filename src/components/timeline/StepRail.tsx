import React from "react";
import { motion, type MotionValue } from "framer-motion";
import {
  RocketIcon,
  RouteIcon,
  SearchIcon,
  ShieldCheckIcon,
} from "lucide-react";
import type { Step } from "../../data/steps";

const icons = {
  discovery: SearchIcon,
  strategy: RouteIcon,
  build: ShieldCheckIcon,
  launch: RocketIcon,
};

type StepRailProps = {
  items: Step[];
  activeIndex: number;
  fill: MotionValue<string>;
  onSelect: (index: number) => void;
};

export function StepRail({
  items,
  activeIndex,
  fill,
  onSelect,
}: StepRailProps) {
  return (
    <div className="relative" role="tablist" aria-label="How we work">
      {/* Rail track */}
      <span
        aria-hidden="true"
        className="absolute bottom-7 left-[27px] top-7 w-px bg-white/[0.12]"
      />

      <motion.span
        aria-hidden="true"
        className="absolute left-[27px] top-7 w-px origin-top bg-hq-red shadow-[0_0_12px_rgba(255,0,0,0.9)]"
        style={{ height: fill }}
      />

      <ul className="relative flex flex-col gap-14 lg:gap-[4.5rem]">
        {items.map((step, i) => {
          const Icon = icons[step.icon];
          const active = i === activeIndex;
          const passed = i < activeIndex;

          return (
            <li key={step.id}>
              <button
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="step-panel"
                onClick={() => onSelect(i)}
                onFocus={() => onSelect(i)}
                className="group flex w-full items-center gap-5 rounded-xl pr-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-hq-red"
              >
                <motion.span
                  animate={{ scale: active ? 1.06 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                    active
                      ? "border-hq-red bg-[#160000] text-hq-red shadow-[0_0_24px_rgba(255,0,0,0.45)]"
                      : passed
                        ? "border-hq-red/40 bg-[#0F0F0F] text-hq-red/70"
                        : "border-white/10 bg-[#121212] text-zinc-500 group-hover:border-white/25"
                  }`}
                >
                  <Icon
                    className="h-5 w-5"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  {active && (
                    <motion.span
                      className="absolute inset-0 rounded-full border border-hq-red/50"
                      animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </motion.span>

                <span className="min-w-0">
                  <span
                    className={`block font-display text-[10px] font-semibold tracking-[0.22em] transition-colors duration-300 ${
                      active ? "text-hq-red" : "text-zinc-600"
                    }`}
                  >
                    STEP {step.index}
                  </span>
                  <span
                    className={`mt-0.5 block font-display text-base font-semibold tracking-tight transition-colors duration-300 ${
                      active
                        ? "text-white"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    {step.shortTitle}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
