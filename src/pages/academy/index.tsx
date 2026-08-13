import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SplitHeading } from "../../components/common/SplitHeading";
import { MagneticButton } from "../../components/common/MagneticButton";
import { ContactCTA } from "../../components/home/ContactCTA";
import { CursorField } from "../../components/common/CursorField";
import {
  ArrowRightIcon,
  DownloadIcon,
  HeartIcon,
  CameraIcon,
  Building2Icon,
  UserIcon,
  CheckIcon,
  GraduationCapIcon,
  WifiOffIcon,
} from "lucide-react";

const BUSINESS_TOPICS = [
  "Introduction to AI — what it is, what it isn’t, and why it matters now",
  "Ethical AI — bias, fairness, and responsible use in organisations",
  "AI tools for daily productivity — ChatGPT, Copilot, and more.",
  "Spotting AI opportunities within your own role and department",
  "AI in Nigerian business — real examples across key industries",
  "Data privacy — what every staff member needs to know",
  "AI for customer service, communication, and team coordination",
  "Hands-on practical session — live tools, prompting, and Q&A",
];

const INTENSITY_TIERS = [
  {
    name: "Fast-Track",
    durationLabel: "ONE MONTH",
    desc: "High-pace and live-led. Best for self-starters with some prior AI exposure.",
  },
  {
    name: "Standard",
    durationLabel: "TWO MONTHS",
    desc: "Balanced pace with deeper coverage and regular feedback. Recommended for most participants.",
  },
  {
    name: "Deep-Dive",
    durationLabel: "THREE MONTHS",
    desc: "Extended practicals, portfolio-grade builds, and individual mentorship — for those who want to come out job- or client-ready.",
  },
];

import aca2938 from "../../assets/aca-image/IMG_2938.webp";
import aca2940 from "../../assets/aca-image/IMG_2940.webp";
import aca2960 from "../../assets/aca-image/IMG_2960.webp";
import aca2962 from "../../assets/aca-image/IMG_2962.webp";
import aca2975 from "../../assets/aca-image/IMG_2975.webp";
import aca2980 from "../../assets/aca-image/IMG_2980.webp";
import aca2984 from "../../assets/aca-image/IMG_2984.webp";
import aca2986 from "../../assets/aca-image/IMG_2986.webp";
import aca3017 from "../../assets/aca-image/IMG_3017.webp";
import aca3039 from "../../assets/aca-image/IMG_3039.webp";
import aca3051 from "../../assets/aca-image/IMG_3051.webp";
import aca3060 from "../../assets/aca-image/IMG_3060.webp";
import aca3076 from "../../assets/aca-image/IMG_3076.webp";
import aca3078 from "../../assets/aca-image/IMG_3078.webp";
import aca3085 from "../../assets/aca-image/IMG_3085.webp";
import aca3087 from "../../assets/aca-image/IMG_3087.webp";
import aca3156 from "../../assets/aca-image/IMG_3156.webp";
import aca3163 from "../../assets/aca-image/IMG_3163.webp";
import aca3168 from "../../assets/aca-image/IMG_3168.webp";
import aca3171 from "../../assets/aca-image/IMG_3171.webp";
import aca3174 from "../../assets/aca-image/IMG_3174.webp";
import aca3177 from "../../assets/aca-image/IMG_3177.webp";
import aca3178 from "../../assets/aca-image/IMG_3178.webp";
import aca3190 from "../../assets/aca-image/IMG_3190.webp";

type Shot = { src: string; label: string };

const ROW_ONE: Shot[] = [
  { src: aca2938, label: "Corporate AI Cohort · Lagos" },
  { src: aca2940, label: "Agent Building Lab" },
  { src: aca2960, label: "Live System Teardowns" },
  { src: aca2962, label: "Student Outreach Session" },
  { src: aca2975, label: "Prompt Engineering Workshop" },
  { src: aca2980, label: "Hands-on Coding Practicals" },
  { src: aca2984, label: "Data Privacy & Ethics" },
  { src: aca2986, label: "Workflow Engine Sprint" },
];

const ROW_TWO: Shot[] = [
  { src: aca3017, label: "1-on-1 Portfolio Mentorship" },
  { src: aca3039, label: "Graduation & Demo Day" },
  { src: aca3051, label: "Peer Build Sprint" },
  { src: aca3060, label: "Workflow Automation Workshop" },
  { src: aca3076, label: "AI Architecture Review" },
  { src: aca3078, label: "Executive Strategy Session" },
  { src: aca3085, label: "Model Evaluation Lab" },
  { src: aca3087, label: "Team Hackathon" },
];

const ROW_THREE: Shot[] = [
  { src: aca3156, label: "Certificate Presentations" },
  { src: aca3163, label: "System Architecture Design" },
  { src: aca3168, label: "Live Q&A Session" },
  { src: aca3171, label: "AI Tools Demonstration" },
  { src: aca3174, label: "Enterprise Security Review" },
  { src: aca3177, label: "Cohort Networking" },
  { src: aca3178, label: "Project Teardowns" },
  { src: aca3190, label: "Academy Hall · Lagos" },
];

function AcademyGallery() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  });

  const xLeft1 = useTransform(smooth, [0, 1], ["10%", "-50%"]);
  const xRight = useTransform(smooth, [0, 1], ["-50%", "10%"]);
  const xLeft2 = useTransform(smooth, [0, 1], ["5%", "-55%"]);

  return (
    <section
      ref={ref}
      data-sage-track="Life inside the Academy"
      className="relative overflow-hidden border-b border-hq-ink/10 bg-hq-boneDeep py-28 sm:py-40"
    >
      <div className="mx-auto mb-12 flex max-w-7xl flex-col gap-4 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-hq-red/30 bg-hq-red/[0.08] px-3.5 py-1.5 font-mono text-xs text-hq-red font-semibold mb-3">
            <CameraIcon size={14} /> Life inside the Academy
          </span>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-hq-ink sm:text-5xl">
            The work, the room, and the people in it.
          </h2>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-hq-ink/60">
          Scroll to move the rails
        </p>
      </div>

      <div className="space-y-4">
        <GalleryRail shots={ROW_ONE} x={xLeft1} />
        <GalleryRail shots={ROW_TWO} x={xRight} reverse />
        <GalleryRail shots={ROW_THREE} x={xLeft2} />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-hq-boneDeep to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-hq-boneDeep to-transparent sm:w-28" />
    </section>
  );
}

function GalleryRail({
  shots,
  x,
  reverse = false,
}: {
  shots: Shot[];
  x: MotionValue<string>;
  reverse?: boolean;
}) {
  const items = [...shots, ...shots];
  return (
    <motion.div style={{ x }} className="flex w-max gap-4 px-4">
      {items.map((shot, i) => (
        <figure
          key={`${shot.label}-${i}`}
          className={`group relative h-44 w-64 shrink-0 overflow-hidden rounded-2xl border border-hq-ink/15 sm:h-60 sm:w-[22rem] ${
            reverse ? "rotate-[0.6deg]" : "-rotate-[0.6deg]"
          }`}
        >
          <img
            src={shot.src}
            alt={shot.label}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
          <span className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-0" />
          <figcaption className="absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-black/75 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-hq-red" />
            {shot.label}
          </figcaption>
        </figure>
      ))}
    </motion.div>
  );
}

export function AcademyPage() {
  const [selectedTier, setSelectedTier] = useState<number>(0);
  const [activeProgramCard, setActiveProgramCard] = useState<number>(0);

  return (
    <div className="relative bg-hq-bone text-hq-ink min-h-screen">
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-32 pb-16">
        <CursorField theme="light" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-hq-bone to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-hq-red/30 bg-hq-red/[0.08] px-3.5 py-1.5 font-mono text-xs text-hq-red font-semibold"
            >
              Circle Academy
            </motion.p>

            <SplitHeading
              text="Building the Future of Workforce."
              muted={["Future", "of", "Workforce."]}
              mutedClassName="text-hq-red"
              className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-hq-ink sm:text-6xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-hq-ink/75"
            >
              Practical AI education for Nigerian professionals and
              organisations — from teams learning to work alongside AI, to
              individuals learning to build with it. Real tools. Real outcomes.
              Built for the Nigerian market.
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton
                href="/consultation"
                className="inline-flex items-center gap-2 rounded-full bg-hq-red px-6 py-3.5 text-sm font-medium text-white shadow-md hover:bg-hq-red-deep"
              >
                Talk to Us About Training <ArrowRightIcon size={16} />
              </MagneticButton>
            </div>
          </div>

          {/* Hero Workshop Banner Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-12 relative overflow-hidden rounded-3xl border border-hq-ink/15 shadow-xl aspect-[21/9]"
          >
            <img
              src="/academy_workshop_training.png"
              alt="Circle Academy Hands-on Corporate Workshop"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hq-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white max-w-lg">
              <span className="font-mono text-xs uppercase tracking-widest text-white bg-hq-red px-3 py-1 rounded-full">
                Live Corporate Cohort Session
              </span>
              <p className="mt-3 font-display text-xl font-semibold sm:text-2xl">
                Equipping teams with practical AI capability.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3-Row Animated Scrolling Photo Gallery Rail Section */}
      <AcademyGallery />

      {/* Structured Training Paths Section (Matching Screenshot) */}
      <section className="bg-hq-black py-24 sm:py-32 text-white border-b border-hq-line">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          {/* Header */}
          <div className="mb-14">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-hq-red mb-3 block">
              TWO LEVELS OF TRAINING. ONE MISSION.
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] text-white max-w-3xl">
              Understand AI,{" "}
              <span className="text-hq-mute">or learn to build with it.</span>
            </h2>
            <p className="text-hq-mute text-base sm:text-lg leading-relaxed mt-4 max-w-3xl">
              Whether your organisation wants staff who understand and use AI
              more effectively, or you're an individual who wants to build AI
              systems professionally — Circle Academy has a structured path for
              both.
            </p>
          </div>

          {/* 2 Card Layout */}
          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
            {/* Card 1: Business level training */}
            <div className="rounded-3xl border border-white/10 bg-[#0e0e11] p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="h-10 w-10 rounded-full bg-hq-red flex items-center justify-center text-white mb-4">
                  <Building2Icon size={20} />
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                  Business level training
                </h3>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-hq-red mt-1 block">
                  BUSINESS AI LITERACY PROGRAMME
                </span>

                <p className="text-sm leading-relaxed text-hq-mute mt-4">
                  For organisations that want their teams working more
                  effectively alongside AI — understanding how to use it
                  responsibly, safely, and strategically. Not a technical
                  course: a business and behavioural programme for staff at any
                  level.
                </p>

                {/* Specs Table */}
                <div className="border-t border-b border-white/10 py-4 my-6 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-hq-mute uppercase tracking-wider text-[10px]">
                      DURATION
                    </span>
                    <span className="text-white font-semibold text-right">
                      1 week (5 intensive days)
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-hq-mute uppercase tracking-wider text-[10px]">
                      FORMATS
                    </span>
                    <span className="text-white font-semibold text-right">
                      Physical (on-site) or online live sessions
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-hq-mute uppercase tracking-wider text-[10px]">
                      GROUP SIZE
                    </span>
                    <span className="text-white font-semibold text-right">
                      Minimum 5 staff · custom for larger teams
                    </span>
                  </div>
                </div>

                {/* Checklist */}
                <ul className="space-y-3 text-sm text-white/90 mb-6">
                  {BUSINESS_TOPICS.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckIcon
                        size={16}
                        className="text-hq-red shrink-0 mt-0.5"
                      />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Customisation Box */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs italic text-hq-mute">
                This is our standard offering. If your needs differ — duration,
                modules, format, or team size — we're open to full
                customisation. Speak to us before booking.
              </div>
            </div>

            {/* Card 2: Individual skill-based training */}
            <div className="rounded-3xl border border-white/10 bg-[#0e0e11] p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white mb-4">
                  <UserIcon size={20} />
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                  Individual skill-based training
                </h3>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-hq-red mt-1 block">
                  AI AGENT BUILDER PROGRAMME
                </span>

                <p className="text-sm leading-relaxed text-hq-mute mt-4">
                  Takes participants from zero to functional AI agent builders —
                  capable of designing and deploying real automation workflows
                  using tools like Make, Zapier, and n8n.
                </p>

                {/* Specs Table */}
                <div className="border-t border-b border-white/10 py-4 my-6 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-hq-mute uppercase tracking-wider text-[10px]">
                      FORMAT
                    </span>
                    <span className="text-white font-semibold text-right">
                      Online, live + self-paced modules
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-hq-mute uppercase tracking-wider text-[10px]">
                      COHORT SIZE
                    </span>
                    <span className="text-white font-semibold text-right">
                      Minimum 20 per cohort, rolling enrolment
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-hq-mute uppercase tracking-wider text-[10px]">
                      PRACTICALS
                    </span>
                    <span className="text-white font-semibold text-right">
                      Real agent builds per participant
                    </span>
                  </div>
                </div>

                {/* Intensity Tiers Tabs */}
                <div className="mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-hq-mute mb-2 block">
                    THREE INTENSITY TIERS · SAME CURRICULUM
                  </span>

                  <div className="grid grid-cols-3 gap-2">
                    {INTENSITY_TIERS.map((tier, idx) => (
                      <button
                        key={tier.name}
                        type="button"
                        onClick={() => setSelectedTier(idx)}
                        className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                          selectedTier === idx
                            ? "bg-hq-red text-white shadow-md"
                            : "bg-white/5 border border-white/10 text-hq-mute hover:text-white"
                        }`}
                      >
                        {tier.name}
                      </button>
                    ))}
                  </div>

                  <div className="border border-white/10 bg-white/[0.02] rounded-xl p-4 mt-3">
                    <span className="font-mono text-[10px] font-bold text-hq-red uppercase tracking-wider block mb-1">
                      {INTENSITY_TIERS[selectedTier].durationLabel}
                    </span>
                    <p className="text-xs font-semibold text-white leading-relaxed">
                      {INTENSITY_TIERS[selectedTier].desc}
                    </p>
                  </div>
                </div>

                {/* Checklist */}
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-hq-mute mb-3 block">
                    BY THE END, PARTICIPANTS CAN
                  </span>
                  <ul className="space-y-3 text-sm text-white/90 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckIcon
                        size={16}
                        className="text-hq-red shrink-0 mt-0.5"
                      />
                      <span>
                        Build a WhatsApp or email auto-response workflow — no
                        code required.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckIcon
                        size={16}
                        className="text-hq-red shrink-0 mt-0.5"
                      />
                      <span>
                        Build a functional lead capture and CRM automation
                        connected to a real business workflow.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckIcon
                        size={16}
                        className="text-hq-red shrink-0 mt-0.5"
                      />
                      <span>
                        Design and deploy a complete AI agent handling a real
                        business process end-to-end, with a portfolio of builds
                        ready for client or employer use.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                {/* Graduation Job Fair Box */}
                <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-xs font-medium text-white/90 mb-4">
                  Every cohort ends with a graduation ceremony that doubles as a
                  job fair — giving organisations a direct route to hire from a
                  pool of AI-ready graduates.
                </div>

                <a
                  href="/consultation"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-hq-red hover:underline"
                >
                  Talk to us about a cohort <ArrowRightIcon size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Programmes Section Matching Screenshot */}
      <section
        id="free-programmes"
        className="bg-[#eee9e0] py-20 sm:py-28 border-b border-hq-ink/10"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            {/* Left Info Column */}
            <div>
              <span className="inline-block rounded-full bg-hq-red px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                FREE PROGRAMMES
              </span>

              <h2 className="mt-6 max-w-md font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-hq-ink sm:text-5xl">
                AI readiness shouldn't depend on{" "}
                <span className="text-hq-red">who can afford it.</span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-hq-ink/75">
                Circle Academy runs free AI literacy training for secondary
                school students and university students across Nigeria — no
                fees, no catch.
              </p>

              <a
                href="/consultation"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#070708] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-hq-red hover:-translate-y-0.5"
              >
                Nominate a school &rarr;
              </a>
            </div>

            {/* Right 3 Cards Stack with Hover / Active Red Accent Offset Effect */}
            <div className="space-y-4">
              {/* Card 1: Secondary Schools */}
              <div
                className="group relative cursor-pointer"
                onMouseEnter={() => setActiveProgramCard(0)}
              >
                <div
                  className={`absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-hq-red transition-all duration-200 ${
                    activeProgramCard === 0
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
                <div
                  className={`relative flex items-center gap-4 rounded-2xl border border-hq-ink/15 p-5 sm:p-6 shadow-sm transition-all duration-200 ${
                    activeProgramCard === 0
                      ? "bg-[#e5dfd2] -translate-x-1 -translate-y-1 shadow-md"
                      : "bg-[#e5dfd2]/80 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-[#e5dfd2] group-hover:shadow-md"
                  }`}
                >
                  <div
                    className={`h-10 w-10 shrink-0 rounded-full text-white flex items-center justify-center transition-colors duration-200 ${
                      activeProgramCard === 0
                        ? "bg-hq-red shadow-sm"
                        : "bg-[#070708] group-hover:bg-hq-red"
                    }`}
                  >
                    <GraduationCapIcon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-hq-ink">
                      Secondary schools
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-hq-ink/75">
                      Free AI literacy training aligned to Nigeria's NERDC
                      Digital Technologies curriculum.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: University students */}
              <div
                className="group relative cursor-pointer"
                onMouseEnter={() => setActiveProgramCard(1)}
              >
                <div
                  className={`absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-hq-red transition-all duration-200 ${
                    activeProgramCard === 1
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
                <div
                  className={`relative flex items-center gap-4 rounded-2xl border border-hq-ink/15 p-5 sm:p-6 shadow-sm transition-all duration-200 ${
                    activeProgramCard === 1
                      ? "bg-[#e5dfd2] -translate-x-1 -translate-y-1 shadow-md"
                      : "bg-[#e5dfd2]/80 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-[#e5dfd2] group-hover:shadow-md"
                  }`}
                >
                  <div
                    className={`h-10 w-10 shrink-0 rounded-full text-white flex items-center justify-center transition-colors duration-200 ${
                      activeProgramCard === 1
                        ? "bg-hq-red shadow-sm"
                        : "bg-[#070708] group-hover:bg-hq-red"
                    }`}
                  >
                    <HeartIcon size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-hq-ink">
                      University students
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-hq-ink/75">
                      Extended sessions for undergraduates preparing to enter an
                      AI-shaped job market.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-semibold text-hq-ink sm:text-4xl">
            Tell Us What Your Team — or You — Need to Learn.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <MagneticButton
              href="/consultation"
              className="inline-flex items-center gap-2 rounded-full bg-hq-red px-6 py-3.5 text-sm font-medium text-white shadow-md hover:bg-hq-red-deep"
            >
              Talk to Us <ArrowRightIcon size={16} />
            </MagneticButton>
            <MagneticButton
              href="mailto:hello@circlehqcompany.com?subject=Program%20Outline%20Request"
              strength={0.25}
              className="inline-flex items-center gap-2 rounded-full border border-hq-ink/20 bg-white px-6 py-3.5 text-sm text-hq-ink hover:border-hq-red hover:text-hq-red transition-colors shadow-sm"
            >
              Download Program Outline <DownloadIcon size={16} />
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
