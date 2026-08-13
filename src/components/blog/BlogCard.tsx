import React from 'react';
import { motion } from 'framer-motion';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  cover: string;
  author?: {
    name: string;
    role?: string;
    avatar?: string;
  };
  content?: string[];
  contentHtml?: string;
  link?: string;
};

interface BlogCardProps {
  post: BlogPost;
  onClick?: () => void;
  index?: number;
}

export function BlogCard({ post, onClick, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-hq-line bg-hq-panel cursor-pointer transition-all duration-300 ease-out hover:-translate-x-1.5 hover:-translate-y-1.5 hover:border-hq-red/60 hover:shadow-[10px_10px_0px_0px_#e0142c]">
      
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-hq-black">
        <img
          src={post.cover}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover opacity-85 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:opacity-100"
        />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-hq-red px-3 py-1 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-md z-10">
          {post.category}
        </span>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-hq-red">
            {post.date} &nbsp;·&nbsp; {post.readTime}
          </p>
          {post.author?.name && (
            <p className="font-mono text-[10px] uppercase text-hq-mute truncate max-w-[120px]">
              {post.author.name}
            </p>
          )}
        </div>

        <h3 className="mt-2.5 font-display text-lg sm:text-xl font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-hq-red">
          {post.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-hq-mute flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Bottom Read Action line */}
        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-hq-red">
          <span className="h-[2px] w-4 bg-hq-red transition-all duration-300 group-hover:w-6" />
          <span>Read article</span>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Skeleton Loader Component for Blog Cards
 */
export function BlogCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <div
      style={{ animationDelay: `${index * 0.1}s` }}
      className="animate-pulse relative flex flex-col overflow-hidden rounded-2xl border border-hq-line bg-hq-panel p-0"
    >
      <div className="aspect-[16/10] w-full bg-white/[0.04]" />
      <div className="p-5 sm:p-6 space-y-4">
        <div className="h-3 w-1/3 rounded bg-white/10" />
        <div className="h-6 w-5/6 rounded bg-white/15" />
        <div className="space-y-2 pt-2">
          <div className="h-3.5 w-full rounded bg-white/10" />
          <div className="h-3.5 w-4/5 rounded bg-white/10" />
        </div>
        <div className="pt-4 flex items-center gap-2">
          <div className="h-0.5 w-4 bg-hq-red/50" />
          <div className="h-3 w-16 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}
