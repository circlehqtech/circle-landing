import React from 'react';
import { motion } from 'framer-motion';
import { SplitHeading } from '../../components/common/SplitHeading';
import { MagneticButton } from '../../components/common/MagneticButton';
import { ContactCTA } from '../../components/home/ContactCTA';
import { CursorField } from '../../components/common/CursorField';
import { OurStoryScrollReveal } from '../../components/about/OurStoryScrollReveal';
import { ArrowRightIcon, SparklesIcon, TargetIcon, CompassIcon, ZapIcon, CheckCircle2Icon, ShieldCheckIcon } from 'lucide-react';

const VALUES = [
  {
    title: 'Growth',
    blurb: 'Help businesses grow without adding extra strain, overhead, or friction.',
    icon: SparklesIcon,
    image: '/3a189f97-4d04-43b7-ad66-524fad486114.jpg'
  },
  {
    title: 'Simplicity',
    blurb: 'Make daily work smoother by removing manual, repetitive tasks from your team.',
    icon: ZapIcon,
    image: '/fc1b4738-d5c0-44fa-80be-c83cd0a3a8d1.jpg'
  },
  {
    title: 'Curiosity',
    blurb: 'Stay ahead by learning and experimenting so our clients don’t have to chase every new tool.',
    icon: CompassIcon,
    image: '/2716ccb6-35bb-43e3-b2b5-908f2d8c7302.jpg'
  },
  {
    title: 'Focus',
    blurb: 'Give teams more space to work on what actually drives the business forward.',
    icon: TargetIcon,
    image: '/9676547c-bb5b-49a6-b12f-91640f0ea60b.jpg'
  }
];

export function AboutPage() {
  return (
    <div className="relative bg-hq-bone text-hq-ink min-h-screen">
      {/* Light Hero Section */}
      <section className="relative isolate overflow-hidden pt-32 pb-16">
        <CursorField theme="light" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-hq-bone to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-hq-red/30 bg-hq-red/[0.08] px-3.5 py-1.5 font-mono text-xs text-hq-red font-semibold">
              About Circle HQ
            </motion.p>
            
            <SplitHeading
              text="We simplify business operations through intelligent, AI-driven systems."
              muted={['through', 'intelligent,', 'AI-driven', 'systems.']}
              mutedClassName="text-hq-red"
              className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-hq-ink sm:text-6xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-hq-ink/75">
              We’re an AI automation agency that simplifies business operations through intelligent, AI-driven tools and systems. Our solutions are designed to save you time, enhance efficiency, and deliver measurable results that drive growth.
            </motion.p>
          </div>

          {/* Hero Banner Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-12 relative overflow-hidden rounded-3xl border border-hq-ink/15 shadow-xl aspect-[21/9]">
            <img
              src="/about_hero_studio.png"
              alt="Circle HQ Team Studio Operations"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hq-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white max-w-lg">
              <span className="font-mono text-xs uppercase tracking-widest text-white bg-hq-red px-3 py-1 rounded-full">
                Lagos Studio HQ
              </span>
              <p className="mt-3 font-display text-xl font-semibold sm:text-2xl">
                Building AI solutions that remove operational drag.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story / Why We Built Circle HQ (Light Theme Side-by-Side with Scroll Text Reveal) */}
      <section className="border-y border-hq-ink/10 bg-hq-boneDeep py-24 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red font-bold">
                OUR STORY
              </p>
              
              <SplitHeading
                text="Why we built Circle HQ."
                muted={['Circle', 'HQ.']}
                mutedClassName="text-hq-red"
                className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-hq-ink sm:text-6xl"
              />
            </div>

            {/* Right Column: Text Reveal Animation */}
            <div className="lg:col-span-7">
              <OurStoryScrollReveal />
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy & Promise */}
      <section className="py-24 sm:py-32 border-t border-hq-ink/10 bg-hq-bone">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="inline-block rounded-full bg-hq-red px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm mb-4">
              OUR PHILOSOPHY & PROMISE
            </span>

            <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-hq-ink sm:text-5xl">
              Change isn't what slows businesses down. <span className="text-hq-red">Inefficient systems do.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-hq-ink/75">
              We believe growth happens when smart automation carries the operational load and people can put their time into vision, creativity, and serving customers.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-hq-ink/15 bg-[#efeae1] transition-all duration-300 ease-out hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[10px_10px_0px_0px_#e0142c]">
                  
                  {/* Card Cover Image with Floating Icon */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-hq-black">
                    <img
                      src={val.image}
                      alt={val.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-hq-red text-white shadow-md z-10">
                      <Icon size={16} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-6 bg-[#efeae1]">
                    <h3 className="font-display text-xl font-bold text-hq-ink group-hover:text-hq-red transition-colors">
                      {val.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-hq-ink/75 flex-1">
                      {val.blurb}
                    </p>

                    {/* Red horizontal accent bar */}
                    <div className="mt-5 flex items-center gap-2">
                      <span className="h-[2px] w-6 bg-hq-red transition-all duration-300 group-hover:w-10" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
