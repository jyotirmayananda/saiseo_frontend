import type { Metadata } from "next";
import { Suspense } from "react";
import GalleryPageContent from "@/components/gallery/GalleryPageContent";

export const metadata: Metadata = {
  title: "Gallery & Press Coverage | Sai SEO Solution",
  description: "Photos, Independence Day celebrations, newspaper press coverage, and videos from Sai SEO Solution institute in Berhampur.",
};

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface pt-24 text-center text-muted">Loading gallery...</div>}>
      <GalleryPageContent />
    </Suspense>
  );
}

