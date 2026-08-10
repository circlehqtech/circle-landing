import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RobotAvatar } from "./RobotAvatar";
import { TypingDots } from "./TypingDots";
import { AssistantBubble, type BubbleSide } from "./AssistantBubble";
import type { Problem } from "../../data/problems";

export type AssistantPhase = "idle" | "typing" | "answer";

type FloatingAssistantProps = {
  x: number;
  y: number;
  width: number;
  side: BubbleSide;
  phase: AssistantPhase;
  problem: Problem | null;
};

export function FloatingAssistant({
  x,
  y,
  width,
  side,
  phase,
  problem,
}: FloatingAssistantProps) {
  const active = phase !== "idle" && problem !== null;

  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 z-20 max-w-full"
      style={{ width }}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.9 }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <AssistantBubble side={side}>
          {/* Assistant identity row */}
          <div className="flex items-center gap-3 border-b border-black/[0.08] pb-3">
            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-black">
              <RobotAvatar awake size={30} />
            </span>
            <div className="min-w-0">
              <p className="font-display text-[13px] font-semibold leading-tight text-black">
                AI Assistant
              </p>
              <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-black/50">
                <motion.span
                  className="block h-1.5 w-1.5 rounded-full bg-hq-red"
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {active ? "Solving this now" : "Online"}
              </span>
            </div>
            {active && (
              <span className="ml-auto rounded-full bg-hq-red px-2 py-1 font-display text-[9px] font-bold uppercase tracking-[0.14em] text-white">
                Our fix
              </span>
            )}
          </div>

          {/* Message */}
          <div className="pt-3">
            <AnimatePresence mode="wait" initial={false}>
              {!active ? (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[13.5px] leading-relaxed text-black/70"
                >
                  Point at any problem below and I’ll show you exactly how we
                  fix it.
                </motion.p>
              ) : phase === "typing" ? (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <TypingDots />
                </motion.div>
              ) : (
                <motion.div
                  key={problem!.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="font-display text-[15px] font-semibold leading-snug text-black">
                    {problem!.fixLabel}
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-black/70">
                    {problem!.fix}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AssistantBubble>
      </motion.div>
    </motion.div>
  );
}
