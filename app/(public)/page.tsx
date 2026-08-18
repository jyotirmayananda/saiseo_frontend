import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Showcase from "@/components/home/Showcase";
import PressCoverage from "@/components/home/PressCoverage";
import Courses from "@/components/home/Courses";
import Services from "@/components/home/Services";
import { GalleryPreview } from "@/components/gallery/GalleryPageContent";
import ISOBadge from "@/components/home/ISOBadge";
import YouTubeSection from "@/components/home/YouTubeSection";
import Branches from "@/components/home/Branches";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Showcase />
      <PressCoverage />
      <YouTubeSection />
      <Courses />
      <Services />
      <GalleryPreview />
      <ISOBadge />
      <Branches />
      <CTA />
    </>
  );
}

