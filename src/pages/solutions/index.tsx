import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SplitHeading } from "../../components/common/SplitHeading";
import { MagneticButton } from "../../components/common/MagneticButton";
import { CursorField } from "../../components/common/CursorField";
import { ScrollTextReveal } from "../../components/solutions/ScrollTextReveal";
import {
  ArrowRightIcon,
  Building2Icon,
  ExternalLinkIcon,
  LayersIcon,
  MicIcon,
  RocketIcon,
  SearchIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react";
import { ProblemsSection } from "../../components/solutions/ProblemsSection";
import { ProcessSection } from "../../components/timeline/ProcessSection";

const STEPS = [
  {
    step: "01",
    phase: "DISCOVERY & AUDIT",
    title: "Discovery & Business Assessment",
    desc: "We start by understanding your business, not your tech stack. We find out exactly where you stand and where AI can genuinely remove friction — and where it can’t.",
    outcome: "Friction Map & Opportunity Matrix",
    icon: SearchIcon,
  },
  {
    step: "02",
    phase: "STRATEGY & ARCHITECTURE",
    title: "Strategy & System Roadmap",
    desc: "We map out exactly what should be built, in what order, and what it will take from your team. Clear specifications without vendor fluff.",
    outcome: "Architecture Blueprint & Scoping Brief",
    icon: LayersIcon,
  },
  {
    step: "03",
    phase: "ENGINEERING & GOVERNANCE",
    title: "Build & Security Governance",
    desc: "We design and build with data privacy, schema validation, enterprise compliance, and fallback security built in from day one.",
    outcome: "Production System & Schema Suite",
    icon: ShieldCheckIcon,
  },
  {
    step: "04",
    phase: "DEPLOYMENT & CAPABILITY",
    title: "Launch & Team Enablement",
    desc: "We deploy into your environment, train your team until they own the system, and stay on to monitor, optimize, and ensure long-term ROI.",
    outcome: "Team Mastery & Monitored Operations",
    icon: RocketIcon,
  },
];

const INDUSTRIES = [
  "Real Estate",
  "Oil & Gas",
  "Law Firms",
  "Consultancy",
  "Financial Services",
  "Insurance",
  "Travel",
  "Logistics & Transportation",
  "Importation & Trade",
  "Government",
  "Hospitality",
  "Beauty",
  "E-commerce",
];

const PRODUCTS = [
  {
    id: "restaurant-ai",
    number: "01",
    category: "Voice AI · Hospitality",
    name: "Circle Restaurant AI",
    headline: "Every call answered. Every order captured.",
    description:
      "An AI phone representative that answers menu questions, takes pickup or delivery orders, and confirms every detail without keeping customers waiting.",
    href: "https://circle-restaurant-ai.vercel.app/",
    icon: MicIcon,
  },
  {
    id: "circle-props",
    number: "02",
    category: "Operations OS · Real Estate",
    name: "Circle HQ Props",
    headline: "Every property operation, in one clear view.",
    description:
      "A secure, role-based workspace for managing client portfolios, collections, approvals, and estate delivery across a property business.",
    href: "https://circle-props.vercel.app/",
    icon: Building2Icon,
  },
] as const;

type ProductId = (typeof PRODUCTS)[number]["id"];

export function SolutionsPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pb-32">
        <CursorField theme="dark" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-hq-black to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Text */}
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red font-semibold"
              >
                Circle AI Solutions
              </motion.p>

              <SplitHeading
                text="Custom AI Business Solutions, Built For Where Your Business Actually Is."
                muted={[
                  "Built",
                  "For",
                  "Where",
                  "Your",
                  "Business",
                  "Actually",
                  "Is.",
                ]}
                className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl"
              />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: 0.15 }}
                className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-hq-mute"
              >
                We don't start with a product. We start with your business —
                where it stands today, where it's losing time, and where AI can
                genuinely fix it. From there, we build.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: 0.25 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <MagneticButton
                  href="/consultation#booking"
                  className="inline-flex items-center gap-2 rounded-full bg-hq-red px-7 py-3.5 text-sm font-medium text-white shadow-lg hover:bg-hq-red-deep transition-all"
                >
                  Book a Consultation <ArrowRightIcon size={16} />
                </MagneticButton>
                <MagneticButton
                  href="#products"
                  strength={0.2}
                  className="inline-flex items-center gap-2 rounded-full border border-hq-line bg-hq-panel/70 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-hq-red hover:text-hq-red"
                >
                  View Our Products <ArrowRightIcon size={16} />
                </MagneticButton>
                <div className="flex items-center gap-2 text-xs font-mono text-hq-mute">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Custom Integration & Automated Workflows
                </div>
              </motion.div>
            </div>

            {/* Right Visual Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="lg:col-span-5 relative"
            >
              <div className="relative group overflow-hidden rounded-3xl border border-hq-line bg-hq-panel p-2 shadow-2xl transition-all duration-500 hover:border-hq-red/50">
                {/* Image backdrop glow */}
                <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-hq-red/20 to-hq-red-deep/10 blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="relative overflow-hidden rounded-2xl border border-hq-line/80 bg-hq-black">
                  <img
                    src="/images/ai_solutions_hero.png"
                    alt="Circle AI Solutions Dashboard Interface"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-auto object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-hq-black/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-white shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-hq-red animate-ping" />
                    AI Operations System
                  </div>

                  <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-hq-panel/90 backdrop-blur-md px-4 py-2 text-xs font-mono text-white shadow-lg">
                    <ZapIcon size={14} className="text-hq-red" />
                    Zero Friction Automations
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We Exist with Scroll Text Reveal Animation */}
      <section className="border-y border-hq-line bg-hq-panel/40">
        <ScrollTextReveal />
      </section>

      {/* problems and fixes */}
      <ProblemsSection />

      {/* What We Build */}
      <section className="border-t border-hq-line bg-hq-panel/20 py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red font-semibold">
              What We Build
            </p>
            <h2 className="font-display text-3xl font-semibold text-white sm:text-5xl">
              Our Systems & Infrastructures
            </h2>
            <p className="mt-4 text-hq-mute text-base leading-relaxed">
              We do not work from a fixed list of offerings, because no two
              businesses need the same thing. We begin by investigating your
              business, identifying precisely where the friction lies, and
              building a solution to address it.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "24/7 Chat Agents",
                tag: "CONVERSATIONAL AI",
                image: "/blog_ai_solutions_sphere.png",
                desc: "Customer service and support agents that communicate naturally across WhatsApp, Instagram, and website.",
              },
              {
                title: "Reporting & BI Dashboards",
                tag: "DATA INTELLIGENCE",
                image: "/blog_marketing_chart.png",
                desc: "Real-time dashboards that replace manual monthly spreadsheet reporting with live operational visibility.",
              },
              {
                title: "Workflow Automation",
                tag: "PROCESS ORCHESTRATION",
                image: "/04142454-c400-4763-b6ad-67e42d6533fd.jpg",
                desc: "ERP-style automated systems that eliminate manual back-and-forth between departments.",
              },
              {
                title: "Onboarding Automation",
                tag: "CLIENT & TEAM FLOWS",
                image: "/academy_workshop_training.png",
                desc: "Structured flows bringing new clients, tenants, or staff to value faster and consistently.",
              },
              {
                title: "Revenue Tracking",
                tag: "FINANCIAL TELEMETRY",
                image: "/3d6765c2-4e61-4a52-9189-9e5cc900abba.jpg",
                desc: "Automated visibility into what is coming in, where, and when as it happens.",
              },
              {
                title: "Custom Systems",
                tag: "BESPOKE ENGINEERING",
                image: "/8ddb7eec-73d5-4524-a4d4-d16ae945ad64.jpg",
                desc: "Any other area where your business needs AI to accelerate results and remove operational drag.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-hq-line bg-hq-panel p-0 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-hq-red/60 hover:shadow-2xl hover:shadow-hq-red/10"
              >
                {/* Image Container with Blend Overlay Gradient */}
                <div className="relative aspect-[16/9] overflow-hidden bg-hq-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hq-panel via-hq-panel/40 to-transparent" />
                  <span className="absolute left-3.5 top-3.5 rounded-full border border-hq-red/40 bg-hq-black/60 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md shadow-md">
                    {item.tag}
                  </span>
                </div>

                {/* Text Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold text-white transition-colors group-hover:text-hq-red">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-hq-mute flex-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products in the field */}
      <section
        id="products"
        aria-labelledby="products-heading"
        className="relative overflow-hidden border-t border-hq-line bg-hq-black py-24 sm:py-32"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-hq-red/[0.08] blur-[120px]"
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end"
          >
            <div>
              <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-hq-red">
                Products in the field
              </p>
              <h2
                id="products-heading"
                className="max-w-3xl font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl"
              >
                Built by Circle HQ.{" "}
                <span className="text-hq-mute">Working in the real world.</span>
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-hq-mute sm:text-base lg:justify-self-end">
              These are live systems, designed around the people, workflows,
              and decisions inside real businesses — not off-the-shelf demos.
            </p>
          </motion.header>

          <div className="grid gap-6 lg:grid-cols-2">
            {PRODUCTS.map((product, index) => {
              const Icon = product.icon;

              return (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-hq-line bg-hq-panel shadow-2xl transition-colors duration-300 hover:border-hq-red/60 hover:shadow-[0_32px_90px_-40px_rgba(224,20,44,0.55)]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-10 top-0 z-20 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-hq-red to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <ProductPreview type={product.id} />

                  <div className="relative p-6 sm:p-8">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-hq-red/[0.07] blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hq-red/30 bg-hq-red/10 text-hq-red">
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-hq-red">
                            {product.category}
                          </p>
                          <h3 className="mt-1 font-display text-2xl font-semibold text-white">
                            {product.name}
                          </h3>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-hq-mute/60">
                        {product.number}
                      </span>
                    </div>

                    <p className="mt-6 font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
                      {product.headline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-hq-mute sm:text-base">
                      {product.description}
                    </p>

                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        "View " +
                        product.name +
                        " live (opens in a new tab)"
                      }
                      className="mt-8 flex min-h-12 w-full items-center justify-between border-t border-hq-line pt-5 text-sm font-semibold text-white transition-colors hover:text-hq-red focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hq-red"
                    >
                      <span className="flex items-center gap-2">
                        <span className="h-px w-5 bg-hq-red transition-all duration-300 group-hover:w-8" />
                        Explore live product
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-hq-line bg-hq-black text-hq-red transition-all duration-300 group-hover:border-hq-red group-hover:bg-hq-red group-hover:text-white">
                        <ExternalLinkIcon
                          size={15}
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology: How We Work - Timeline Animation Section */}
      <ProcessSection />

      {/* <section className="relative overflow-hidden py-24 sm:py-32 border-t border-hq-line bg-hq-black">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[800px] rounded-full bg-hq-red/5 blur-[120px]"
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red font-semibold"
            >
              Methodology & Process
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl font-semibold text-white sm:text-5xl tracking-tight"
            >
              How We Work: <span className="text-hq-red">The Timeline</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-hq-mute text-base sm:text-lg leading-relaxed"
            >
              From auditing operational friction to deploying self-sustaining AI
              systems. Clear milestones, complete transparency, zero guesswork.
            </motion.p>
          </div>

          <div className="relative mt-20">
            <div className="absolute top-[28px] left-[10%] right-[10%] hidden lg:block h-[2px] bg-hq-line z-0">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full origin-left bg-gradient-to-r from-hq-red via-hq-red-deep to-hq-red shadow-[0_0_12px_#e0142c]"
              />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative flex flex-col"
                  >
                    <div className="mb-8 flex items-center justify-center">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-hq-line bg-hq-panel text-white shadow-xl transition-all duration-500 group-hover:border-hq-red group-hover:bg-hq-red group-hover:shadow-[0_0_25px_#e0142c] group-hover:scale-110">
                        <Icon
                          size={22}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-hq-red font-mono text-[10px] font-bold text-white shadow-md">
                          {s.step}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col rounded-2xl border border-hq-line bg-hq-panel p-6 shadow-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:border-hq-red/50 group-hover:shadow-2xl group-hover:shadow-hq-red/10">
                      <h3 className="mt-4 font-display text-xl font-semibold text-white group-hover:text-hq-red transition-colors">
                        {s.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-hq-mute flex-1">
                        {s.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section> */}

      {/* Industries Covered */}
      <section className="bg-hq-panel/50 border-t border-hq-line py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red font-semibold">
            Industries Covered
          </p>
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl mb-8">
            Experience Across Key Sectors
          </h2>

          <div className="flex flex-wrap gap-3">
            {INDUSTRIES.map((ind) => (
              <span
                key={ind}
                className="rounded-full border border-hq-line bg-hq-black px-4 py-2 text-sm text-white/90"
              >
                {ind}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-hq-mute italic">
            *And pretty much every other industry — if you can't find yours on
            this list, get in touch.*
          </p>
        </div>
      </section>
    </div>
  );
}

function ProductPreview({ type }: { type: ProductId }) {
  const shouldReduceMotion = useReducedMotion();

  if (type === "restaurant-ai") {
    const waveHeights = [16, 28, 20, 34, 24, 14, 30, 22, 12];

    return (
      <div
        aria-hidden="true"
        className="relative aspect-[16/10] overflow-hidden border-b border-hq-line bg-[#f7f6f3] p-4 text-[#121216] sm:p-6"
      >
        <motion.span
          className="pointer-events-none absolute inset-y-0 z-10 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
          initial={{ x: "-180%" }}
          animate={shouldReduceMotion ? undefined : { x: "850%" }}
          transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 1.2 }}
        />
        <div className="flex items-center justify-between border-b border-black/10 pb-3">
          <span className="flex items-center gap-2 font-display text-sm font-extrabold">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-hq-red text-white">
              <MicIcon size={11} />
            </span>
            <span>
              <span className="text-hq-red">Circle</span> Restaurant AI
            </span>
          </span>
          <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest text-black/55">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              animate={
                shouldReduceMotion ? undefined : { opacity: [1, 0.3, 1] }
              }
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            Live
          </span>
        </div>

        <div className="grid h-[calc(100%-2.25rem)] grid-cols-[1.2fr_0.8fr] gap-3 pt-4 sm:gap-6 sm:pt-6">
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-hq-red sm:text-[10px]">
              AI phone representative
            </p>
            <p className="mt-2 max-w-xs font-display text-xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-3xl">
              Every call answered.
            </p>
            <div className="mt-5 flex h-9 items-center gap-1">
              {waveHeights.map((height, index) => (
                <motion.span
                  key={index}
                  className="w-1 rounded-full bg-hq-red/80 sm:w-1.5"
                  style={{ height }}
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          height: [height * 0.55, height, height * 0.7],
                          opacity: [0.45, 1, 0.65],
                        }
                  }
                  transition={{
                    duration: 1.1,
                    delay: index * 0.07,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-hq-red/15 bg-white shadow-[0_18px_45px_-24px_rgba(224,20,44,0.65)]">
            {[0, 0.65].map((delay) => (
              <motion.span
                key={delay}
                className="absolute h-16 w-16 rounded-full border border-hq-red/30 sm:h-24 sm:w-24"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { scale: [0.65, 1.65], opacity: [0.65, 0] }
                }
                transition={{
                  duration: 2.4,
                  delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
            <span className="absolute h-20 w-20 rounded-full bg-hq-red/15 blur-md sm:h-28 sm:w-28" />
            <motion.span
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-hq-red font-display text-sm font-bold text-white shadow-xl shadow-hq-red/30 sm:h-20 sm:w-20 sm:text-base"
              animate={
                shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }
              }
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              AI
            </motion.span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[16/10] overflow-hidden border-b border-hq-line bg-[#f7f6f3] p-3 text-[#121216] sm:p-5"
    >
      <div className="grid h-full grid-cols-[0.8fr_1.2fr] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
        <div className="relative flex flex-col justify-between overflow-hidden bg-hq-red p-4 text-white sm:p-6">
          <div>
            <span className="rounded-md bg-white px-2 py-1 font-display text-[9px] font-extrabold text-hq-red sm:text-xs">
              Circlehq
            </span>
            <p className="mt-3 font-mono text-[7px] font-semibold uppercase tracking-[0.18em] text-white/75 sm:text-[8px]">
              Secure staff access
            </p>
            <p className="mt-2 font-display text-base font-bold leading-[1.05] sm:text-xl">
              Every property operation, in one clear view.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[7px] text-white/80 sm:text-[9px]">
            <motion.span
              className="h-2 w-2 rounded-full bg-emerald-400"
              animate={
                shouldReduceMotion ? undefined : { opacity: [1, 0.35, 1] }
              }
              transition={{ duration: 1.7, repeat: Infinity }}
            />
            Systems available
          </div>
          <motion.span
            className="absolute -bottom-8 right-2 h-24 w-12 origin-bottom rounded-t-xl bg-black/10 sm:h-32 sm:w-16"
            initial={{ scaleY: 0.25 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="absolute -bottom-8 right-16 h-16 w-12 origin-bottom rounded-t-xl bg-black/10 sm:right-20 sm:h-24 sm:w-16"
            initial={{ scaleY: 0.2 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="relative overflow-hidden p-4 sm:p-6">
          <motion.span
            className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-hq-red/[0.07] to-transparent"
            initial={{ y: "-120%" }}
            animate={shouldReduceMotion ? undefined : { y: "420%" }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              repeatDelay: 0.7,
              ease: "linear",
            }}
          />
          <p className="font-mono text-[7px] font-bold uppercase tracking-[0.18em] text-hq-red sm:text-[9px]">
            Staff portal
          </p>
          <p className="mt-1 font-display text-base font-bold sm:text-xl">
            Choose your workspace
          </p>
          <div className="relative mt-4 grid grid-cols-2 gap-2">
            {["Executive", "Accounts", "Projects", "Client relations"].map(
              (role, index) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-2 rounded-lg border border-black/10 bg-white p-2 shadow-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-black/5 font-mono text-[8px] font-bold text-black/55">
                    0{index + 1}
                  </span>
                  <span className="truncate text-[7px] font-semibold sm:text-[9px]">
                    {role}
                  </span>
                </motion.span>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
