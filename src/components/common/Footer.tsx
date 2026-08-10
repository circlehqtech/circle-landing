import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const COLUMNS = [
  {
    title: 'Pages',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'AI Solutions', href: '/solutions' },
      { label: 'Circle Academy', href: '/academy' },
      { label: 'Book Consultation', href: '/consultation' },
      { label: 'Blog', href: '/blog' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'The Standard', href: '/#standard' },
      { label: 'Student Outreach', href: '/academy#free-programmes' },
      { label: 'Readiness Check', href: '/consultation#readiness' }
    ]
  },
  {
    title: 'Connect',
    links: [
      { label: 'hello@circlehq.co', href: 'mailto:hello@circlehq.co' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Instagram', href: 'https://instagram.com' }
    ]
  }
];

export function Footer() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const wordX = useTransform(scrollYProgress, [0, 1], ['-8%', '4%']);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.6], [0.04, 0.12]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-hq-line bg-hq-black">
      <div className="relative mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_repeat(3,minmax(0,0.6fr))]">
          <div>
            <Link to="/" className="inline-block transition-transform hover:opacity-95">
              <Logo theme="dark" showTagline={true} />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-hq-mute">
              Smart AI Solutions & Workforce Capability. Built in Lagos, operating worldwide.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-hq-mute">
                {col.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => {
                  const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto:');
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="group inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-hq-red">
                          <span className="h-px w-0 bg-hq-red transition-all duration-300 group-hover:w-4" />
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="group inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-hq-red">
                          <span className="h-px w-0 bg-hq-red transition-all duration-300 group-hover:w-4" />
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-hq-line pt-6 text-xs text-hq-mute sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Circle HQ. All rights reserved.</p>
          <p className="font-mono uppercase tracking-widest">Lagos, Nigeria</p>
        </div>
      </div>

      <motion.p
        aria-hidden="true"
        style={{ x: wordX, opacity: wordOpacity }}
        className="pointer-events-none w-max select-none whitespace-nowrap px-5 pb-2 font-display text-[22vw] font-extrabold leading-[0.8] tracking-[-0.05em] text-white">
        CIRCLE HQ
      </motion.p>
    </footer>
  );
}
