import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { HomePage } from '../pages/home';
import { AboutPage } from '../pages/about';
import { SolutionsPage } from '../pages/solutions';
import { AllSolutionsPage } from '../pages/solutions/AllSolutionsPage';
import { AcademyPage } from '../pages/academy';
import { ConsultationPage } from '../pages/consultation';
import { BlogPage } from '../pages/blog';
import { SingleBlogPage } from '../pages/blog/SingleBlogPage';
import { ReadinessPage } from '../pages/readiness';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="solutions" element={<SolutionsPage />} />
        <Route path="solutions/all" element={<AllSolutionsPage />} />
        <Route path="all-solutions" element={<AllSolutionsPage />} />
        <Route path="all-products" element={<AllSolutionsPage />} />
        <Route path="products" element={<AllSolutionsPage />} />
        <Route path="academy" element={<AcademyPage />} />
        <Route path="consultation" element={<ConsultationPage />} />
        <Route path="readiness" element={<ReadinessPage />} />
        <Route path="readiness-check" element={<ReadinessPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<SingleBlogPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
