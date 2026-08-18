import React, { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  XIcon,
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ExternalLinkIcon,
} from "lucide-react";
import type { BlogPost } from "./BlogCard";
import { Link } from "react-router-dom";

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export function ArticleModal({ post, onClose }: ArticleModalProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!post) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [post, onClose]);

  if (!post) return null;

  const sourceUrl = post.link || (post.slug ? `https://cms.circlehqcompany.com/${post.slug}` : null);

  return createPortal(
    <AnimatePresence>
      {post && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto p-4 sm:p-6 md:p-10"
        >
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
            className="relative z-10 my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-hq-ink/15 bg-hq-bone text-hq-ink shadow-2xl max-h-[90vh] flex flex-col"
          >
            {/* Modal Sticky Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-hq-ink/10 bg-hq-bone/90 p-4 px-6 backdrop-blur-md">
              <span className="rounded-full bg-hq-red px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                {post.category}
              </span>

              <div className="flex items-center gap-3">
                {post.slug && (
                  <Link
                    to={`/blog/${post.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 rounded-full border border-hq-ink/15 bg-white px-3.5 py-1.5 font-mono text-xs font-semibold text-hq-ink transition-all hover:border-hq-red hover:bg-hq-red hover:text-white shadow-sm"
                  >
                    <span>View source</span>
                    <ArrowRightIcon size={13} aria-hidden="true" />
                  </Link>
                )}

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close article"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hq-ink/15 bg-white text-hq-ink transition-colors hover:border-hq-red hover:bg-hq-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hq-red focus-visible:ring-offset-2 focus-visible:ring-offset-hq-bone"
                >
                  <XIcon size={18} aria-hidden="true" />
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
                  {post.author?.name && (
                    <>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1.5 text-hq-ink/60">
                        <UserIcon size={14} />
                        {post.author.name}
                      </span>
                    </>
                  )}
                </div>

                <h1
                  id={titleId}
                  className="mt-4 font-display text-2xl sm:text-4xl font-bold leading-tight tracking-tight text-hq-ink"
                >
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-hq-ink/75 font-medium border-l-2 border-hq-red pl-4">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Cover Image */}
              <div className="overflow-hidden rounded-2xl border border-hq-ink/15 shadow-md aspect-[16/9] relative bg-hq-black">
                <img
                  src={post.cover}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Article Content */}
              <div className="wp-post-content space-y-6 text-base leading-relaxed text-hq-ink/80">
                {post.contentHtml ? (
                  <div
                    className="prose prose-lg max-w-none space-y-4 text-hq-ink/80 [&_p]:leading-relaxed [&_h2]:text-hq-ink [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:pt-4 [&_h3]:text-hq-ink [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-hq-red [&_a]:font-semibold [&_a]:underline [&_a]:decoration-hq-red/60 hover:[&_a]:text-hq-red-deep hover:[&_a]:decoration-hq-red transition-colors [&_figure]:my-6 [&_figure_img]:rounded-xl [&_figure_img]:border [&_figure_img]:border-hq-ink/15"
                    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                  />
                ) : post.content ? (
                  post.content.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-base sm:text-lg leading-relaxed text-hq-ink/80"
                    >
                      {paragraph}
                    </p>
                  ))
                ) : null}
              </div>

              {/* Modal Bottom CTA */}
              <div className="mt-10 rounded-2xl border border-hq-ink/15 bg-hq-boneDeep p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-display text-xl font-semibold text-hq-ink">
                    Ready to build smart systems for your team?
                  </h3>
                  <p className="mt-1 text-sm text-hq-ink/70">
                    Book a short, honest consultation about your operations.
                  </p>
                </div>
                <Link
                  to="/consultation#booking"
                  onClick={onClose}
                  className="whitespace-nowrap inline-flex items-center gap-2 rounded-full bg-hq-red px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-hq-red-deep transition-all"
                >
                  Book a Consultation <ArrowRightIcon size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
