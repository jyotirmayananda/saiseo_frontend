/** Local media in public/imges/ */
export const MEDIA_FOLDER = "/imges";

export interface GalleryItem {
  id: string;
  filename: string;
  title: string;
  category: "news" | "events" | "campus" | "video";
  tag: string;
  date?: string;
  description: string;
  isFeatured?: boolean;
}

export const latestIndependenceDayImages = [
  {
    id: "news-independence-day-newspaper",
    filename: "newspaper-coverage-independence-day.jpg",
    title: "Newspaper Coverage — Independence Day at Sai SEO Solution",
    category: "news" as const,
    tag: "📰 In The News",
    date: "August 2026",
    description:
      "Featured in leading Odia daily: Managing Director Uma Sankar Mohanty hoists the National Tricolor at Sai SEO Solution / Sai Skill Development Institute, Hatibandha Street, Brahmapur with honored guests.",
    isFeatured: true,
  },
  {
    id: "id-flag-hoisting-group",
    filename: "independence-day-flag-hoisting-group.jpg",
    title: "Independence Day Flag Hoisting Ceremony",
    category: "events" as const,
    tag: "🇮🇳 Independence Day",
    date: "15 August 2026",
    description:
      "Director, faculty, and students gathered for the tricolor flag hoisting celebration outside Sai SEO Solution institute campus in Brahmapur.",
    isFeatured: true,
  },
  {
    id: "id-lab-celebration-selfie",
    filename: "independence-day-lab-celebration-selfie.jpg",
    title: "Computer Lab Independence Day Celebration",
    category: "events" as const,
    tag: "🇮🇳 Independence Day",
    date: "15 August 2026",
    description:
      "Joyful celebration inside the computer lab with staff and students, featuring decorated computer workstations and tricolor flowers.",
    isFeatured: true,
  },
  {
    id: "id-flag-hoisting-wide",
    filename: "independence-day-flag-hoisting-wide.jpg",
    title: "Campus Flag Hoisting Gathering",
    category: "events" as const,
    tag: "🇮🇳 Independence Day",
    date: "15 August 2026",
    description:
      "Grand Independence Day celebration outside the institute building with students, staff, and local guests.",
    isFeatured: true,
  },
  {
    id: "id-classroom-celebration",
    filename: "independence-day-classroom-celebration.jpg",
    title: "Classroom Celebration & Student Gathering",
    category: "events" as const,
    tag: "🇮🇳 Independence Day",
    date: "15 August 2026",
    description:
      "Full batch of students and instructors participating in the Independence Day celebrations and motivational address inside the institute.",
    isFeatured: true,
  },
];

export const legacyImages = [
  "WhatsApp Image 2026-07-02 at 23.19.56.jpeg",
  "WhatsApp Image 2026-07-02 at 23.20.08.jpeg",
  "WhatsApp Image 2026-07-02 at 23.20.12.jpeg",
  "WhatsApp Image 2026-07-02 at 23.20.17.jpeg",
  "WhatsApp Image 2026-07-02 at 23.20.21.jpeg",
  "WhatsApp Image 2026-07-02 at 23.20.23.jpeg",
  "WhatsApp Image 2026-07-02 at 23.20.28.jpeg",
  "WhatsApp Image 2026-07-02 at 23.20.43.jpeg",
  "WhatsApp Image 2026-07-02 at 23.21.17.jpeg",
  "WhatsApp Image 2026-07-02 at 23.21.18.jpeg",
  "WhatsApp Image 2026-07-02 at 23.21.35.jpeg",
  "WhatsApp Image 2026-07-02 at 23.21.43 (1).jpeg",
  "WhatsApp Image 2026-07-02 at 23.21.43.jpeg",
  "WhatsApp Image 2026-07-02 at 23.21.44.jpeg",
  "WhatsApp Image 2026-07-02 at 23.21.46.jpeg",
  "WhatsApp Image 2026-07-02 at 23.22.09.jpeg",
  "WhatsApp Image 2026-07-02 at 23.22.14.jpeg",
  "WhatsApp Image 2026-07-02 at 23.22.34.jpeg",
  "WhatsApp Image 2026-07-02 at 23.25.37.jpeg",
  "WhatsApp Image 2026-07-02 at 23.25.45.jpeg",
  "WhatsApp Image 2026-07-02 at 23.27.24.jpeg",
  "WhatsApp Image 2026-07-02 at 23.28.35.jpeg",
  "WhatsApp Image 2026-07-02 at 23.28.46.jpeg",
  "WhatsApp Image 2026-07-02 at 23.29.03.jpeg",
  "WhatsApp Image 2026-07-02 at 23.29.24.jpeg",
  "WhatsApp Image 2026-07-02 at 23.29.32.jpeg",
  "WhatsApp Image 2026-07-02 at 23.29.33.jpeg",
  "WhatsApp Image 2026-07-02 at 23.29.38.jpeg",
  "WhatsApp Image 2026-07-02 at 23.29.42.jpeg",
  "WhatsApp Image 2026-07-02 at 23.29.48.jpeg",
  "WhatsApp Image 2026-07-02 at 23.30.56.jpeg",
  "WhatsApp Image 2026-07-02 at 23.31.08.jpeg",
  "WhatsApp Image 2026-07-02 at 23.31.12.jpeg",
  "WhatsApp Video 2026-07-02 at 23.19.40.jpeg",
] as const;

/** All gallery images with new Independence Day & newspaper coverage at the front */
export const galleryImages = [
  "newspaper-coverage-independence-day.jpg",
  "independence-day-flag-hoisting-group.jpg",
  "independence-day-lab-celebration-selfie.jpg",
  "independence-day-flag-hoisting-wide.jpg",
  "independence-day-classroom-celebration.jpg",
  ...legacyImages,
] as const;

export const galleryVideos = [
  "WhatsApp Video 2026-07-02 at 23.15.53.mp4",
  "WhatsApp Video 2026-07-02 at 23.18.45.mp4",
  "WhatsApp Video 2026-07-02 at 23.19.40.mp4",
  "WhatsApp Video 2026-07-02 at 23.19.55.mp4",
  "WhatsApp Video 2026-07-02 at 23.21.45.mp4",
  "WhatsApp Video 2026-07-02 at 23.31.07 (1).mp4",
  "WhatsApp Video 2026-07-02 at 23.31.07.mp4",
  "WhatsApp Video 2026-07-02 at 23.31.08.mp4",
  "WhatsApp Video 2026-07-02 at 23.31.14 (1).mp4",
  "WhatsApp Video 2026-07-02 at 23.31.14.mp4",
] as const;

/** All structured gallery items with rich details */
export const allGalleryItems: GalleryItem[] = [
  ...latestIndependenceDayImages,
  ...legacyImages.map((filename, idx) => ({
    id: `legacy-${idx}`,
    filename,
    title: `Sai SEO Institute Campus & Classroom ${idx + 1}`,
    category: "campus" as const,
    tag: "🏫 Campus & Labs",
    description: "Practical learning, hands-on computer training, and student activities at Sai SEO Solution.",
  })),
];

export function mediaUrl(filename: string): string {
  return `${MEDIA_FOLDER}/${encodeURIComponent(filename)}`;
}

export function pickImage(index: number): string {
  return mediaUrl(legacyImages[index % legacyImages.length]);
}

export function pickVideo(index: number): string {
  return mediaUrl(galleryVideos[index % galleryVideos.length]);
}

