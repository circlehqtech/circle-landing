import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const INDUSTRIES = [
  'Real Estate',
  'Oil & Gas',
  'Law Firms',
  'Consultancy',
  'Financial Services',
  'Insurance',
  'Travel',
  'Logistics & Transportation',
  'Importation & Trade',
  'Government',
  'Hospitality',
  'Beauty',
  'E-commerce'
];

export function Industries() {
  const [activeIndustry, setActiveIndustry] = useState<string>('Real Estate');

  return (
    <section
      id="industries"
      data-sage-track="Industries We Cover"
      className="relative bg-[#e8e3d9] py-20 text-hq-ink sm:py-28 border-b border-hq-ink/10">
      
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-block rounded-full bg-hq-red px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              INDUSTRIES WE COVER
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-hq-ink sm:text-5xl">
              If your business runs on process, <span className="text-hq-red">we can help.</span>
            </h2>
          </div>

          <Link
            to="/consultation"
            className="group inline-flex items-center gap-2 self-start rounded-full bg-[#070708] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-hq-red hover:-translate-y-0.5">
            Get in touch
            <ArrowUpRightIcon
              size={15}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Divider line */}
        <div className="mb-12 border-b border-hq-ink/15" />

        {/* Pill Chips Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto py-4">
          {INDUSTRIES.map((industry, i) => {
            const isActive = activeIndustry === industry;
            return (
              <motion.button
                key={industry}
                type="button"
                onClick={() => setActiveIndustry(industry)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, duration: 0.3 }}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#ff0000] text-white shadow-md scale-105 border-transparent'
                    : 'border border-hq-ink/20 bg-[#ded7c8]/60 text-hq-ink hover:border-hq-ink/40 hover:bg-[#d5cebd]'
                }`}>
                {industry}
              </motion.button>
            );
          })}
        </div>

        {/* Bottom Italic Note */}
        <p className="mt-12 text-center font-serif text-sm italic text-hq-ink/70">
          And pretty much every other industry — if you can't find yours on this list,{' '}
          <Link to="/consultation" className="font-semibold text-hq-red underline underline-offset-4 hover:text-hq-ink transition-colors">
            get in touch.
          </Link>
        </p>
      </div>
    </section>
  );
}
