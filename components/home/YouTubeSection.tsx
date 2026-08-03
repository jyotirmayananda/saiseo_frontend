"use client";

import { useState } from "react";
import { Play, ArrowUpRight, Award, BookOpen, Wrench, Video } from "lucide-react";
import { motion } from "framer-motion";

const channelUrl = "https://www.youtube.com/@saiseosolution";

const YoutubeIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
  >
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.025 0 12 0 12s0 3.975.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.525 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const videos = [
  {
    title: "Selective MCQ & Objective Questions for CHSE +2 IT Exam",
    category: "IT Exam Preparation",
    duration: "15 mins",
    icon: Award,
    stats: "Exam Selective Q&A",
    youtubeId: "tn-G1QZeFvs",
  },
  {
    title: "Windows XP Complete Installation Guide & Setup",
    category: "Operating Systems",
    duration: "10 mins",
    icon: Wrench,
    stats: "Hardware & Setup Class",
    youtubeId: "OTEu5AxmXis",
  },
  {
    title: "How to Install Ubuntu Step-by-Step in Odia",
    category: "Linux Tutorials",
    duration: "18 mins",
    icon: BookOpen,
    stats: "Ubuntu OS Installation",
    youtubeId: "Sv34CKgBdec",
  },
];

export default function YouTubeSection() {
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  return (
    <section className="section-padding bg-slate-950 text-white overflow-hidden relative">
      {/* Background ambient glow effects */}
      <div className="absolute -left-1/4 -top-1/4 w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute -right-1/4 -bottom-1/4 w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Header Block */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end border-b border-white/10 pb-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red-500">
              <YoutubeIcon size={14} className="text-red-500 fill-red-500" />
              YouTube Channel
            </span>
            <h2 className="headline-lg mt-3 text-white">
              Learn Computer Skills <span className="text-red-500">Online</span>
            </h2>
            <p className="mt-4 text-slate-400">
              Watch our tutorials, student guides, and class previews directly. Select a video from the playlist below to start watching right now!
            </p>
          </div>
          
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#FF0000] hover:bg-[#D90000] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(255,0,0,0.3)] transition-all duration-300"
          >
            <YoutubeIcon size={18} className="fill-white" />
            Subscribe on YouTube
            <ArrowUpRight size={16} />
          </motion.a>
        </div>

        {/* Player and Playlist Layout */}
        <div className="grid gap-8 mt-10 lg:grid-cols-12">
          {/* Main Video Player (Column 1) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black border border-white/10 shadow-2xl shadow-red-950/20">
              <iframe
                key={activeVideo.youtubeId}
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=0&mute=0`}
                title={activeVideo.title}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              ></iframe>
            </div>
            
            <div className="mt-2">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-500/10 px-2.5 py-1 rounded-md">
                Now Playing
              </span>
              <h3 className="font-heading text-xl font-bold mt-3 text-white leading-snug">
                {activeVideo.title}
              </h3>
              <p className="text-sm text-slate-400 mt-2 flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Video size={14} className="text-teal" />
                  {activeVideo.category}
                </span>
                <span>•</span>
                <span>{activeVideo.duration} Overview</span>
              </p>
            </div>
          </div>

          {/* Sidebar Playlist (Column 2) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h4 className="font-heading text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">
              Course Playlists ({videos.length} Lectures)
            </h4>
            
            <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
              {videos.map((video, idx) => {
                const Icon = video.icon;
                const isActive = video.youtubeId === activeVideo.youtubeId;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveVideo(video)}
                    className={`flex flex-col justify-between text-left p-4 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "bg-white/10 border-red-500/50 shadow-md shadow-red-950/20"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between w-full gap-3">
                      <div className="min-w-0">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          isActive ? "text-red-400" : "text-slate-400"
                        }`}>
                          {video.category}
                        </span>
                        <h5 className={`font-heading text-sm font-semibold mt-1 leading-snug line-clamp-2 ${
                          isActive ? "text-white" : "text-slate-200"
                        }`}>
                          {video.title}
                        </h5>
                      </div>
                      <span className="text-[10px] shrink-0 bg-white/10 px-2 py-0.5 rounded-full text-slate-300">
                        {video.duration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between w-full mt-4 border-t border-white/5 pt-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Icon size={12} className="text-teal" />
                        <span>{video.stats}</span>
                      </div>
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-red-600 text-white"
                          : "bg-white/10 text-slate-300 hover:bg-red-600 hover:text-white"
                      }`}>
                        <Play size={12} className="fill-current ml-0.5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
