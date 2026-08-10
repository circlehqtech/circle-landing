import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, ChevronDownIcon, LockIcon, RadarIcon, XIcon } from 'lucide-react';
import { useTelemetry, type TelemetrySnapshot } from '../../hooks/useTelemetry';

const REVEAL_AFTER_MS = 60_000;

type Inference = { verdict: string; division: string; action: string; };

function infer(snap: TelemetrySnapshot): Inference {
  const label = snap.focus?.label ?? 'The pitch';
  const share = Math.round(snap.focusShare * 100);

  if (label === 'AI Solutions') {
    return {
      verdict: `${share}% of your attention sat on AI Solutions. You are not shopping for software — something in your operations is being done by hand that should not be.`,
      division: 'AI Solutions',
      action: 'Show me what to automate first'
    };
  }
  if (label === 'Marketing Solutions') {
    return {
      verdict: `${share}% of your attention sat on Marketing Solutions. You have something worth seeing and not enough people seeing it.`,
      division: 'Marketing Solutions',
      action: 'Show me the growth plan'
    };
  }
  if (label === 'Circle Academy') {
    return {
      verdict: `${share}% of your attention sat on Circle Academy. You are less worried about tools than about the people who will have to run them.`,
      division: 'Circle Academy',
      action: 'Show me the training tracks'
    };
  }
  if (snap.scrollDepth < 25) {
    return {
      verdict: `You have barely scrolled in ${snap.seconds} seconds. Either the headline landed, or you are deciding whether we are serious. We are.`,
      division: 'Circle HQ',
      action: 'Skip the page, book the teardown'
    };
  }
  return {
    verdict: `You read ${snap.scrollDepth}% of the page in ${snap.seconds} seconds without settling anywhere. That usually means the problem is bigger than one division.`,
    division: 'Circle HQ',
    action: 'Map it with us in 20 minutes'
  };
}

type Phase = 'idle' | 'tip' | 'open' | 'gone';

/**
 * Sage: a passive observer that surfaces ONCE, as a non-blocking coach mark
 * pinned to the bottom of the viewport. The page stays fully usable throughout.
 */
export function SageReadout() {
  const { read } = useTelemetry();
  const [snap, setSnap] = useState<TelemetrySnapshot | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSnap(read());
      setPhase('tip');
    }, REVEAL_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [read]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setPhase((p) => (p === 'open' ? 'tip' : p === 'tip' ? 'gone' : p));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const expand = useCallback(() => {
    setSnap(read());
    setPhase('open');
  }, [read]);

  if (phase === 'idle' || phase === 'gone' || !snap) return null;

  const inference = infer(snap);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-center px-4 pb-5 sm:justify-end sm:px-7 sm:pb-7">
      <AnimatePresence mode="wait">
        {phase === 'tip' ? (
          <motion.div
            key="tip"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-2xl border border-hq-red/30 bg-hq-panel/95 p-3 pl-4 backdrop-blur-xl"
            role="status">
            
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <motion.span
                animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-hq-red"
              />
              <span className="relative h-2.5 w-2.5 rounded-full bg-hq-red" />
            </span>
            <p className="flex-1 text-[13px] leading-snug text-white/90">
              <span className="font-medium">Sage</span> has been reading this session.
              <span className="text-hq-mute"> It noticed something.</span>
            </p>
            <button
              type="button"
              onClick={expand}
              className="shrink-0 rounded-full bg-hq-red px-3.5 py-2 text-[12px] font-medium text-white transition-transform duration-200 hover:-translate-y-0.5">
              Show me
            </button>
            <button
              type="button"
              onClick={() => setPhase('gone')}
              aria-label="Dismiss Sage"
              className="shrink-0 rounded-full p-1.5 text-hq-mute transition-colors hover:text-white">
              <XIcon size={15} />
            </button>
          </motion.div>
        ) : (
          <motion.section
            key="open"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Sage behavioural readout"
            className="hq-grain pointer-events-auto relative max-h-[78vh] w-full max-w-md overflow-y-auto rounded-3xl border border-hq-red/30 bg-hq-panel/95 p-5 backdrop-blur-xl shadow-[0_30px_90px_-30px_rgba(224,20,44,0.55)] sm:p-6">
            
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-hq-red/20 blur-[80px]"
            />

            <header className="relative flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hq-red/50 text-hq-red">
                  <RadarIcon size={16} />
                </motion.span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-hq-red">
                    Sage · behavioural readout
                  </p>
                  <p className="text-[12.5px] text-hq-mute">
                    Nobody asked me to watch. That is rather the point.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPhase('tip')}
                  aria-label="Collapse readout"
                  className="rounded-full p-1.5 text-hq-mute transition-colors hover:text-white">
                  <ChevronDownIcon size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setPhase('gone')}
                  aria-label="Dismiss Sage"
                  className="rounded-full p-1.5 text-hq-mute transition-colors hover:text-white">
                  <XIcon size={16} />
                </button>
              </div>
            </header>

            <dl className="relative mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hq-line bg-hq-line">
              <Metric label="Seconds on page" value={snap.seconds} delay={0.05} />
              <Metric label="Page read" value={snap.scrollDepth} suffix="%" delay={0.12} />
              <Metric
                label="Cursor travelled"
                value={snap.cursorMeters}
                decimals={1}
                suffix="m"
                delay={0.19}
              />
              <Metric label="Interactions" value={snap.interactions} delay={0.26} />
            </dl>

            {snap.dwell.length > 0 && (
              <div className="relative mt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-hq-mute">
                  Where your attention went
                </p>
                <ul className="mt-3 space-y-2.5">
                  {snap.dwell.map((entry, i) => {
                    const max = snap.dwell[0].seconds || 1;
                    return (
                      <li key={entry.label} className="flex items-center gap-3">
                        <span className="w-32 shrink-0 truncate text-[12px] text-white/80">
                          {entry.label}
                        </span>
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-hq-black">
                          <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: entry.seconds / max }}
                            transition={{
                              delay: 0.35 + i * 0.09,
                              duration: 0.75,
                              ease: [0.22, 1, 0.36, 1]
                            }}
                            className={`block h-full origin-left rounded-full ${
                              i === 0 ? 'bg-hq-red' : 'bg-white/20'
                            }`}
                          />
                        </span>
                        <span className="w-9 shrink-0 text-right font-mono text-[11px] text-hq-mute">
                          {entry.seconds.toFixed(0)}s
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.45 }}
              className="relative mt-5 rounded-2xl border border-hq-red/25 bg-hq-red/[0.06] p-4">
              
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-hq-red">
                Inference
              </p>
              <TypedLine text={inference.verdict} delay={750} />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-hq-mute">
                Routed to · {inference.division}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="relative mt-4 flex flex-col gap-2 sm:flex-row">
              
              <a
                href="#contact"
                onClick={() => setPhase('gone')}
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-hq-red px-4 py-2.5 text-[13px] font-medium text-white transition-transform duration-200 hover:-translate-y-0.5">
                {inference.action}
                <ArrowRightIcon
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              <button
                type="button"
                onClick={() => setPhase('gone')}
                className="rounded-full border border-hq-line px-4 py-2.5 text-[13px] text-hq-mute transition-colors hover:border-white/30 hover:text-white">
                Not now
              </button>
            </motion.div>

            <p className="relative mt-4 flex items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-widest text-hq-mute">
              <LockIcon size={10} />
              Computed in your browser · nothing was sent anywhere
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function Metric({
  label,
  value,
  suffix = '',
  decimals = 0,
  delay = 0
}: {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  delay?: number;
}) {
  const display = useCountUp(value, 1000, delay * 1000);
  return (
    <div className="bg-hq-black p-3.5">
      <dd className="font-display text-2xl font-semibold tabular-nums tracking-tight text-white">
        {display.toFixed(decimals)}
        <span className="text-hq-red">{suffix}</span>
      </dd>
      <dt className="mt-1 font-mono text-[9px] uppercase tracking-widest text-hq-mute">{label}</dt>
    </div>
  );
}

function useCountUp(target: number, duration: number, delay: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    let startTime = 0;
    const timeout = window.setTimeout(() => {
      const step = (now: number) => {
        if (!startTime) startTime = now;
        const p = Math.min(1, (now - startTime) / duration);
        setValue(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [target, duration, delay]);
  return value;
}

function TypedLine({ text, delay }: { text: string; delay: number; }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
    let interval = 0;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            window.clearInterval(interval);
            return c;
          }
          return c + 2;
        });
      }, 16);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, delay]);

  return (
    <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/90">
      {text.slice(0, count)}
      {count < text.length && <span className="text-hq-red">▌</span>}
    </p>
  );
}
