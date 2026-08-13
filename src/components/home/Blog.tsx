import React, { useEffect, useState } from 'react';
import { ArrowUpRightIcon, RefreshCwIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogCard, BlogCardSkeleton } from '../blog/BlogCard';
import type { BlogPost } from '../blog/BlogCard';
import { ArticleModal } from '../blog/ArticleModal';
import { fetchWpPosts } from '../../services/wordpress';

const FALLBACK_POSTS: BlogPost[] = [
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
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetched = await fetchWpPosts();
      setPosts(fetched.slice(0, 3));
    } catch (err) {
      console.error('Error fetching home blog posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load posts');
      setPosts(FALLBACK_POSTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <section
      id="insights"
      data-sage-track="Insights"
      className="relative bg-hq-black border-t border-hq-line py-20 text-white sm:py-28">
      
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-block rounded-full bg-hq-red px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              INSIGHTS
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
              What we learned <span className="text-hq-red">building it.</span>
            </h2>
          </div>

          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-hq-line bg-hq-panel px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:border-hq-red hover:bg-hq-red hover:-translate-y-0.5">
            All articles
            <ArrowUpRightIcon
              size={15}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Divider line */}
        <div className="mb-12 border-b border-hq-line" />

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <BlogCardSkeleton key={i} index={i} />
            ))}
          </div>
        ) : error ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-xl border border-hq-line bg-white/[0.02] p-4 text-xs font-mono text-hq-mute">
              <span>API connection issue — showing cached articles.</span>
              <button
                type="button"
                onClick={loadPosts}
                className="inline-flex items-center gap-1.5 rounded-full border border-hq-line bg-hq-panel px-3 py-1 text-white hover:border-hq-red hover:text-hq-red transition-colors"
              >
                <RefreshCwIcon size={12} /> Retry API
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post, i) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={i}
                  onClick={() => setActivePost(post)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post, i) => (
              <BlogCard
                key={post.id}
                post={post}
                index={i}
                onClick={() => setActivePost(post)}
              />
            ))}
          </div>
        )}
      </div>

      <ArticleModal
        post={activePost}
        onClose={() => setActivePost(null)}
      />
    </section>
  );
}

