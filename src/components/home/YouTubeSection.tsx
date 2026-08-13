import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, ArrowUpRightIcon } from 'lucide-react';

const YoutubeIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3v6Z" />
  </svg>
);

type Video = {
  id: string;
  youtubeId: string;
  title: string;
  duration: string;
  category: string;
  views: string;
  thumbnail: string;
};

const FEATURED_VIDEO: Video = {
  id: 'circle-video-1',
  youtubeId: '3V8xIU0btXM',
  title: 'Circle HQ — Building Intelligent AI Systems & Workflow Automation',
  duration: 'Featured',
  category: 'FEATURED DEMO',
  views: 'Live Video',
  thumbnail: 'https://img.youtube.com/vi/3V8xIU0btXM/hqdefault.jpg'
};

export function YouTubeSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="media"
      data-sage-track="Live YouTube Video"
      className="relative bg-hq-black py-24 text-white border-b border-hq-line overflow-hidden"
    >
      {/* Background radial glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hq-red/10 blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-hq-red">
              <YoutubeIcon size={14} className="text-hq-red" /> LIVE FROM YOUTUBE
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
              Watch how we build & teardown <span className="text-hq-red">systems live.</span>
            </h2>
          </div>

          <a
            href="https://youtu.be/3V8xIU0btXM"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 self-start rounded-full border border-hq-line bg-hq-panel px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:border-hq-red hover:text-hq-red hover:-translate-y-0.5"
          >
            <YoutubeIcon size={18} className="text-hq-red" />
            Watch on YouTube
            <ArrowUpRightIcon size={15} />
          </a>
        </div>

        {/* Full-width Main Video Player Container */}
        <div className="overflow-hidden rounded-3xl border border-hq-line bg-hq-panel shadow-2xl transition-all duration-300 hover:border-hq-red/40">
          <div className="relative aspect-video w-full bg-black">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${FEATURED_VIDEO.youtubeId}?autoplay=1&rel=0`}
                title={FEATURED_VIDEO.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : (
              <div
                className="relative h-full w-full cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <img
                  src={FEATURED_VIDEO.thumbnail}
                  alt={FEATURED_VIDEO.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback thumbnail if YouTube high-res is blocked or slow
                    (e.target as HTMLImageElement).src = '/blog_ai_solutions_sphere.png';
                  }}
                />
                <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/35" />

                {/* Big Central Play Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-hq-red text-white shadow-[0_0_50px_rgba(224,20,44,0.6)]"
                >
                  <PlayIcon size={32} className="ml-1 fill-white" />
                </motion.div>

                <span className="absolute bottom-4 right-4 rounded-md bg-black/80 px-3 py-1 font-mono text-xs font-semibold text-white">
                  Watch Video
                </span>
              </div>
            )}
          </div>

          {/* Video Title & Metadata */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-hq-line">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-hq-red/20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-hq-red">
                  {FEATURED_VIDEO.category}
                </span>
                <span className="font-mono text-xs text-hq-mute">Official Video</span>
              </div>
              <h3 className="mt-3 font-display text-xl sm:text-2xl font-semibold leading-snug text-white">
                {FEATURED_VIDEO.title}
              </h3>
            </div>

            <a
              href="https://youtu.be/3V8xIU0btXM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-hq-red/40 bg-hq-red/10 px-5 py-2.5 text-xs font-mono font-semibold text-hq-red transition-colors hover:bg-hq-red hover:text-white"
            >
              Open in YouTube <ArrowUpRightIcon size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
