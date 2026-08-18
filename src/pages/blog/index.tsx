import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BlogCard, BlogCardSkeleton } from "../../components/blog/BlogCard";
import type { BlogPost } from "../../components/blog/BlogCard";
import { ArticleModal } from "../../components/blog/ArticleModal";
import { SplitHeading } from "../../components/common/SplitHeading";
import { CursorField } from "../../components/common/CursorField";
import {
  ArrowRightIcon,
  FilterIcon,
  RefreshCwIcon,
  AlertCircleIcon,
  FileTextIcon,
} from "lucide-react";
import {
  fetchWpCategories,
  fetchWpPosts,
} from "../../services/wordpress";

type CategoryOption = {
  id: number | string;
  name: string;
};

export function BlogPage() {
  const [searchParams] = useSearchParams();
  const slugQuery = searchParams.get("slug");

  const [categories, setCategories] = useState<CategoryOption[]>([
    { id: "ALL", name: "ALL" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<number | string>(
    "ALL",
  );
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Fetch active categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchWpCategories();
        setCategories([
          { id: "ALL", name: "ALL" },
          ...cats.map((c) => ({ id: c.id, name: c.name.toUpperCase() })),
        ]);
      } catch (err) {
        console.error("Failed to load WP categories:", err);
      }
    };
    loadCategories();
  }, []);

  // Fetch posts dynamically whenever selected category changes
  const loadPosts = async () => {
    setLoadingPosts(true);
    setError(null);
    try {
      const data = await fetchWpPosts(selectedCategory);
      setPosts(data);
      if (data.length > 0) {
        setFeaturedPost(data[0]);
      } else {
        setFeaturedPost(null);
      }
    } catch (err) {
      console.error("Failed to load WP posts:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to connect to WordPress API.",
      );
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [selectedCategory]);

  // Open modal if slug query parameter is provided in URL
  useEffect(() => {
    if (slugQuery && posts.length > 0) {
      const matched = posts.find((p) => p.slug === slugQuery);
      if (matched) {
        setActivePost(matched);
      }
    }
  }, [slugQuery, posts]);

  return (
    <div className="relative bg-hq-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden pt-32 pb-16">
        <CursorField />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-hq-black to-transparent" />

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
              className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-hq-mute"
            >
              Scoping briefs, fixing broken marketing tracking, and training
              enterprise teams in Lagos and beyond. Live field notes from our
              WordPress API feed.
            </motion.p>
          </div>

          {/* Featured Article Banner */}
          {loadingPosts ? (
            <div className="mt-12 animate-pulse overflow-hidden rounded-3xl border border-hq-line bg-hq-panel p-8">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 aspect-[16/10] rounded-2xl bg-white/[0.04]" />
                <div className="lg:col-span-5 space-y-4">
                  <div className="h-4 w-32 rounded bg-white/10" />
                  <div className="h-8 w-3/4 rounded bg-white/15" />
                  <div className="h-4 w-full rounded bg-white/10" />
                  <div className="h-4 w-4/5 rounded bg-white/10" />
                </div>
              </div>
            </div>
          ) : featuredPost ? (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              onClick={() => setActivePost(featuredPost)}
              className="group mt-12 relative overflow-hidden rounded-3xl border border-hq-line bg-hq-panel cursor-pointer shadow-xl transition-all duration-300 hover:-translate-x-1.5 hover:-translate-y-1.5 hover:border-hq-red/60 hover:shadow-[12px_12px_0px_0px_#e0142c]"
            >
              <div className="grid lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-hq-black">
                  <img
                    src={featuredPost.cover}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
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

                    <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-white group-hover:text-hq-red transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-hq-mute line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-base font-semibold text-white group-hover:text-hq-red transition-colors">
                    <span className="h-[2px] w-5 bg-hq-red transition-all duration-300 group-hover:w-8" />
                    <span>Read full article</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>
      </section>

      {/* Main Blog Filter & Grid Section */}
      <section className="border-t border-hq-line bg-hq-black py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          {/* Category Filter Pills Bar */}
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-hq-line pb-6">
            <div className="flex items-center gap-2">
              <FilterIcon size={16} className="text-hq-red" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-hq-mute">
                Filter by category:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`rounded-full px-4 py-2 font-mono text-xs font-semibold tracking-wider transition-all duration-200 ${
                      isActive
                        ? "bg-hq-red text-white shadow-md"
                        : "bg-white/[0.03] border border-hq-line text-hq-mute hover:bg-white/[0.08] hover:text-white hover:border-hq-red/50"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error handling state */}
          {error && (
            <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-hq-red/40 bg-hq-red/10 p-6 text-white">
              <div className="flex items-center gap-3">
                <AlertCircleIcon size={20} className="text-hq-red flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Failed to fetch articles from WordPress API</p>
                  <p className="text-xs text-hq-mute mt-0.5">{error}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={loadPosts}
                className="inline-flex items-center gap-2 rounded-full bg-hq-red px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-hq-red-deep transition-colors"
              >
                <RefreshCwIcon size={14} /> Retry Request
              </button>
            </div>
          )}

          {/* Loading Skeletons Grid */}
          {loadingPosts ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <BlogCardSkeleton key={i} index={i} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            /* Empty State */
            <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-hq-line bg-hq-panel p-12 text-center">
              <FileTextIcon size={40} className="text-hq-mute mb-4" />
              <h3 className="font-display text-xl font-bold text-white">No articles found</h3>
              <p className="mt-2 max-w-md text-sm text-hq-mute">
                There are no published articles available under this category right now.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory("ALL")}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-hq-line bg-white/[0.04] px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white hover:border-hq-red hover:text-hq-red transition-colors"
              >
                Show All Articles
              </button>
            </div>
          ) : (
            /* Posts Cards Grid */
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
      </section>

      {/* Article Full View Modal */}
      <ArticleModal post={activePost} onClose={() => setActivePost(null)} />
    </div>
  );
}
