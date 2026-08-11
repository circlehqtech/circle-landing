import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRightIcon, CheckIcon, MapPinIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';

export function ContactCTA() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const glowY = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [teamSize, setTeamSize] = useState('2–10');
  const [serviceType, setServiceType] = useState('Not sure yet');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const TEAM_SIZES = ['Just me', '2–10', '11–50', '50+'];
  const SERVICE_TYPES = ['AI Solutions', 'Academy', 'Both', 'Not sure yet'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      data-sage-track="Contact"
      className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="hq-grain relative overflow-hidden rounded-3xl border border-hq-line bg-hq-panel p-8 sm:p-14 shadow-2xl">
        
        {/* Rotating beam behind the panel edge */}
        <motion.span
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="pointer-events-none absolute -inset-[60%] opacity-[0.35]"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, rgba(224,20,44,0.55) 25deg, transparent 60deg, transparent 360deg)',
            maskImage: 'radial-gradient(circle, transparent 55%, black 58%)'
          }} />
        
        <span className="pointer-events-none absolute inset-px rounded-[calc(1.5rem-1px)] bg-hq-panel" />
        <motion.span
          aria-hidden="true"
          style={{ y: glowY }}
          className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-hq-red/15 blur-[100px]" />

        <div className="relative grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Column: Address, Contact Info & Office Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-hq-red font-semibold">
                BOOK YOUR CONSULTATION
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-white">
                Ready to Run Smarter?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-hq-mute">
                Whether you need a system built, a team trained, or both — every engagement starts with a conversation, not a sales pitch.
              </p>
            </div>

            {/* Find Us Block */}
            <div className="rounded-2xl border border-hq-line bg-hq-black/60 p-6 space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-hq-red font-semibold">
                FIND US
              </p>
              <div className="space-y-3.5 text-sm sm:text-base">
                <div className="flex items-start gap-3 text-white/90">
                  <MapPinIcon size={18} className="mt-0.5 shrink-0 text-hq-red" />
                  <span>12 Herbert Macaulay Way, Yaba, Lagos, Nigeria</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <MailIcon size={18} className="shrink-0 text-hq-red" />
                  <a href="mailto:hello@circlehq.africa" className="hover:text-hq-red transition-colors">
                    hello@circlehq.africa
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <PhoneIcon size={18} className="shrink-0 text-hq-red" />
                  <a href="tel:+2348000000000" className="hover:text-hq-red transition-colors">
                    +234 800 000 0000
                  </a>
                </div>
              </div>
            </div>

            {/* Office Hours Block */}
            <div className="rounded-2xl border border-hq-line bg-hq-black/60 p-6 space-y-2.5">
              <h3 className="font-display text-xl font-semibold text-white">
                Office hours
              </h3>
              <p className="text-sm leading-relaxed text-hq-mute">
                Monday to Friday, 9am – 6pm WAT. Academy cohort sessions run Tuesday and Thursday evenings plus Saturday mornings.
              </p>
            </div>
          </div>

          {/* Right Column: Form Controls */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="rounded-2xl border border-hq-red/40 bg-hq-black/80 p-8 text-center sm:p-12 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-hq-red text-white mx-auto">
                  <CheckIcon size={24} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white">Consultation Request Received</h3>
                <p className="text-sm text-hq-mute max-w-md mx-auto">
                  Thank you{name ? `, ${name}` : ''}. We have received your details and will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name, Email & Company inputs */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-hq-mute mb-2">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ada Obi"
                      className="w-full rounded-xl border border-hq-line bg-hq-black px-4 py-3 text-sm text-white placeholder:text-hq-mute/50 outline-none focus:border-hq-red transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-hq-mute mb-2">
                      WORK EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-hq-line bg-hq-black px-4 py-3 text-sm text-white placeholder:text-hq-mute/50 outline-none focus:border-hq-red transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-hq-mute mb-2">
                      COMPANY NAME
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full rounded-xl border border-hq-line bg-hq-black px-4 py-3 text-sm text-white placeholder:text-hq-mute/50 outline-none focus:border-hq-red transition-colors"
                    />
                  </div>
                </div>

                {/* Team Size Pills */}
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-hq-mute mb-2.5">
                    TEAM SIZE
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {TEAM_SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setTeamSize(size)}
                        className={`rounded-full px-5 py-2 text-xs font-mono font-medium transition-all duration-200 ${
                          teamSize === size
                            ? 'bg-hq-red text-white shadow-md shadow-hq-red/30'
                            : 'border border-hq-line bg-hq-black/60 text-hq-mute hover:border-white/40 hover:text-white'
                        }`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* What Are You After Pills */}
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-hq-mute mb-2.5">
                    WHAT ARE YOU AFTER?
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {SERVICE_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setServiceType(type)}
                        className={`rounded-full px-5 py-2 text-xs font-mono font-medium transition-all duration-200 ${
                          serviceType === type
                            ? 'bg-hq-red text-white shadow-md shadow-hq-red/30'
                            : 'border border-hq-line bg-hq-black/60 text-hq-mute hover:border-white/40 hover:text-white'
                        }`}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea */}
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-hq-mute mb-2">
                    WHERE DOES IT HURT MOST?
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="We re-enter every order by hand, and nobody sees the numbers until month end..."
                    className="w-full rounded-xl border border-hq-line bg-hq-black px-4 py-3.5 text-sm text-white placeholder:text-hq-mute/50 outline-none focus:border-hq-red transition-colors"
                  />
                </div>

                {/* Submit button & note */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                  <MagneticButton
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-hq-red px-8 py-3.5 text-sm font-medium text-white shadow-lg hover:bg-hq-red-deep transition-all">
                    Book a Consultation
                  </MagneticButton>
                  <span className="font-mono text-xs text-hq-mute/80">
                    No obligation. No sales pitch.
                  </span>
                </div>

              </form>
            )}
          </div>

        </div>
      </motion.div>
    </section>
  );
}
