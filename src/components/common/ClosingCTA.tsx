import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SplitHeading } from "./SplitHeading";

type CTAConfig = {
  tag: string;
  title: string;
  muted: string[];
  description: string;
  primaryBtn: { text: string; href: string };
  secondaryBtn: { text: string; href: string };
};

const PAGE_CONFIGS: Record<string, CTAConfig> = {
  "/academy": {
    tag: "CLOSING",
    title: "Tell us what your team — or you — need to learn.",
    muted: ["need", "to", "learn."],
    description:
      "Standard programmes, or fully customised to your duration, modules, format, and team size.",
    primaryBtn: { text: "Talk to us", href: "/consultation" },
    secondaryBtn: { text: "See what we build", href: "/solutions" },
  },
  "/solutions": {
    tag: "CLOSING",
    title: "Tell us where it hurts. We'll build the fix.",
    muted: ["We'll", "build", "the", "fix."],
    description:
      "Every build starts with a short, honest conversation about your operations — not a demo of ours.",
    primaryBtn: { text: "Book a consultation", href: "/consultation" },
    secondaryBtn: { text: "Train my team too", href: "/academy" },
  },
  "/about": {
    tag: "WORK WITH US",
    title: "Want your systems to help you?",
    muted: ["to", "help", "you?"],
    description:
      "Tell us what you're building and where it slows down. We'll tell you honestly whether AI is the right fix.",
    primaryBtn: { text: "Book a consultation", href: "/consultation" },
    secondaryBtn: { text: "See what we build", href: "/solutions" },
  },
  "/blog": {
    tag: "WORK WITH US",
    title: "Ready to build intelligent AI systems for your business?",
    muted: ["AI", "systems", "for", "your", "business?"],
    description:
      "Let's discuss your workflows and build custom automation that moves your business forward.",
    primaryBtn: { text: "Book a consultation", href: "/consultation" },
    secondaryBtn: { text: "See what we build", href: "/solutions" },
  },
  "/consultation": {
    tag: "EXPLORE",
    title: "Explore our solutions or read our insights.",
    muted: ["read", "our", "insights."],
    description:
      "Learn more about how our custom AI systems remove operational drag, or browse our latest field notes and articles.",
    primaryBtn: { text: "See what we build", href: "/solutions" },
    secondaryBtn: { text: "Read our blog", href: "/blog" },
  },
};

const DEFAULT_CONFIG: CTAConfig = {
  tag: "WORK WITH US",
  title: "Want your systems to help you?",
  muted: ["to", "help", "you?"],
  description:
    "Tell us what you're building and where it slows down. We'll tell you honestly whether AI is the right fix.",
  primaryBtn: { text: "Book a consultation", href: "/consultation" },
  secondaryBtn: { text: "See what we build", href: "/solutions" },
};

export function ClosingCTA() {
  const { pathname } = useLocation();
  const ref = useRef<HTMLElement | null>(null);

  const config = PAGE_CONFIGS[pathname] || DEFAULT_CONFIG;

  return (
    <section
      key={pathname}
      id="closing"
      ref={ref}
      className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="hq-grain relative overflow-hidden rounded-3xl border border-hq-line bg-hq-panel px-6 py-14 sm:px-14 sm:py-20 text-center shadow-2xl"
      >
        {/* Subtle glowing aura in background */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-hq-red/12 blur-[100px]"
        />

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red font-semibold">
            {config.tag}
          </p>

          <SplitHeading
            text={config.title}
            muted={config.muted}
            className="font-display text-3xl font-semibold leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl max-w-2xl mx-auto"
          />

          <p className="mt-6 text-sm sm:text-base leading-relaxed text-hq-mute max-w-xl mx-auto">
            {config.description}
          </p>

          {/* Buttons Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to={config.primaryBtn.href}
              className="inline-flex items-center gap-2 rounded-full bg-hq-red px-7 py-3.5 text-sm font-medium text-white shadow-lg hover:bg-hq-red-deep transition-all"
            >
              {config.primaryBtn.text} <ArrowRightIcon size={16} />
            </Link>
            <Link
              to={config.secondaryBtn.href}
              className="inline-flex items-center gap-2 rounded-full border border-hq-line bg-hq-black/60 px-7 py-3.5 text-sm font-medium text-white hover:border-hq-red transition-all"
            >
              {config.secondaryBtn.text} <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
