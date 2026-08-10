import React, { useState } from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogCard } from '../blog/BlogCard';
import type { BlogPost } from '../blog/BlogCard';
import { ArticleModal } from '../blog/ArticleModal';

const HOMEPAGE_POSTS: BlogPost[] = [
  {
    id: 'home-post-1',
    slug: 'three-questions-before-ai-agent',
    title: 'The three questions we ask before building any AI agent',
    excerpt:
      'Most automation projects fail at scoping, not engineering. Here is the filter we run every brief through.',
    category: 'AI SOLUTIONS',
    date: '12 JUL 2026',
    readTime: '6 MIN',
    cover: '/blog_ai_solutions_sphere.png'
  },
  {
    id: 'home-post-2',
    slug: 'paid-media-faster-disappointment',
    title: 'Why your paid media is buying you faster disappointment',
    excerpt:
      'Spending on a funnel with broken tracking is not marketing. A short field guide to fixing the plumbing first.',
    category: 'MARKETING',
    date: '28 JUN 2026',
    readTime: '4 MIN',
    cover: '/blog_marketing_chart.png'
  },
  {
    id: 'home-post-3',
    slug: 'what-lagos-teams-need-to-learn',
    title: 'What Lagos teams actually need to learn about AI',
    excerpt:
      'Notes from a term of Academy sessions — where teams get stuck, and the exercises that finally unstick them.',
    category: 'CIRCLE ACADEMY',
    date: '09 JUN 2026',
    readTime: '7 MIN',
    cover: '/9676547c-bb5b-49a6-b12f-91640f0ea60b.jpg'
  }
];

export function Blog() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section
      id="insights"
      data-sage-track="Insights"
      className="relative bg-[#e8e3d9] py-20 text-hq-ink sm:py-28">
      
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-block rounded-full bg-hq-red px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              INSIGHTS
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-hq-ink sm:text-5xl">
              What we learned <span className="text-hq-red">building it.</span>
            </h2>
          </div>

          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 self-start rounded-full bg-[#070708] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-hq-red hover:-translate-y-0.5">
            All articles
            <ArrowUpRightIcon
              size={15}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Divider line */}
        <div className="mb-12 border-b border-hq-ink/15" />

        {/* 3-Column Card Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {HOMEPAGE_POSTS.map((post, i) => (
            <BlogCard
              key={post.id}
              post={post}
              index={i}
              onClick={() => setActivePost(post)}
            />
          ))}
        </div>
      </div>

      <ArticleModal
        post={activePost}
        onClose={() => setActivePost(null)}
      />
    </section>
  );
}

