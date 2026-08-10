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
    role: string;
    avatar: string;
  };
  content?: string[];
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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-hq-ink/15 bg-[#efeae1] cursor-pointer transition-all duration-300 ease-out hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[10px_10px_0px_0px_#e0142c]">
      
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-hq-black">
        <img
          src={post.cover}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-hq-red px-3 py-1 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-md z-10">
          {post.category}
        </span>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-hq-red">
          {post.date} &nbsp;·&nbsp; {post.readTime}
        </p>

        <h3 className="mt-2.5 font-display text-lg sm:text-xl font-bold leading-snug tracking-tight text-hq-ink transition-colors group-hover:text-hq-red">
          {post.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-hq-ink/70 flex-1">
          {post.excerpt}
        </p>

        {/* Bottom Read Action line */}
        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-hq-ink transition-colors">
          <span className="h-[2px] w-4 bg-hq-red transition-all duration-300 group-hover:w-6" />
          <span>Read it</span>
        </div>
      </div>
    </motion.article>
  );
}
