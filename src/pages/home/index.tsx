import React from "react";
import { Hero } from "../../components/home/Hero";
import { VelocityMarquee } from "../../components/home/VelocityMarquee";
import { Divisions } from "../../components/home/Divisions";
import { WhereTheyMeet } from "../../components/home/WhereTheyMeet";
import { Statement } from "../../components/home/Statement";
import { Standard } from "../../components/home/Standard";
import { HorizontalGallery } from "../../components/home/HorizontalGallery";
import { YouTubeSection } from "../../components/home/YouTubeSection";
import { Industries } from "../../components/home/Industries";
import { Blog } from "../../components/home/Blog";
import { FaqChat } from "../../components/home/FaqChat";
import { ProcessRailSection } from "../../components/timeline/ProcessRailSection";

export function HomePage() {
  return (
    <>
      <Hero />
      <VelocityMarquee />
      <Divisions />
      <WhereTheyMeet />
      <Standard />
      <Statement />
      <ProcessRailSection />
      <HorizontalGallery />
      <YouTubeSection />
      <Industries />
      <Blog />
      <FaqChat />
    </>
  );
}
