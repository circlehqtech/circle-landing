import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "AI Solutions", href: "/solutions" },
  { label: "Circle Academy", href: "/academy" },
  { label: "Blog", href: "/blog" },
];

const LIGHT_PAGES = ["/about", "/academy"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isLightPage = LIGHT_PAGES.includes(location.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? isLightPage
            ? "border-b border-hq-ink/10 bg-hq-bone/90 backdrop-blur-xl shadow-sm"
            : "border-b border-hq-line bg-hq-black/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <Link to="/" className="group transition-transform hover:opacity-95">
          <Logo isLightPage={isLightPage} />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className={`group relative text-sm transition-colors ${
                    isLightPage
                      ? isActive
                        ? "text-hq-ink font-semibold"
                        : "text-hq-ink/70 hover:text-hq-ink"
                      : isActive
                        ? "text-white font-semibold"
                        : "text-hq-mute hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-hq-red transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/consultation"
            className="hidden rounded-full bg-hq-red px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5 md:inline-block"
          >
            Book a Call
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`rounded-full border p-2 md:hidden ${
              isLightPage
                ? "border-hq-ink/20 text-hq-ink"
                : "border-hq-line text-white"
            }`}
          >
            {open ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden border-t md:hidden ${
              isLightPage
                ? "border-hq-ink/10 bg-hq-bone text-hq-ink"
                : "border-hq-line bg-hq-black text-white"
            }`}
          >
            <ul className="flex flex-col px-5 py-4">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={`block border-b py-3 text-sm ${
                      isLightPage
                        ? "border-hq-ink/10 text-hq-ink/80"
                        : "border-hq-line/60 text-hq-mute"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link
                  to="/consultation"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-hq-red px-5 py-3 text-center text-sm font-medium text-white"
                >
                  Book a Call
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
