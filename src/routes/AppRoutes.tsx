import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { HomePage } from '../pages/home';
import { AboutPage } from '../pages/about';
import { SolutionsPage } from '../pages/solutions';
import { AcademyPage } from '../pages/academy';
import { ConsultationPage } from '../pages/consultation';
import { BlogPage } from '../pages/blog';
import { ReadinessPage } from '../pages/readiness';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="solutions" element={<SolutionsPage />} />
        <Route path="academy" element={<AcademyPage />} />
        <Route path="consultation" element={<ConsultationPage />} />
        <Route path="readiness" element={<ReadinessPage />} />
        <Route path="readiness-check" element={<ReadinessPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
