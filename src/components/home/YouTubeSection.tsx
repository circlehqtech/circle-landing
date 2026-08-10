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

const VIDEOS: Video[] = [
  {
    id: 'vid-1',
    youtubeId: 'L_LUpnjgPso', // Example tech/AI demo video ID
    title: 'Building a 24/7 AI WhatsApp Agent for Lagos Operations (Live Teardown)',
    duration: '18:24',
    category: 'SYSTEM BUILD',
    views: '4.2k views',
    thumbnail: '/blog_ai_solutions_sphere.png'
  },
  {
    id: 'vid-2',
    youtubeId: 'aircAruvnKk', // Example AI automation video ID
    title: 'How We Automated Client Onboarding & CRM for a Real Estate Firm',
    duration: '14:10',
    category: 'CASE STUDY',
    views: '3.8k views',
    thumbnail: '/3a189f97-4d04-43b7-ad66-524fad486114.jpg'
  },
  {
    id: 'vid-3',
    youtubeId: '2eW1p7R0_c0', // Example workshop video ID
    title: 'Circle Academy Cohort Teardown: The AI Tools Teams Actually Need',
    duration: '22:05',
    category: 'ACADEMY LIVE',
    views: '6.1k views',
    thumbnail: '/9676547c-bb5b-49a6-b12f-91640f0ea60b.jpg'
  }
];

export function YouTubeSection() {
  const [activeVideo, setActiveVideo] = useState<Video>(VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="media"
      data-sage-track="Live YouTube Videos"
      className="relative bg-hq-black py-24 text-white border-b border-hq-line">
      
      {/* Background radial glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hq-red/10 blur-[140px]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        
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
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 self-start rounded-full border border-hq-line bg-hq-panel px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:border-hq-red hover:text-hq-red hover:-translate-y-0.5">
            <YoutubeIcon size={18} className="text-hq-red" />
            Subscribe on YouTube
            <ArrowUpRightIcon size={15} />
          </a>
        </div>

        {/* Video Player + Playlist Layout */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          
          {/* Main Featured Video Container */}
          <div className="overflow-hidden rounded-3xl border border-hq-line bg-hq-panel shadow-2xl">
            <div className="relative aspect-video w-full bg-black">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <div className="relative h-full w-full cursor-pointer group" onClick={() => setIsPlaying(true)}>
                  <img
                    src={activeVideo.thumbnail}
                    alt={activeVideo.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/30" />
                  
                  {/* Big Central Play Button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-hq-red text-white shadow-[0_0_50px_rgba(224,20,44,0.6)]">
                    <PlayIcon size={32} className="ml-1 fill-white" />
                  </motion.div>

                  <span className="absolute bottom-4 right-4 rounded-md bg-black/80 px-2.5 py-1 font-mono text-xs font-semibold text-white">
                    {activeVideo.duration}
                  </span>
                </div>
              )}
            </div>

            {/* Video Title Info */}
            <div className="p-6">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-hq-red/20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-hq-red">
                  {activeVideo.category}
                </span>
                <span className="font-mono text-xs text-hq-mute">{activeVideo.views}</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-white">
                {activeVideo.title}
              </h3>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-hq-mute mb-2">
              Featured Video Playlist
            </p>

            <div className="space-y-3">
              {VIDEOS.map((vid) => {
                const isActive = activeVideo.id === vid.id;
                return (
                  <button
                    key={vid.id}
                    type="button"
                    onClick={() => {
                      setActiveVideo(vid);
                      setIsPlaying(true);
                    }}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                      isActive
                        ? 'border-hq-red bg-hq-red/10 text-white shadow-md'
                        : 'border-hq-line bg-hq-panel/60 text-hq-mute hover:border-hq-line hover:bg-hq-panel hover:text-white'
                    }`}>
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-black">
                      <img src={vid.thumbnail} alt="" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <PlayIcon size={16} className="fill-white text-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-[10px] font-bold text-hq-red">{vid.category}</span>
                      <h4 className="font-display text-sm font-semibold leading-tight text-white truncate">
                        {vid.title}
                      </h4>
                      <p className="mt-1 font-mono text-[10px] text-hq-mute">{vid.duration}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
