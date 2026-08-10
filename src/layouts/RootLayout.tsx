import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ScrollProgress } from '../components/common/ScrollProgress';
import { SageReadout } from '../components/common/SageReadout';

import { ClosingCTA } from '../components/common/ClosingCTA';

export function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen w-full bg-hq-black text-white antialiased selection:bg-hq-red selection:text-white overflow-x-clip">
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10 min-h-screen">
        <Outlet />
      </main>
      <ClosingCTA />
      <Footer />
      <SageReadout />
    </div>
  );
}
