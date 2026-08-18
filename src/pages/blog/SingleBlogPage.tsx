import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  Share2Icon,
  CheckIcon,
  RefreshCwIcon,
  AlertCircleIcon,
  FileTextIcon,
} from "lucide-react";
import { fetchWpPosts } from "../../services/wordpress";
import type { BlogPost } from "../../components/blog/BlogCard";
import { BlogCard, BlogCardSkeleton } from "../../components/blog/BlogCard";
import { CursorField } from "../../components/common/CursorField";

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: "home-post-1",
    slug: "three-questions-before-ai-agent",
    title: "The three questions we ask before building any AI agent",
    excerpt:
      "Most automation projects fail at scoping, not engineering. Here is the filter we run every brief through.",
    category: "AI SOLUTIONS",
    date: "12 JUL 2026",
    readTime: "6 MIN",
    cover: "/blog_ai_solutions_sphere.png",
  },
  {
    id: "home-post-2",
    slug: "paid-media-faster-disappointment",
    title: "Why your paid media is buying you faster disappointment",
    excerpt:
      "Spending on a funnel with broken tracking is not marketing. A short field guide to fixing the plumbing first.",
    category: "MARKETING",
    date: "28 JUN 2026",
    readTime: "4 MIN",
    cover: "/blog_marketing_chart.png",
  },
  {
    id: "home-post-3",
    slug: "what-lagos-teams-need-to-learn",
    title: "What Lagos teams actually need to learn about AI",
    excerpt:
      "Notes from a term of Academy sessions — where teams get stuck, and the exercises that finally unstick them.",
    category: "CIRCLE ACADEMY",
    date: "09 JUN 2026",
    readTime: "7 MIN",
    cover: "/9676547c-bb5b-49a6-b12f-91640f0ea60b.jpg",
  },
];

export function SingleBlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const loadPost = async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const allPosts = await fetchWpPosts();
      const matched = allPosts.find(
        (p) => p.slug.toLowerCase() === slug.toLowerCase(),
      );

      if (matched) {
        setPost(matched);
        setRelatedPosts(allPosts.filter((p) => p.id !== matched.id).slice(0, 3));
      } else {
        // Check fallback posts
        const fallbackMatched = FALLBACK_POSTS.find(
          (p) => p.slug.toLowerCase() === slug.toLowerCase(),
        );
        if (fallbackMatched) {
          setPost(fallbackMatched);
          setRelatedPosts(
            FALLBACK_POSTS.filter((p) => p.id !== fallbackMatched.id).slice(0, 3),
          );
        } else if (allPosts.length > 0) {
          // If not matched, pick first post as fallback
          setPost(allPosts[0]);
          setRelatedPosts(allPosts.slice(1, 4));
        } else {
          setPost(null);
        }
      }
    } catch (err) {
      console.error("Failed to load article:", err);
      setError(err instanceof Error ? err.message : "Failed to load article.");
      const fallbackMatched = FALLBACK_POSTS.find(
        (p) => p.slug.toLowerCase() === slug.toLowerCase(),
      ) || FALLBACK_POSTS[0];
      setPost(fallbackMatched);
      setRelatedPosts(FALLBACK_POSTS.filter((p) => p.id !== fallbackMatched.id));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} | Circle HQ Insights`;
    } else {
      document.title = "Article | Circle HQ";
    }
  }, [post]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <article className="relative min-h-screen bg-hq-black text-white">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-hq-red/[0.06] via-transparent to-transparent" />

      {/* Top Header Section */}
      <header className="relative isolate pt-32 pb-12 border-b border-hq-line">
        <CursorField theme="dark" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-5 sm:px-8">
          {/* Navigation Bar */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-hq-line bg-hq-panel px-4 py-2 text-xs font-mono font-semibold text-hq-mute transition-all hover:border-hq-red hover:text-white"
            >
              <ArrowLeftIcon
                size={14}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to Insights
            </Link>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-full border border-hq-line bg-hq-panel px-4 py-2 text-xs font-mono font-semibold text-hq-mute transition-all hover:border-hq-red hover:text-white"
            >
              {copied ? (
                <>
                  <CheckIcon size={14} className="text-emerald-400" /> Link Copied
                </>
              ) : (
                <>
                  <Share2Icon size={14} /> Share Article
                </>
              )}
            </button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="animate-pulse space-y-6">
              <div className="h-4 w-32 rounded bg-white/10" />
              <div className="h-10 w-3/4 rounded bg-white/15" />
              <div className="h-6 w-full rounded bg-white/10" />
            </div>
          ) : !post ? (
            /* Not Found State */
            <div className="my-12 text-center py-12">
              <FileTextIcon size={48} className="mx-auto text-hq-mute mb-4" />
              <h1 className="font-display text-2xl font-bold">Article Not Found</h1>
              <p className="mt-2 text-hq-mute text-sm">
                The article you requested could not be located.
              </p>
              <Link
                to="/blog"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-hq-red px-6 py-2.5 text-xs font-mono font-bold uppercase text-white"
              >
                Browse All Articles
              </Link>
            </div>
          ) : (
            /* Post Header Meta */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-hq-red font-bold uppercase tracking-wider">
                <span className="rounded-full bg-hq-red/10 border border-hq-red/30 px-3 py-1 text-[10px]">
                  {post.category}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5 text-hq-mute">
                  <CalendarIcon size={13} />
                  {post.date}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5 text-hq-mute">
                  <ClockIcon size={13} />
                  {post.readTime}
                </span>
                {post.author?.name && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1.5 text-hq-mute">
                      <UserIcon size={13} />
                      {post.author.name}
                    </span>
                  </>
                )}
              </div>

              <h1 className="mt-6 font-display text-3xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-white">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-6 text-lg sm:text-xl leading-relaxed text-hq-mute border-l-2 border-hq-red pl-5 font-medium">
                  {post.excerpt}
                </p>
              )}
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      {post && (
        <main className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8">
          {/* Featured Cover Image */}
          <div className="mb-12 overflow-hidden rounded-3xl border border-hq-line bg-hq-panel shadow-2xl aspect-[16/9] relative">
            <img
              src={post.cover}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Formatted Article Body */}
          <div className="prose prose-invert prose-lg max-w-none space-y-6 text-hq-mute leading-relaxed text-base sm:text-lg [&_p]:leading-relaxed [&_p]:text-white/80 [&_h2]:text-white [&_h2]:font-display [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:pt-6 [&_h2]:pb-2 [&_h3]:text-white [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-hq-red [&_a]:font-semibold [&_a]:underline [&_a]:decoration-hq-red/60 hover:[&_a]:text-hq-red-deep hover:[&_a]:decoration-hq-red transition-colors [&_figure]:my-8 [&_figure_img]:rounded-2xl [&_figure_img]:border [&_figure_img]:border-hq-line">
            {post.contentHtml ? (
              <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            ) : post.content ? (
              post.content.map((paragraph, idx) => (
                <p key={idx} className="text-base sm:text-lg leading-relaxed text-white/85">
                  {paragraph}
                </p>
              ))
            ) : null}
          </div>

          {/* Article Footer & Author Box */}
          <div className="mt-16 border-t border-hq-line pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-hq-red/10 border border-hq-red/30 text-hq-red font-bold font-mono">
                {post.author?.name ? post.author.name.charAt(0) : "C"}
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-hq-mute">Written by</p>
                <p className="font-display text-base font-bold text-white">
                  {post.author?.name || "Circle HQ Team"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-full border border-hq-line bg-hq-panel px-5 py-2.5 text-xs font-mono font-semibold text-white hover:border-hq-red transition-colors"
            >
              {copied ? (
                <>
                  <CheckIcon size={14} className="text-emerald-400" /> Link Copied
                </>
              ) : (
                <>
                  <Share2Icon size={14} /> Share Article
                </>
              )}
            </button>
          </div>

          {/* Bottom Consultation CTA */}
          <div className="mt-16 rounded-3xl border border-hq-line bg-hq-panel p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="pointer-events-none absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-hq-red/10 blur-3xl" />
            <div className="max-w-xl">
              <span className="inline-block rounded-full bg-hq-red/10 border border-hq-red/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-hq-red mb-3">
                BUILD WITH CIRCLE HQ
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Ready to make your business run smarter?
              </h3>
              <p className="mt-2 text-hq-mute text-sm sm:text-base leading-relaxed">
                Book a short, direct consultation about your operational friction and workflow needs.
              </p>
            </div>

            <Link
              to="/consultation#booking"
              className="whitespace-nowrap inline-flex items-center gap-2 rounded-full bg-hq-red px-7 py-3.5 text-sm font-medium text-white shadow-lg hover:bg-hq-red-deep transition-all"
            >
              Book a Consultation <ArrowRightIcon size={16} />
            </Link>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <section className="mt-24 border-t border-hq-line pt-16">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-hq-red">
                    Continue Reading
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                    More Field Notes &amp; Insights
                  </h2>
                </div>
                <Link
                  to="/blog"
                  className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-hq-mute hover:text-hq-red transition-colors"
                >
                  All articles <ArrowRightIcon size={14} />
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relPost, index) => (
                  <BlogCard
                    key={relPost.id}
                    post={relPost}
                    index={index}
                    onClick={() => navigate(`/blog/${relPost.slug}`)}
                  />
                ))}
              </div>
            </section>
          )}
        </main>
      )}
    </article>
  );
}
