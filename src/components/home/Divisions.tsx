import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BotIcon,
  GraduationCapIcon,
  type LucideIcon,
} from "lucide-react";
import { SplitHeading } from "../common/SplitHeading";
import { ScrollRevealText } from "../common/ScrollRevealText";
import { Link } from "react-router-dom";

type Division = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  image: string;
  capabilities: string[];
  ctaText: string;
  link: string;
};

const DIVISIONS: Division[] = [
  {
    id: "ai-solutions",
    index: "01",
    title: "Circle AI Solutions",
    blurb:
      "We build custom AI systems for your business — from customer-facing chat agents to internal reporting and workflow automation. We investigate where your business actually stands, then build what closes the gap.",
    icon: BotIcon,
    image: "/blog_ai_solutions_sphere.png",
    capabilities: [
      "Customer Chat Agents",
      "Internal Reporting",
      "Workflow Automation",
      "System Architecture",
    ],
    ctaText: "See What We Build →",
    link: "/solutions",
  },
  {
    id: "circle-academy",
    index: "02",
    title: "Circle Academy",
    blurb:
      "We train the people behind the systems — from full teams learning to work confidently alongside AI, to individuals learning to build AI agents from scratch.",
    icon: GraduationCapIcon,
    image: "/academy_workshop_training.png",
    capabilities: [
      "Team Upskilling",
      "Agent Engineering",
      "AI Business Literacy",
      "Cohort Training",
    ],
    ctaText: "See Our Training →",
    link: "/academy",
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
            text="Systems and the people who run them."
            muted={["and", "the", "people", "who", "run", "them."]}
            className="max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl"
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
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
    <Link
      to={division.link}
      aria-label={division.title}
      className="block group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-hq-red focus-visible:ring-offset-2 focus-visible:ring-offset-hq-black rounded-2xl h-full"
    >
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
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 sm:p-8 transition-colors duration-300 [transform-style:preserve-3d] cursor-pointer ${
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

        {/* Top Card Image Header */}
        <div
          className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-hq-line/80 bg-hq-black mb-6"
          style={{ transform: "translateZ(25px)" }}
        >
          <img
            src={division.image}
            alt={division.title}
            className="h-full w-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-95 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hq-panel via-hq-panel/30 to-transparent" />
          <div className="absolute top-3.5 left-3.5 font-mono text-[11px] font-bold tracking-widest text-white/90 bg-hq-black/80 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1">
            {division.index}
          </div>
          <div className="absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-hq-black/80 text-white backdrop-blur-md transition-colors duration-300 group-hover:border-hq-red group-hover:bg-hq-red">
            <Icon size={16} />
          </div>
        </div>

        <h3
          className="relative font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:text-hq-red transition-colors duration-200"
          style={{ transform: "translateZ(40px)" }}
        >
          {division.title}
        </h3>
        <p
          className="relative mt-3 text-sm sm:text-base leading-relaxed text-hq-mute"
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
              className="rounded-full border border-hq-line px-3.5 py-1 font-mono text-[10px] uppercase tracking-widest text-hq-mute transition-colors duration-300 group-hover:border-hq-red/40 group-hover:text-white"
            >
              {cap}
            </motion.li>
          ))}
        </ul>

        <div
          className="relative mt-auto pt-8"
          style={{ transform: "translateZ(30px)" }}
        >
          <span className="inline-flex items-center gap-2 font-medium text-sm text-white group-hover:text-hq-red transition-colors duration-200">
            <span className="h-px w-6 bg-hq-red transition-all duration-300 group-hover:w-10" />
            {division.ctaText}
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
