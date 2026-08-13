import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import { ProblemTile } from "./ProblemTile";
import { FloatingAssistant, type AssistantPhase } from "./FloatingAssistant";
import type { BubbleSide } from "./AssistantBubble";
import { useAnchors } from "../../hooks/useAnchors";
import { problems } from "../../data/problems";

const PANEL_W = 350;
const GAP = 24;
const HOME = "__home";

export function ProblemsSection() {
  const { containerRef, register, rects, size } = useAnchors();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [phase, setPhase] = useState<AssistantPhase>("idle");

  useEffect(() => {
    if (!activeId) {
      setPhase("idle");
      return;
    }
    setPhase("typing");
    const timer = window.setTimeout(() => setPhase("answer"), 800);
    return () => window.clearTimeout(timer);
  }, [activeId]);

  const active = problems.find((p) => p.id === activeId) ?? null;
  const panelWidth = Math.min(PANEL_W, size.width || PANEL_W);

  const position = useMemo<{ x: number; y: number; side: BubbleSide }>(() => {
    const home = rects[HOME];
    const parked: { x: number; y: number; side: BubbleSide } = home
      ? { x: home.left, y: home.top, side: "left" }
      : { x: Math.max(0, size.width - panelWidth), y: 0, side: "left" };

    if (!activeId) return parked;
    const rect = rects[activeId];
    if (!rect) return parked;

    const stacked = size.width < 900;
    if (stacked) {
      const x = Math.min(
        Math.max(rect.left + rect.width / 2 - panelWidth / 2, 0),
        Math.max(size.width - panelWidth, 0),
      );
      return { x, y: rect.top + rect.height - 24, side: "left" };
    }

    const rightX = rect.left + rect.width + GAP;
    const fitsRight = rightX + panelWidth <= size.width;
    const x = fitsRight ? rightX : Math.max(rect.left - panelWidth - GAP, 0);
    return { x, y: rect.top + 18, side: fitsRight ? "left" : "right" };
  }, [activeId, rects, size.width, panelWidth]);

  return (
    <section
      id="problems"
      aria-labelledby="problems-heading"
      className="relative w-full overflow-hidden bg-[#050505] py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-6 h-80 w-152 rounded-full bg-hq-red opacity-[0.13] blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={containerRef} className="relative">
          {/* Header, with the assistant parked in the column beside it */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <motion.header
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red font-semibold">
                THE PROBLEMS WE SOLVE
              </p>

              <h2
                id="problems-heading"
                className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl"
              >
                This is business without AI.
                <span className="block text-zinc-600">
                  Ask the assistant for the fix.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
                Every problem below is a cost you’re already paying. Hover or
                tap one and CircleHQ’s assistant answers with the exact system
                we’d put in its place.
              </p>
            </motion.header>

            {/* Reserved home slot for the parked assistant */}
            <div
              ref={register(HOME)}
              aria-hidden="true"
              className="h-[210px] w-full lg:col-span-5 lg:justify-self-end"
              style={{ maxWidth: PANEL_W }}
            />
          </div>

          {/* Problems - One Column on Left, AI Assistant on Right */}
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            <div
              className="space-y-5 lg:col-span-7"
              onMouseLeave={() => setActiveId(null)}
            >
              {problems.map((problem) => (
                <ProblemTile
                  key={problem.id}
                  problem={problem}
                  active={activeId === problem.id}
                  dimmed={activeId !== null && activeId !== problem.id}
                  solved={activeId === problem.id && phase === "answer"}
                  anchorRef={register(problem.id)}
                  onActivate={() => setActiveId(problem.id)}
                  onRelease={() =>
                    setActiveId((current) =>
                      current === problem.id ? null : current,
                    )
                  }
                />
              ))}
            </div>
          </div>

          <FloatingAssistant
            x={position.x}
            y={position.y}
            width={panelWidth}
            side={position.side}
            phase={phase}
            problem={active}
          />
        </div>
      </div>
    </section>
  );
}
