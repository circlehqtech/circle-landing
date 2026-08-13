import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCheckIcon, SendHorizontalIcon, MessageSquareIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type Faq = { id: string; num: string; question: string; answer: string; };

const FAQS: Faq[] = [
  {
    id: 'start',
    num: '01',
    question: 'What does Circle HQ actually build?',
    answer:
      'Custom AI business systems — built around your specific operations, not sold as a fixed product. Examples include 24/7 chat agents, reporting dashboards, workflow automation, onboarding flows, and revenue tracking systems.'
  },
  {
    id: 'diff',
    num: '02',
    question: 'What’s the difference between AI Solutions and Academy?',
    answer:
      'Circle AI Solutions builds the AI systems your business runs on. Circle Academy trains the people who run them — either as an organisation-wide literacy programme, or as individual hands-on AI agent-building training.'
  },
  {
    id: 'systems',
    num: '03',
    question: 'Do I need existing systems in place before working with Circle HQ?',
    answer:
      'No. Part of what we do in the consultation is assess where your business currently stands — including businesses with no formal systems at all — and recommend the right starting point.'
  },
  {
    id: 'time',
    num: '04',
    question: 'How long does it take to build a system?',
    answer:
      'It depends entirely on what’s being built. A simple automation can move quickly; a multi-system integration takes longer. You’ll get a clear timeline as part of your roadmap, before any work begins.'
  },
  {
    id: 'tech',
    num: '05',
    question: 'Is Circle Academy only for people with a technical background?',
    answer:
      'No. The Business AI Literacy Programme is built for non-technical staff at any level. The AI Agent Builder Programme is more hands-on, but starts from the fundamentals — no prior coding experience required.'
  }
];

export function FaqChat() {
  const [asked, setAsked] = useState<string[]>([]);
  const [pending, setPending] = useState<string | null>(null);
  const threadRef = useRef<HTMLDivElement | null>(null);

  const remaining = FAQS.filter((f) => !asked.includes(f.id) && f.id !== pending);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [asked, pending]);

  const ask = (faq: Faq) => {
    if (pending) return;
    setPending(faq.id);
    window.setTimeout(() => {
      setAsked((prev) => [...prev, faq.id]);
      setPending(null);
    }, 1400);
  };

  const thread = FAQS.filter((f) => asked.includes(f.id) || f.id === pending);

  return (
    <section
      id="faq"
      data-sage-track="FAQ"
      className="relative overflow-hidden bg-hq-black border-y border-hq-line py-24 text-white sm:py-32">
      
      {/* Soft dark red glow background */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-hq-red/10 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red font-semibold">
            Questions
          </p>
          <h2 className="max-w-md font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl">
            Ask the awkward ones.
            <span className="block text-hq-red">We answer them the same way.</span>
          </h2>

          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-hq-line bg-hq-panel p-4 shadow-xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-hq-red font-display text-sm font-semibold text-white">
              CH
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Circle HQ Support</p>
              <p className="flex items-center gap-1.5 text-xs text-hq-mute">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-1.5 w-1.5 rounded-full bg-hq-red" />
                Online · replies in seconds
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-xs text-sm leading-relaxed text-hq-mute">
            Every answer below is the same one you would get on a call. No sales script.
          </p>
        </div>

        {/* Dark Chat Window Container */}
        <div className="rounded-[28px] border border-hq-line bg-hq-panel/80 p-4 sm:p-6 shadow-2xl backdrop-blur-md">
          <div
            ref={threadRef}
            role="log"
            aria-live="polite"
            className="flex max-h-[26rem] min-h-[16rem] flex-col gap-5 overflow-y-auto pr-1">
            
            {thread.length === 0 && (
              <p className="m-auto max-w-xs text-center text-sm text-hq-mute">
                Tap a question below — it sends like a message, and support replies.
              </p>
            )}

            <AnimatePresence initial={false}>
              {thread.map((faq) => (
                <motion.div key={faq.id} layout className="flex flex-col gap-4">
                  {/* Sent question */}
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 18, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="flex flex-col items-end">
                    <span className="inline-flex max-w-[85%] items-center gap-3 rounded-full bg-hq-red py-3 pl-4 pr-5 text-left text-sm font-medium text-white shadow-md">
                      <span className="font-display text-base font-semibold text-white/60">
                        {faq.num}
                      </span>
                      {faq.question}
                    </span>
                    <span className="mt-1.5 flex items-center gap-1 pr-2 font-mono text-[9px] uppercase tracking-widest text-hq-mute">
                      Sent <CheckCheckIcon size={11} className="text-hq-red" />
                    </span>
                  </motion.div>

                  {/* Reply */}
                  {asked.includes(faq.id) ? (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="relative max-w-[92%] rounded-[26px] rounded-bl-none border border-hq-line bg-white/[0.03] p-5 pr-8 text-[14px] leading-relaxed text-hq-mute shadow-sm">
                      {faq.answer}
                    </motion.div>
                  ) : (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex w-16 items-center justify-center gap-1.5 rounded-full rounded-bl-md border border-hq-line bg-white/[0.03] py-3">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                          className="h-1.5 w-1.5 rounded-full bg-hq-red" />
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-6 border-t border-hq-line pt-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-hq-mute">
              {remaining.length > 0 ? 'Tap to send' : 'That is everything'}
            </p>

            <AnimatePresence mode="popLayout">
              {remaining.length > 0 ? (
                <motion.ul layout className="flex flex-wrap gap-2">
                  {remaining.map((faq) => (
                    <motion.li
                      key={faq.id}
                      layout
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}>
                      <button
                        type="button"
                        onClick={() => ask(faq)}
                        disabled={pending !== null}
                        className="group inline-flex items-center gap-2.5 rounded-full border border-hq-line bg-white/[0.02] px-4 py-2.5 text-[13px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-hq-red hover:border-hq-red disabled:opacity-40 shadow-sm">
                        <span className="font-display text-[13px] font-semibold text-hq-red group-hover:text-white">
                          {faq.num}
                        </span>
                        {faq.question}
                        <SendHorizontalIcon
                          size={13}
                          className="opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <Link
                  to="/consultation"
                  className="inline-flex items-center gap-2 rounded-full bg-hq-red px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-hq-red-deep shadow-md">
                  Book a Consultation
                  <SendHorizontalIcon size={15} />
                </Link>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
