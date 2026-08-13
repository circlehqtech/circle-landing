import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplitHeading } from "../../components/common/SplitHeading";
import { MagneticButton } from "../../components/common/MagneticButton";
import { CursorField } from "../../components/common/CursorField";
import { Link } from "react-router-dom";
import { CONSULTATION_PRICING } from "../../data/consultationPricing";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CheckIcon,
  HelpCircleIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  SendIcon,
  ShieldCheckIcon,
} from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Tell Us About Your Business",
    desc: "Team size, current tools, and the operational pain you’re feeling most — in your words, not a form full of jargon.",
  },
  {
    num: "02",
    title: "We Assess Your Readiness",
    desc: "We look at your existing processes and systems to understand what’s already working, what’s not, and where AI would make a real difference versus where it wouldn’t.",
  },
  {
    num: "03",
    title: "We Recommend a Path Forward",
    desc: "If you’re ready, we’ll outline what a system or training engagement could look like. If you’re not ready yet, we’ll tell you that too — and what to put in place first.",
  },
  {
    num: "04",
    title: "You Decide Whether to Move Forward",
    desc: "No pressure, no obligation. Some businesses are ready to build immediately. Others need a few things in place first. Either way, you leave the conversation with clarity.",
  },
];

const QUESTIONS = [
  "Are there tasks your team repeats manually, every single day, that follow the same steps each time?",
  "Do decisions get delayed because the numbers you need aren’t available when you need them?",
  "Are customer inquiries slipping through because no one’s available to respond fast enough?",
  "Is your onboarding process for new clients, tenants, or staff different every time, depending on who handles it?",
];

export function ConsultationPage() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [testComplete, setTestComplete] = useState(false);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [teamSize, setTeamSize] = useState("2–10");
  const [serviceType, setServiceType] = useState("Not sure yet");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const TEAM_SIZES = ["Just me", "2–10", "11–50", "50+"];
  const SERVICE_TYPES = ["AI Solutions", "Academy", "Both", "Not sure yet"];

  const toggleAnswer = (idx: number, val: boolean) => {
    setAnswers((prev) => ({ ...prev, [idx]: val }));
  };

  const yesCount = Object.values(answers).filter(Boolean).length;

  return (
    <div className="relative pb-24">
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-32 pb-20">
        <CursorField theme="dark" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-hq-black to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red"
          >
            Book a Consultation
          </motion.p>

          <SplitHeading
            text="Not Sure Where to Start? Let's Find Out Together."
            muted={["Let's", "Find", "Out", "Together."]}
            className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-hq-mute"
          >
            Before we build anything, we look at where your business actually
            stands. A consultation with Circle HQ isn't a sales call — it's a
            short, honest conversation to figure out whether AI is the right fix
            for what you're dealing with, and if so, where to start.
          </motion.p>
        </div>
      </section>

      {/* Readiness Check Quiz - Sticky Split Layout matching screenshot design */}
      <section id="readiness" className="py-24 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 items-start">
            {/* Left Sticky Header */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red font-semibold">
                Business Readiness Check
              </p>

              <SplitHeading
                text="Is your business ready for AI?"
                muted={["ready", "for", "AI?"]}
                className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl"
              />

              <p className="mt-6 max-w-md text-sm sm:text-base leading-relaxed text-hq-mute">
                A few honest questions worth asking yourself before you book.
              </p>
            </div>

            {/* Right Scrollable Column with Questions + Result Card */}
            <div className="space-y-4 sm:space-y-5">
              <div className="pt-2">
                <MagneticButton
                  href="/readiness"
                  className="inline-flex items-center gap-2 rounded-full bg-hq-red px-8 py-4 text-sm font-medium text-white shadow-lg hover:bg-hq-red-deep transition-all cursor-pointer"
                >
                  Test your AI readiness <ArrowRightIcon size={16} />
                </MagneticButton>
              </div>

              {/* WHAT THAT MEANS Result Card matching screenshot */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 rounded-3xl border border-hq-red/40 bg-hq-panel p-7 sm:p-9 shadow-2xl"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-hq-red font-semibold mb-3">
                  WHAT THAT MEANS
                </p>

                <p className="text-base sm:text-lg leading-relaxed text-white">
                  After you get your AI-Readiness score, a consultation with
                  Circle HQ gives you clarity on the next step. Whether or not
                  AI is the right fix for what you are dealing with, and if so
                  where to start.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 rounded-full bg-hq-red px-6 py-3.5 text-sm font-medium text-white shadow-md hover:bg-hq-red-deep transition-all"
                  >
                    Book a consultation <ArrowRightIcon size={16} />
                  </a>
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 rounded-full border border-hq-line bg-hq-black/50 px-6 py-3.5 text-sm font-medium text-white hover:border-hq-red transition-all"
                  >
                    Read our Blog first
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens When You Book - Circle HQ Sticky Split Layout */}
      <section className="border-y border-hq-line bg-hq-panel/30 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 items-start">
            {/* Left Sticky Header */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red">
                The Process
              </p>

              <SplitHeading
                text="What Happens When You Book."
                muted={["When", "You", "Book."]}
                className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl"
              />

              <p className="mt-6 max-w-md text-sm sm:text-base leading-relaxed text-hq-mute">
                Before we build anything, we look at where your business
                actually stands. A consultation with Circle HQ isn't a sales
                call — it's a short, honest conversation to figure out whether
                AI is the right fix for what you're dealing with, and if so,
                where to start.
              </p>

              <div className="mt-8 hidden lg:flex items-center gap-3 font-mono text-xs text-hq-mute/60">
                <span className="h-1.5 w-1.5 rounded-full bg-hq-red animate-pulse" />
                Scroll to explore each step of the journey
              </div>
            </div>

            {/* Right Scrollable Cards Column */}
            <div className="space-y-6 sm:space-y-8">
              {STEPS.map((s, idx) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-hq-line bg-hq-panel/50 p-8 sm:p-9 transition-all duration-300 hover:border-hq-red/40 hover:bg-hq-panel"
                >
                  <div className="flex items-center justify-between border-b border-hq-line/60 pb-4 mb-5">
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest text-hq-red flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-hq-red" />
                      Step {s.num}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-hq-mute/50">
                      0{idx + 1} / 04
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-hq-red">
                    {s.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-hq-mute">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section - Refined 2-column layout matching design images */}
      <section
        id="booking"
        className="border-t border-hq-line bg-hq-black py-24 sm:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="hq-grain relative overflow-hidden rounded-3xl border border-hq-line bg-hq-panel p-8 sm:p-14 shadow-2xl">
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              {/* Left Column: Address, Contact Info & Office Hours */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red font-semibold">
                    BOOK YOUR CONSULTATION
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-white">
                    Let's Start a Conversation
                  </h2>
                </div>

                {/* Find Us Block */}
                <div className="rounded-2xl border border-hq-line bg-hq-black/60 p-6 space-y-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-hq-red font-semibold">
                    FIND US
                  </p>
                  <div className="space-y-3.5 text-sm sm:text-base">
                    <div className="flex items-center gap-3 text-white/90">
                      <MailIcon size={18} className="shrink-0 text-hq-red" />
                      <a
                        href="mailto:hello@circlehqcompany.com"
                        className="hover:text-hq-red transition-colors"
                      >
                        hello@circlehqcompany.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                      <PhoneIcon size={18} className="shrink-0 text-hq-red" />
                      <a
                        href="tel:+2348000000000"
                        className="hover:text-hq-red transition-colors"
                      >
                        +234 800 000 0000
                      </a>
                    </div>
                  </div>
                </div>

                {/* Office Hours Block */}
                {/* <div className="rounded-2xl border border-hq-line bg-hq-black/60 p-6 space-y-2.5">
                  <h3 className="font-display text-xl font-semibold text-white">
                    Office hours
                  </h3>
                  <p className="text-sm leading-relaxed text-hq-mute">
                    Monday to Friday, 9am – 6pm WAT. Academy cohort sessions run
                    Tuesday and Thursday evenings plus Saturday mornings.
                  </p>
                </div> */}
              </div>

              {/* Right Column: Form Controls */}
              <div className="lg:col-span-7">
                {formSubmitted ? (
                  <div className="rounded-2xl border border-hq-red/40 bg-hq-black/80 p-8 text-center sm:p-12 space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-hq-red text-white mx-auto">
                      <CheckIcon size={24} />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-white">
                      Consultation Request Received
                    </h3>
                    <p className="text-sm text-hq-mute max-w-md mx-auto">
                      Thank you{formName ? `, ${formName}` : ""}. We have
                      received your details and will get back to you within 24
                      hours.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const tier =
                        CONSULTATION_PRICING[teamSize] ||
                        CONSULTATION_PRICING["2–10"];
                      if (tier?.paystackUrl) {
                        window.open(
                          tier.paystackUrl,
                          "_blank",
                          "noopener,noreferrer",
                        );
                      }
                      setFormSubmitted(true);
                    }}
                    className="space-y-6"
                  >
                    {/* Name, Email & Company inputs (disabled) */}
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-hq-mute mb-2">
                          YOUR NAME
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Ada Obi"
                          className="w-full rounded-xl border border-hq-line bg-hq-black px-4 py-3 text-sm text-white placeholder:text-hq-mute/50 outline-none focus:border-hq-red transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-hq-mute mb-2">
                          WORK EMAIL
                        </label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full rounded-xl border border-hq-line bg-hq-black px-4 py-3 text-sm text-white placeholder:text-hq-mute/50 outline-none focus:border-hq-red transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-hq-mute mb-2">
                          COMPANY NAME
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Acme Corp"
                          className="w-full rounded-xl border border-hq-line bg-hq-black px-4 py-3 text-sm text-white placeholder:text-hq-mute/50 outline-none focus:border-hq-red transition-colors"
                        />
                      </div>
                    </div>

                    {/* Team Size Pills */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-hq-mute mb-2.5">
                        TEAM SIZE
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {Object.keys(CONSULTATION_PRICING).map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setTeamSize(size)}
                            className={`rounded-full px-5 py-2 text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                              teamSize === size
                                ? "bg-hq-red text-white shadow-md shadow-hq-red/30"
                                : "border border-hq-line bg-hq-black/60 text-hq-mute hover:border-white/40 hover:text-white"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* What Are You After Pills */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-hq-mute mb-2.5">
                        WHAT ARE YOU AFTER?
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {SERVICE_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setServiceType(type)}
                            className={`rounded-full px-5 py-2 text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                              serviceType === type
                                ? "bg-hq-red text-white shadow-md shadow-hq-red/30"
                                : "border border-hq-line bg-hq-black/60 text-hq-mute hover:border-white/40 hover:text-white"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Textarea */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-hq-mute mb-2">
                        WHERE DOES IT HURT MOST?
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="We re-enter every order by hand, and nobody sees the numbers until month end..."
                        className="w-full rounded-xl border border-hq-line bg-hq-black px-4 py-3.5 text-sm text-white placeholder:text-hq-mute/50 outline-none focus:border-hq-red transition-colors"
                      />
                    </div>

                    {/* Submit button & note */}
                    <div className="flex flex-col gap-3 pt-2">
                      <MagneticButton
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-hq-red px-8 py-4 text-sm font-medium text-white shadow-lg hover:bg-hq-red-deep transition-all cursor-pointer"
                      >
                        Get your business started (
                        {CONSULTATION_PRICING[teamSize]?.formattedPrice ||
                          "₦100,000"}
                        ) <ArrowRightIcon size={16} />
                      </MagneticButton>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
