import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import { ScrollProgress } from "../components/common/ScrollProgress";

import { ClosingCTA } from "../components/common/ClosingCTA";
import { CircleReadout } from "../components/common/SageReadout";

export function RootLayout() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    let settleTimer = 0;

    const scrollToLocation = () => {
      if (!hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
      }

      let targetId = hash.slice(1);
      try {
        targetId = decodeURIComponent(targetId);
      } catch {
        // Keep the raw hash when it contains malformed escape sequences.
      }

      const target = document.getElementById(targetId);
      if (!target) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
      }

      const header = document.querySelector<HTMLElement>("header");
      const headerOffset = (header?.offsetHeight ?? 0) + 16;
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: Math.max(0, targetTop),
        left: 0,
        behavior: "auto",
      });
    };

    // Wait until the routed page has committed before looking up its anchor.
    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(scrollToLocation);
    });
    // Re-align once more after images and entrance animations begin settling.
    settleTimer = window.setTimeout(scrollToLocation, 250);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(settleTimer);
    };
  }, [pathname, hash, key]);

  return (
    <div className="relative min-h-screen w-full bg-hq-black text-white antialiased selection:bg-hq-red selection:text-white overflow-x-clip">
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10 min-h-screen">
        <Outlet />
      </main>
      <ClosingCTA />
      <Footer />
      <CircleReadout />
    </div>
  );
}
