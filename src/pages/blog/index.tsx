import React, { useState } from "react";
import { motion } from "framer-motion";
import { BlogCard } from "../../components/blog/BlogCard";
import type { BlogPost } from "../../components/blog/BlogCard";
import { ArticleModal } from "../../components/blog/ArticleModal";
import { SplitHeading } from "../../components/common/SplitHeading";
import { ClosingCTA } from "../../components/common/ClosingCTA";
import { CursorField } from "../../components/common/CursorField";
import { ArrowRightIcon, SparklesIcon, FilterIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "three-questions-before-ai-agent",
    title: "The three questions we ask before building any AI agent",
    excerpt:
      "Most automation projects fail at scoping, not engineering. Here is the filter we run every brief through before touching code.",
    category: "AI SOLUTIONS",
    date: "12 JUL 2026",
    readTime: "6 MIN",
    cover: "/blog_ai_solutions_sphere.png",
    content: [
      "Most automation projects fail at scoping, not engineering. Here is the filter we run every brief through before touching a line of code.",
      "1. Where does operational drag actually cost money? Not every repetitive task needs AI. We look for high-frequency bottlenecks where human error creates compound delays down the line.",
      "2. Is data structured enough for deterministic output? If your inputs are ambiguous or inconsistent, an AI model will only accelerate bad decisions. We enforce strict JSON schema validation at every step.",
      "3. Who owns human-in-the-loop review? Pure autonomous agents are a myth in production. Every resilient architecture includes explicit confidence thresholds that gracefully escalate edge cases to human operators.",
    ],
  },
  {
    id: "post-2",
    slug: "paid-media-faster-disappointment",
    title: "Why your paid media is buying you faster disappointment",
    excerpt:
      "Spending on a funnel with broken tracking is not marketing. A short field guide to fixing the plumbing first.",
    category: "MARKETING",
    date: "28 JUN 2026",
    readTime: "4 MIN",
    cover: "/blog_marketing_chart.png",
    content: [
      "Spending ad budget on a funnel with broken conversion tracking isn’t marketing—it’s subsidizing ad platforms.",
      "With browser privacy changes and third-party cookie deprecation, client-side pixel tracking misses up to 40% of conversion signals. If your ad manager is optimizing blindly, cost per acquisition skyrockets.",
      "Fixing the plumbing requires server-side Conversion APIs (CAPI), first-party telemetry, and automated lead scoring that feeds real revenue signals back to ad platforms within minutes.",
    ],
  },
  {
    id: "post-3",
    slug: "what-lagos-teams-need-to-learn",
    title: "What Lagos teams actually need to learn about AI",
    excerpt:
      "Notes from a term of Academy sessions — where teams get stuck, and the exercises that finally unstick them.",
    category: "CIRCLE ACADEMY",
    date: "09 JUN 2026",
    readTime: "7 MIN",
    cover: "/9676547c-bb5b-49a6-b12f-91640f0ea60b.jpg",
    content: [
      "After training over 200 operational professionals across Lagos enterprises, patterns emerge about where teams hit roadblocks.",
      "The single biggest trap is treating AI as a conversational assistant rather than a structured workflow engine. Basic prompt engineering tips are useless when your team needs to process 500 vendor invoices weekly.",
      "In Circle Academy sessions, we transition teams from chat boxes to API tool execution, schema-constrained prompts, and automated exception routing. That is when productivity multiplies.",
    ],
  },
  {
    id: "post-4",
    slug: "deterministic-workflows-vs-raw-llm-prompts",
    title: "Why deterministic workflows beat raw LLM prompts every time",
    excerpt:
      "Prompt engineering is a temporary band-aid. True operational AI requires state machines, schema validation, and fallback handlers.",
    category: "AI SOLUTIONS",
    date: "22 MAY 2026",
    readTime: "5 MIN",
    cover: "/04142454-c400-4763-b6ad-67e42d6533fd.jpg",
    content: [
      "Relying on a single massive prompt to run a multi-step business process is asking for failure. LLMs are probabilistic engines, not rigid databases.",
      "Production-grade AI systems decompose complex tasks into deterministic state machines. Each state performs a micro-task, validates output schemas strictly, and logs trace data.",
      "When an LLM call fails schema checks, fallback handlers immediately re-prompt with explicit error context or branch to a human fallback.",
    ],
  },
  {
    id: "post-5",
    slug: "ai-readiness-african-enterprises",
    title: "Building AI readiness in African enterprises: Ground realities",
    excerpt:
      "Data sovereignty, legacy ERPs, and retention are unique here. How we design AI systems for real-world reliability.",
    category: "CIRCLE ACADEMY",
    date: "14 MAY 2026",
    readTime: "8 MIN",
    cover: "/academy_workshop_training.png",
    content: [
      "African business operations face unique dynamics—from legacy on-premise ERPs to varying bandwidth stability and custom regulatory compliance rules.",
      "Building operational AI for regional leaders requires offline-first queue resilience, local data sovereignty compliance, and training programs tailored to local business workflows.",
      "We share our framework for evaluating enterprise readiness, building hybrid cloud pipelines, and retaining skilled internal talent.",
    ],
  },
  {
    id: "post-6",
    slug: "hidden-cost-manual-data-entry-sales",
    title: "The hidden cost of manual data entry in modern sales funnels",
    excerpt:
      "How automated lead enrichment and instant qualification cut response times from 4 hours down to 40 seconds.",
    category: "MARKETING",
    date: "02 MAY 2026",
    readTime: "4 MIN",
    cover: "/3d6765c2-4e61-4a52-9189-9e5cc900abba.jpg",
    content: [
      "Lead response time dictates conversion rates. Research shows reaching out within 5 minutes increases conversion odds by 9x compared to waiting an hour.",
      "Yet sales reps spend over 60% of their workday manually researching prospects, copying CRM entries, and sending template emails.",
      "Automating lead enrichment, intent scoring, and immediate custom outreach frees up your sales team to do what humans do best: close deals.",
    ],
  },
];

const CATEGORIES = ["ALL", "AI SOLUTIONS", "MARKETING", "CIRCLE ACADEMY"];

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const filteredPosts =
    selectedCategory === "ALL"
      ? BLOG_POSTS
      : BLOG_POSTS.filter(
          (post) => post.category.toUpperCase() === selectedCategory,
        );

  const featuredPost = BLOG_POSTS[0];

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
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-hq-red/30 bg-hq-red/[0.08] px-3.5 py-1.5 font-mono text-xs text-hq-red font-semibold"
            >
              Insights & Field Notes
            </motion.p>

            <SplitHeading
              text="What we learned building smart AI systems."
              muted={["building", "smart", "AI", "systems."]}
              mutedClassName="text-hq-red"
              className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-hq-ink sm:text-6xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-hq-ink/75"
            >
              Scoping briefs, fixing broken marketing tracking, and training
              enterprise teams in Lagos and beyond. Short, practical guides from
              our work in the field.
            </motion.p>
          </div>

          {/* Featured Article Banner */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            onClick={() => setActivePost(featuredPost)}
            className="group mt-12 relative overflow-hidden rounded-3xl border border-hq-ink/15 bg-[#efeae1] cursor-pointer shadow-md transition-all duration-300 hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_0px_#e0142c]"
          >
            <div className="grid lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-hq-black">
                <img
                  src={featuredPost.cover}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-hq-red px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white shadow-md">
                  FEATURED • {featuredPost.category}
                </span>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-hq-red">
                    {featuredPost.date} &nbsp;·&nbsp; {featuredPost.readTime}
                  </p>

                  <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-hq-ink group-hover:text-hq-red transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-hq-ink/75">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-base font-semibold text-hq-ink">
                  <span className="h-[2px] w-5 bg-hq-red transition-all duration-300 group-hover:w-8" />
                  <span>Read full article</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Blog Filter & Grid Section */}
      <section className="border-t border-hq-ink/10 bg-hq-boneDeep py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          {/* Category Filter Pills Bar */}
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-hq-ink/10 pb-6">
            <div className="flex items-center gap-2">
              <FilterIcon size={16} className="text-hq-red" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-hq-ink/60">
                Filter by category:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-2 font-mono text-xs font-semibold tracking-wider transition-all duration-200 ${
                      isActive
                        ? "bg-hq-red text-white shadow-md"
                        : "bg-white/80 border border-hq-ink/15 text-hq-ink hover:bg-white hover:border-hq-red"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid (3 Columns matching user screenshot style) */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, i) => (
              <BlogCard
                key={post.id}
                post={post}
                index={i}
                onClick={() => setActivePost(post)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Article Full View Modal */}
      <ArticleModal post={activePost} onClose={() => setActivePost(null)} />
    </div>
  );
}
