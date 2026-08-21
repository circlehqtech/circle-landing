import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { SplitHeading } from "../../components/common/SplitHeading";
import { MagneticButton } from "../../components/common/MagneticButton";
import { CursorField } from "../../components/common/CursorField";
import {
  ArrowRightIcon,
  Building2Icon,
  LockKeyholeIcon,
  MicIcon,
  SparklesIcon,
  WalletIcon,
} from "lucide-react";
import {
  ProductAccessDialog,
  type ProductAccessProduct,
} from "../../components/solutions/ProductAccessDialog";

const PRODUCTS = [
  {
    id: "restaurant-ai",
    number: "01",
    category: "Voice AI · Hospitality",
    name: "Circle Restaurant AI",
    headline: "Every call answered. Every order captured.",
    description:
      "An AI phone representative that answers menu questions, takes pickup or delivery orders, and confirms every detail without keeping customers waiting.",
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
    icon: Building2Icon,
  },
  {
    id: "circle-pay",
    number: "03",
    category: "FinTech AI · Payments",
    name: "CirclePay AI",
    headline: "Your money, one conversation away.",
    description:
      "A conversational financial assistant that checks balances, tracks spending insights, manages beneficiaries, and handles safe money transfers.",
    icon: WalletIcon,
  },
] as const;

type ProductId = (typeof PRODUCTS)[number]["id"];

const CAPABILITIES = [
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
];

export function AllSolutionsPage() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedProduct, setSelectedProduct] =
    useState<ProductAccessProduct | null>(null);

  return (
    <div className="relative bg-hq-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden pt-32 pb-20 border-b border-hq-line">
        <CursorField theme="dark" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-hq-black to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-hq-red/30 bg-hq-red/[0.08] px-3.5 py-1.5 font-mono text-xs text-hq-red font-semibold"
            >
              <SparklesIcon size={14} /> Live Products &amp; Built Solutions
            </motion.p>

            <SplitHeading
              text="Solutions Built by Circle HQ. Operating in the Real World."
              muted={["Operating", "in", "the", "Real", "World."]}
              mutedClassName="text-hq-red"
              className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-hq-mute"
            >
              Explore live systems built by Circle HQ — designed around the
              people, workflows, and decisions inside real businesses.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Solutions Section */}
      <main className="py-20 space-y-24">
        {/* Section 1: Live Products in the Field */}
        <section className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-hq-red">
              LIVE PRODUCTS
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              Products Built by Circle HQ
            </h2>
            <p className="mt-2 text-hq-mute text-base max-w-xl">
              Live operational systems designed and deployed for real business
              environments.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {PRODUCTS.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl border border-hq-line bg-hq-panel shadow-2xl transition-all duration-300 hover:border-hq-red/60"
                >
                  <ProductPreview type={product.id} />

                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hq-red/30 bg-hq-red/10 text-hq-red">
                          <Icon size={20} />
                        </span>
                        <div>
                          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-hq-red">
                            {product.category}
                          </p>
                          <h3 className="mt-0.5 font-display text-2xl font-bold text-white">
                            {product.name}
                          </h3>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-hq-mute">
                        {product.number}
                      </span>
                    </div>

                    <p className="mt-5 font-display text-xl font-bold text-white">
                      {product.headline}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-hq-mute">
                      {product.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      aria-label={"Request access to explore " + product.name}
                      className="mt-8 flex min-h-12 w-full items-center justify-between border-t border-hq-line pt-5 text-sm font-semibold text-white transition-colors hover:text-hq-red focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hq-red cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="h-px w-5 bg-hq-red transition-all duration-300 group-hover:w-8" />
                        Request access to explore
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-hq-line bg-hq-black text-hq-red transition-all duration-300 group-hover:border-hq-red group-hover:bg-hq-red group-hover:text-white">
                        <LockKeyholeIcon size={15} aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* Section 2: What We Build (Solution Capabilities) */}
        <section className="mx-auto w-full max-w-7xl px-5 sm:px-8 border-t border-hq-line pt-20">
          <div className="mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-hq-red">
              CAPABILITIES &amp; INFRASTRUCTURES
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              Systems We Architect
            </h2>
            <p className="mt-2 text-hq-mute text-base max-w-xl">
              We investigate your business, identify where friction lies, and
              build custom solution architectures to eliminate it.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((item) => (
              <div
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-hq-line bg-hq-panel p-0 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-hq-red/60 hover:shadow-2xl hover:shadow-hq-red/10"
              >
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
        </section>

        {/* Section 3: Closing Consultation CTA */}
        <section className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="rounded-3xl border border-hq-line bg-hq-panel p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-[600px] rounded-full bg-hq-red/10 blur-[100px]" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block rounded-full bg-hq-red/10 border border-hq-red/30 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-hq-red mb-4">
                CUSTOM AI ARCHITECTURE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Ready to build smart systems for your team?
              </h2>
              <p className="mt-4 text-hq-mute text-base sm:text-lg leading-relaxed">
                Tell us where your operational drag is, and we will architect a
                custom system for your business.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton
                  href="/consultation#booking"
                  className="inline-flex items-center gap-2 rounded-full bg-hq-red px-8 py-4 text-sm font-semibold text-white shadow-xl hover:bg-hq-red-deep transition-all"
                >
                  Book a Consultation <ArrowRightIcon size={16} />
                </MagneticButton>
                <Link
                  to="/readiness"
                  className="inline-flex items-center gap-2 rounded-full border border-hq-line bg-hq-black px-7 py-4 text-sm font-semibold text-white hover:border-hq-red transition-colors"
                >
                  Take AI Readiness Check
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Access Dialog Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductAccessDialog
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
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
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live System
          </span>
        </div>

        <div className="grid h-[calc(100%-2.25rem)] grid-cols-[1.2fr_0.8fr] gap-3 pt-4 sm:gap-6 sm:pt-6">
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-hq-red sm:text-[10px]">
              AI Phone Representative
            </p>
            <p className="mt-2 max-w-xs font-display text-xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-3xl">
              Every call answered.
            </p>
            <div className="mt-5 flex h-9 items-center gap-1">
              {waveHeights.map((height, index) => (
                <span
                  key={index}
                  className="w-1 rounded-full bg-hq-red/80 sm:w-1.5"
                  style={{ height }}
                />
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-hq-red/15 bg-white shadow-lg">
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-hq-red font-display text-sm font-bold text-white shadow-xl sm:h-20 sm:w-20 sm:text-base">
              AI
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "circle-pay") {
    return (
      <div
        aria-hidden="true"
        className="relative aspect-[16/10] overflow-hidden border-b border-hq-line bg-[#0c0d12] p-4 text-white sm:p-6"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="flex items-center gap-2 font-display text-sm font-extrabold">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-hq-red text-white">
              <WalletIcon size={11} />
            </span>
            <span>
              <span className="text-hq-red">CirclePay</span> AI
            </span>
          </span>
          <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Financial Agent
          </span>
        </div>

        <div className="grid h-[calc(100%-2.25rem)] grid-cols-[1.1fr_0.9fr] gap-3 pt-4 sm:gap-6 sm:pt-5">
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-hq-red sm:text-[10px]">
              Sandbox Account
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold tracking-tight sm:text-3xl text-white">
              ₦1,450,000
              <span className="text-xs text-white/50 font-normal">.00</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Balance Inquiry", "Spending Insights", "Safe Transfers"].map(
                (action) => (
                  <span
                    key={action}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[8px] text-hq-mute"
                  >
                    {action}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs">
            <p className="font-mono text-[8px] font-semibold text-hq-red uppercase tracking-wider">
              Conversational Prompt
            </p>
            <p className="mt-1 font-medium text-white/90 text-[11px] leading-snug">
              "Send ₦20,000 to Sarah for design work"
            </p>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5 font-mono text-[9px] text-emerald-300">
              <span>Tool Call Verified</span>
              <span>✓ Paystack</span>
            </div>
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
              Secure Operations Workspace
            </p>
            <p className="mt-2 font-display text-base font-bold leading-[1.05] sm:text-xl">
              Circle HQ Props
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden p-4 sm:p-6">
          <p className="font-mono text-[7px] font-bold uppercase tracking-[0.18em] text-hq-red sm:text-[9px]">
            Staff Portal
          </p>
          <p className="mt-1 font-display text-base font-bold sm:text-xl">
            Role-Based Access
          </p>
          <div className="relative mt-4 grid grid-cols-2 gap-2">
            {["Executive", "Accounts", "Projects", "Relations"].map(
              (role, index) => (
                <span
                  key={role}
                  className="flex items-center gap-2 rounded-lg border border-black/10 bg-white p-2 shadow-sm"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-black/5 font-mono text-[8px] font-bold">
                    0{index + 1}
                  </span>
                  <span className="truncate text-[8px] font-semibold">
                    {role}
                  </span>
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
