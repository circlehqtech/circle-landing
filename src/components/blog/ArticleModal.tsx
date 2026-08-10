import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, ArrowRightIcon, CalendarIcon, ClockIcon, Share2Icon } from 'lucide-react';
import type { BlogPost } from './BlogCard';
import { Link } from 'react-router-dom';

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export function ArticleModal({ post, onClose }: ArticleModalProps) {
  useEffect(() => {
    if (post) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [post]);

  if (!post) return null;

  return (
    <AnimatePresence>
      {post && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-hq-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-hq-ink/15 bg-hq-bone text-hq-ink shadow-2xl max-h-[90vh] flex flex-col">
            
            {/* Modal Sticky Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-hq-ink/10 bg-hq-bone/90 p-4 px-6 backdrop-blur-md">
              <span className="rounded-full bg-hq-red px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                {post.category}
              </span>
              
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hq-ink/15 bg-white text-hq-ink transition-colors hover:bg-hq-red hover:text-white hover:border-hq-red">
                  <XIcon size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable Article Body */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
              {/* Header Meta */}
              <div>
                <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-hq-red font-semibold uppercase tracking-wider">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarIcon size={14} />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <ClockIcon size={14} />
                    {post.readTime}
                  </span>
                </div>

                <h1 className="mt-4 font-display text-2xl sm:text-4xl font-bold leading-tight tracking-tight text-hq-ink">
                  {post.title}
                </h1>

                <p className="mt-4 text-base sm:text-lg leading-relaxed text-hq-ink/75 font-medium">
                  {post.excerpt}
                </p>
              </div>

              {/* Cover Image */}
              <div className="overflow-hidden rounded-2xl border border-hq-ink/15 shadow-md aspect-[16/9] relative bg-hq-black">
                <img
                  src={post.cover}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Article Content Paragraphs */}
              <div className="prose prose-lg max-w-none space-y-6 text-base leading-relaxed text-hq-ink/80">
                {post.content ? (
                  post.content.map((paragraph, i) => (
                    <p key={i} className="text-base sm:text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <>
                    <p className="text-base sm:text-lg leading-relaxed">
                      When evaluating operational processes for AI automation, the most common trap is jumping straight to technology before establishing clear brief parameters. Most automation initiatives fail during scoping, not engineering.
                    </p>
                    
                    <div className="my-6 rounded-2xl border-l-4 border-hq-red bg-hq-boneDeep p-6 text-hq-ink">
                      <p className="font-display text-lg font-semibold italic text-hq-ink">
                        "If a process cannot be described deterministically by a domain human expert, an AI agent will only accelerate the confusion."
                      </p>
                    </div>

                    <h2 className="font-display text-xl sm:text-2xl font-bold text-hq-ink pt-2">
                      The Scoping Filter Every Brief Must Pass
                    </h2>
                    <p>
                      Before writing a single line of orchestration code or configuring vector indices, we pass every workflow through three mandatory scoping filters:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-hq-ink/90">
                      <li><strong>Operational Drag Identification:</strong> Exactly where is human capital spent on non-creative data movement?</li>
                      <li><strong>Determinism & Schema Boundaries:</strong> Is the input structured enough to yield reliable, schema-validated outputs?</li>
                      <li><strong>Human-in-the-Loop Ownership:</strong> Who reviews low-confidence outputs, and what is the exact escalation path?</li>
                    </ul>
                  </>
                )}
              </div>

              {/* Modal Bottom CTA */}
              <div className="mt-10 rounded-2xl border border-hq-ink/15 bg-hq-boneDeep p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-display text-xl font-semibold text-hq-ink">Ready to build smart systems for your team?</h3>
                  <p className="mt-1 text-sm text-hq-ink/70">Book a short, honest consultation about your operations.</p>
                </div>
                <Link
                  to="/consultation"
                  onClick={onClose}
                  className="whitespace-nowrap inline-flex items-center gap-2 rounded-full bg-hq-red px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-hq-red-deep transition-all">
                  Book a Consultation <ArrowRightIcon size={16} />
                </Link>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
