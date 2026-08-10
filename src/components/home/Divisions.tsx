import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BotIcon,
  GraduationCapIcon,
  MegaphoneIcon,
  PlusIcon,
  BoxIcon,
  type LucideIcon,
} from "lucide-react";
import { SplitHeading } from "../common/SplitHeading";
import { Link } from "react-router-dom";

type Division = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  capabilities: string[];
  note?: string;
  link: string;
};

const DIVISIONS: Division[] = [
  {
    id: "ai-solutions",
    index: "01",
    title: "Circle AI Solutions",
    blurb:
      "Custom AI systems that remove the operational drag from growing businesses — built around the problem you actually have.",
    icon: BotIcon,
    capabilities: [
      "Chatbots",
      "CRM automation",
      "Live dashboards",
      "Workflow automation",
    ],
    link: "/solutions",
  },
  {
    id: "circle-academy",
    index: "02",
    title: "Circle Academy",
    blurb:
      "Practical AI training for professionals, teams, and organisations — from business literacy to building functioning AI agents.",
    icon: GraduationCapIcon,
    capabilities: [
      "AI business literacy",
      "Team workshops",
      "Agent building",
      "Org programmes",
    ],
    note: "Plus free outreach for secondary school students.",
    link: "/academy",
  },
  {
    id: "consultation",
    index: "03",
    title: "Consultation & Assessment",
    blurb:
      "Short, honest conversation to figure out whether AI is the right fix for what you are dealing with, and where to start.",
    icon: MegaphoneIcon,
    capabilities: [
      "Process audit",
      "Readiness assessment",
      "Roadmap design",
      "Implementation advice",
    ],
    link: "/consultation",
  },
];

export function Divisions() {
  return (
    <section
      id="divisions"
      className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mb-14 flex flex-col gap-6 border-b border-hq-line pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red"
          >
            The Two Sides of Circle HQ
          </motion.p>
          <SplitHeading
            text="Systems, workforce, and the intelligence behind both."
            muted={["and", "the", "intelligence", "behind", "both"]}
            className="max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl"
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-sm text-sm leading-relaxed text-hq-mute"
        >
          A system is only as good as the people running it. That's the sweet
          spot Circle HQ sits in — build the AI, then build the capability to
          run it.
        </motion.p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {DIVISIONS.map((division, i) => (
          <DivisionCard key={division.id} division={division} index={i} />
        ))}
      </div>
    </section>
  );
}

function DivisionCard({
  division,
  index,
}: {
  division: Division;
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const Icon = division.icon;
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), {
    stiffness: 180,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    px.set(nx);
    py.set(ny);
    el.style.setProperty("--mx", `${nx * 100}%`);
    el.style.setProperty("--my", `${ny * 100}%`);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    setHovered(false);
  };

  return (
    <motion.article
      ref={ref}
      id={division.id}
      data-sage-track={division.title}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-colors duration-300 [transform-style:preserve-3d] ${
        hovered
          ? "border-hq-red/60 bg-hq-panel"
          : "border-hq-line bg-white/[0.015]"
      }`}
    >
      {/* Cursor spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(224,20,44,0.16), transparent 70%)",
        }}
      />

      <div
        className="relative flex items-start justify-between"
        style={{ transform: "translateZ(30px)" }}
      >
        <span className="font-mono text-[11px] tracking-widest text-hq-mute">
          {division.index}
        </span>
        <motion.span
          animate={
            hovered ? { rotate: 90, scale: 1.06 } : { rotate: 0, scale: 1 }
          }
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ${
            hovered
              ? "border-hq-red bg-hq-red text-white"
              : "border-hq-line text-hq-mute"
          }`}
        >
          <Icon size={18} />
        </motion.span>
      </div>

      <h3
        className="relative mt-10 font-display text-2xl font-semibold tracking-tight text-white"
        style={{ transform: "translateZ(40px)" }}
      >
        {division.title}
      </h3>
      <p
        className="relative mt-3 text-sm leading-relaxed text-hq-mute"
        style={{ transform: "translateZ(20px)" }}
      >
        {division.blurb}
      </p>

      <ul
        className="relative mt-6 flex flex-wrap gap-2"
        style={{ transform: "translateZ(25px)" }}
      >
        {division.capabilities.map((cap, i) => (
          <motion.li
            key={cap}
            animate={hovered ? { y: -2 } : { y: 0 }}
            transition={{
              delay: i * 0.04,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="rounded-full border border-hq-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-hq-mute transition-colors duration-300 group-hover:border-hq-red/40 group-hover:text-white"
          >
            {cap}
          </motion.li>
        ))}
      </ul>

      {division.note && (
        <p className="relative mt-6 flex items-start gap-2 rounded-lg border border-hq-red/25 bg-hq-red/[0.06] p-3 text-xs leading-relaxed text-white/80">
          <PlusIcon size={14} className="mt-0.5 shrink-0 text-hq-red" />
          {division.note}
        </p>
      )}

      <div
        className="relative mt-auto pt-8"
        style={{ transform: "translateZ(30px)" }}
      >
        <Link
          to={division.link}
          className="inline-flex items-center gap-2 text-sm text-white hover:text-hq-red transition-colors"
        >
          <span className="h-px w-6 bg-hq-red transition-all duration-300 group-hover:w-12" />
          Learn More &rarr;
        </Link>
      </div>
    </motion.article>
  );
}
