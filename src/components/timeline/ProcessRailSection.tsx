import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { StepRail } from "./StepRail";
import { StepPanel } from "./StepPanel";
import { steps } from "../../data/steps";

export function ProcessRailSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });
  const fill = useTransform(smooth, [0, 1], ["0%", "calc(100% - 56px)"]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      steps.length - 1,
      Math.max(0, Math.floor(value * steps.length)),
    );
    setActiveIndex((current) => (current === next ? current : next));
  });

  // Clicking a node scrolls to that step's slice of the track
  const goToStep = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const ratio = (index + 0.5) / steps.length;
    window.scrollTo({
      top: el.offsetTop + scrollable * ratio,
      behavior: "smooth",
    });
  };

  const active = steps[activeIndex];

  return (
    <section
      id="process-rail"
      aria-labelledby="process-rail-heading"
      className="relative w-full border-t border-white/[0.06] bg-[#050505]"
    >
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-80 w-[32rem] rounded-full bg-hq-red opacity-[0.09] blur-[130px]"
        aria-hidden="true"
      />

      <div
        ref={trackRef}
        style={{ height: `${steps.length * 85}vh` }}
        className="relative"
      >
        <div className="sticky top-0 flex min-h-screen items-center py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
                Our process
              </span>
              <h2
                id="process-rail-heading"
                className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl"
              >
                How we work
              </h2>
            </motion.header>

            <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <StepRail
                  items={steps}
                  activeIndex={activeIndex}
                  fill={fill}
                  onSelect={goToStep}
                />
              </div>

              <div className="lg:col-span-8">
                <StepPanel
                  step={active}
                  position={activeIndex}
                  total={steps.length}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
