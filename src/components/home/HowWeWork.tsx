import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import {
  SearchIcon,
  MapIcon,
  ShieldCheckIcon,
  RocketIcon,
  CheckCircle2Icon,
  ArrowRightIcon,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

type Step = {
  id: string;
  stepNum: string;
  shortTitle: string;
  title: string;
  badge: string;
  desc: string;
  icon: LucideIcon;
  highlights: string[];
};

const STEPS: Step[] = [
  {
    id: "step-1",
    stepNum: "01",
    shortTitle: "Discovery & Assessment",
    title: "Step 1 — Discovery & Business Assessment",
    badge: "PHASE 01 // AUDIT",
    desc: "We start by understanding your business, not your tech stack. We find out where you currently stand and where AI can genuinely remove friction.",
    icon: SearchIcon,
    highlights: [
      "Operational friction audit & bottleneck mapping",
      "Process efficiency & time-loss evaluation",
      "AI readiness & feasibility assessment",
      "High-impact opportunity matrix",
    ],
  },
  {
    id: "step-2",
    stepNum: "02",
    shortTitle: "Strategy & Roadmap",
    title: "Step 2 — Strategy & Roadmap",
    badge: "PHASE 02 // BLUEPRINT",
    desc: "We map out exactly what should be built, in what order, and what it will take from your team to make it work.",
    icon: MapIcon,
    highlights: [
      "Bespoke system architecture blueprint",
      "Prioritized implementation roadmap",
      "Resource & team requirement breakdown",
      "Clear ROI & performance benchmarks",
    ],
  },
  {
    id: "step-3",
    stepNum: "03",
    shortTitle: "Build & Governance",
    title: "Step 3 — Build & Governance",
    badge: "PHASE 03 // ENGINEERING",
    desc: "We design and build with data privacy, compliance, and security built in from day one — not bolted on afterward.",
    icon: ShieldCheckIcon,
    highlights: [
      "Custom AI agent & workflow engine build",
      "Enterprise data privacy & encryption standards",
      "Strict schema validation & fallback security",
      "Rigorous pre-deployment testing suite",
    ],
  },
  {
    id: "step-4",
    stepNum: "04",
    shortTitle: "Launch & Support",
    title: "Step 4 — Launch & Support",
    badge: "PHASE 04 // DEPLOYMENT",
    desc: "We deploy, train your team, and stay on to make sure the system keeps delivering.",
    icon: RocketIcon,
    highlights: [
      "Seamless production deployment & integration",
      "Hands-on team training & capability building",
      "Continuous telemetry & performance monitoring",
      "Dedicated SLA support & system evolution",
    ],
  },
];

export function HowWeWork() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isClickingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isClickingRef.current) return;
    if (latest < 0.25) {
      setActiveIndex(0);
    } else if (latest < 0.5) {
      setActiveIndex(1);
    } else if (latest < 0.75) {
      setActiveIndex(2);
    } else {
      setActiveIndex(3);
    }
  });

  const handleStepClick = (idx: number) => {
    isClickingRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveIndex(idx);

    const el = containerRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const absoluteTop = rect.top + scrollTop;
      const scrollable = el.offsetHeight - window.innerHeight;
      const ratio = (idx + 0.5) / STEPS.length;
      window.scrollTo({
        top: absoluteTop + scrollable * ratio,
        behavior: "smooth",
      });
    }

    timerRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 800);
  };

  const activeStep = STEPS[activeIndex];

  return (
    <section
      id="how-we-work"
      ref={containerRef}
      data-sage-track="How We Work"
      className="relative h-[240vh] border-t border-hq-line bg-hq-black"
    >
      {/* Sticky Inner Container */}
      <div className="sticky top-20 flex min-h-[calc(100vh-5rem)] flex-col justify-center py-12">
        {/* Ambient Radial Backdrop Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hq-red/5 blur-[150px]"
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          {/* Header */}
          <div className="mb-10 max-w-2xl">
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red font-semibold"
            >
              How We Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl font-semibold text-white sm:text-5xl tracking-tight"
            >
              A clear four-step path from friction to flow.
            </motion.h2>
          </div>

          {/* Interactive Split Grid */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Timeline Navigation */}
            <div className="lg:col-span-5 relative pl-4 sm:pl-6">
              {/* Vertical Spine Line */}
              <div className="absolute left-[23px] sm:left-[31px] top-4 bottom-4 w-[2px] bg-hq-line" />
              
              {/* Active Spine Fill */}
              <motion.div
                className="absolute left-[23px] sm:left-[31px] top-4 w-[2px] bg-hq-red shadow-[0_0_12px_#e0142c] transition-all duration-500"
                style={{
                  height: `${(activeIndex / (STEPS.length - 1)) * 82 + 8}%`,
                }}
              />

              <div className="space-y-6 sm:space-y-8 relative z-10">
                {STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = activeIndex === idx;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => handleStepClick(idx)}
                      className={`group flex w-full items-center gap-4 text-left transition-all duration-300 cursor-pointer ${
                        isActive ? "opacity-100" : "opacity-45 hover:opacity-80"
                      }`}
                    >
                      {/* Node Icon Circle */}
                      <div
                        className={`relative flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                          isActive
                            ? "border-hq-red bg-hq-red text-white shadow-[0_0_25px_rgba(224,20,44,0.6)] scale-110"
                            : "border-hq-line bg-hq-panel text-hq-mute group-hover:border-white/30"
                        }`}
                      >
                        <Icon size={18} className="sm:text-xl" />
                        {isActive && (
                          <span className="absolute -inset-1.5 rounded-full border border-hq-red/40 animate-ping opacity-60" />
                        )}
                      </div>

                      {/* Step Text Label */}
                      <div className="flex flex-col">
                        <span
                          className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${
                            isActive ? "text-hq-red font-semibold" : "text-hq-mute"
                          }`}
                        >
                          {step.stepNum} // STEP
                        </span>
                        <span
                          className={`font-display text-base sm:text-lg font-medium transition-colors ${
                            isActive ? "text-white font-semibold" : "text-hq-mute"
                          }`}
                        >
                          {step.shortTitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Detailed Step Panel */}
            <div className="lg:col-span-7">
              <div className="relative min-h-[380px] overflow-hidden rounded-3xl border border-hq-line bg-hq-panel p-6 sm:p-10 shadow-2xl transition-all duration-500 hover:border-hq-red/40">
                {/* Panel Corner Accent */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-hq-red/10 blur-3xl" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative z-10 space-y-6"
                  >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-hq-red/40 bg-hq-red/10 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-hq-red">
                      <span className="h-1.5 w-1.5 rounded-full bg-hq-red animate-pulse" />
                      {activeStep.badge}
                    </div>

                    {/* Step Title */}
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-tight text-white">
                      {activeStep.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base sm:text-lg leading-relaxed text-hq-mute">
                      {activeStep.desc}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-3 pt-2 border-t border-hq-line/60">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                        Key Focus & Deliverables
                      </p>
                      <ul className="grid gap-2.5 sm:grid-cols-2">
                        {activeStep.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90"
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

                    {/* CTA link */}
                    <div className="pt-4 flex items-center justify-between">
                      <Link
                        to="/consultation"
                        className="inline-flex items-center gap-2 rounded-full bg-hq-red/15 border border-hq-red/40 px-5 py-2.5 text-xs font-mono font-medium text-white transition-colors hover:bg-hq-red hover:text-white"
                      >
                        Start this step <ArrowRightIcon size={14} />
                      </Link>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-hq-mute">
                        Step {activeStep.stepNum} of 04
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
