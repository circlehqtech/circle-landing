import React, { useState } from "react";
import { motion } from "framer-motion";
import { StepCard } from "./StepCard";
import { StepConnector } from "./StepConnector";
import { steps } from "../../data/steps";

export function ProcessSection() {
  const [activeId, setActiveId] = useState(steps[0].id);
  const activeIndex = steps.findIndex((s) => s.id === activeId);

  return (
    <section
      id="how-we-work"
      aria-labelledby="process-heading"
      className="relative w-full overflow-hidden border-t border-white/[0.06] bg-[#0A0A0A] py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute left-1/4 top-1/3 h-72 w-[34rem] rounded-full bg-hq-red opacity-[0.08] blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"
        >
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red font-semibold"
            >
              Methodology & Process
            </motion.p>
            <h2
              id="process-heading"
              className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl"
            >
              How we work
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              From auditing operational friction to deploying self-sustaining AI
              systems. Clear milestones, complete transparency, zero guesswork
            </p>
          </div>
        </motion.header>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-9">
          {steps.map((step, i) => {
            const direction = i % 2 === 0 ? "down" : "up";
            return (
              <div
                key={step.id}
                className={`relative ${i % 2 === 1 ? "lg:mt-16" : ""}`}
              >
                <StepCard
                  step={step}
                  active={activeId === step.id}
                  onActivate={() => setActiveId(step.id)}
                />

                {i < steps.length - 1 && (
                  <StepConnector
                    direction={direction}
                    lit={activeIndex === i || activeIndex === i + 1}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
