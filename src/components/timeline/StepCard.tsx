import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRightIcon,
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

type StepCardProps = {
  step: Step;
  active: boolean;
  onActivate: () => void;
};

export function StepCard({ step, active, onActivate }: StepCardProps) {
  const Icon = icons[step.icon];

  return (
    <motion.button
      type="button"
      aria-pressed={active}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex h-full w-full flex-col rounded-2xl border p-5 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-hq-red lg:min-h-[290px] ${
        active
          ? "border-hq-red bg-[#111111] shadow-[0_24px_60px_-30px_rgba(255,0,0,0.8)]"
          : "border-white/[0.12] bg-[#0A0A0A] hover:border-white/25"
      }`}
    >
      {/* Corner badge, like the reference */}
      <motion.span
        className={`absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 ${
          active ? "bg-hq-red text-white" : "bg-[#1C1C1C] text-zinc-500"
        }`}
        animate={{ scale: active ? 1 : 0.9, rotate: active ? 0 : -15 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-hidden="true"
      >
        {active ? (
          <ArrowUpRightIcon className="h-4 w-4" />
        ) : (
          <Icon className="h-4 w-4" strokeWidth={1.6} />
        )}
      </motion.span>

      <span
        className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 font-display text-[10px] font-semibold tracking-[0.2em] transition-colors duration-300 ${
          active
            ? "border-hq-red/50 bg-hq-red/10 text-hq-red-bright"
            : "border-white/20 text-zinc-500"
        }`}
      >
        {step.index}
      </span>

      <h3 className="mt-5 font-display text-xl font-bold leading-snug tracking-tight text-white">
        {step.title}
      </h3>
      <p className="mt-2.5 text-sm font-medium leading-relaxed text-zinc-400">
        {step.description}
      </p>

      <span
        aria-hidden="true"
        className={`mt-auto block h-px w-full transition-colors duration-300 ${
          active ? "bg-hq-red/50" : "bg-transparent"
        }`}
      />
    </motion.button>
  );
}
