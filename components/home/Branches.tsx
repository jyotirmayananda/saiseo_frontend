"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Compass } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { images } from "@/lib/images";

const location = {
  name: "Sai SEO Solution",
  tag: "Our Campus",
  address: "Hatibandha Street, Brahmapur",
  phones: ["7978258180"],
  mapUrl: "https://maps.app.goo.gl/RGQptfJFbHUzM5seA",
  embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.3656460861507!2d84.7962752!3d19.3099335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3d51dc91d23eb9%3A0xe5a3d10c00f02b92!2sSai+SEO+Solution!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
};

export default function Branches() {
  const [activeTab, setActiveTab] = useState<"map" | "photo">("map");

  return (
    <section id="location" className="section-padding bg-white">
      <div className="container-main">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              label="Location"
              title="Visit us in Berhampur"
              description="Find us at Hatibandha Street, Brahmapur — walk in or call to schedule a campus visit."
              align="left"
            />

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-hover mt-8 p-5"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-teal-dark">
                {location.tag}
              </span>
              <h3 className="mt-1 font-heading text-lg font-semibold text-brand">
                {location.name}
              </h3>
              
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-3 flex items-start gap-2 text-sm text-muted hover:text-brand transition-colors"
              >
                <MapPin size={15} className="mt-0.5 shrink-0 text-teal group-hover:scale-110 transition-transform" />
                <span className="underline decoration-dotted decoration-slate-300 group-hover:decoration-brand">
                  {location.address}
                </span>
              </a>

              <div className="mt-4 space-y-1">
                {location.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="flex items-center gap-2 text-sm font-medium text-brand hover:text-teal-dark transition-colors"
                  >
                    <Phone size={14} className="text-teal" />
                    +91 {phone}
                  </a>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-teal-dark hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
                >
                  <Compass size={16} />
                  Get Directions
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card overflow-hidden shadow-card flex flex-col"
          >
            {/* View Mode Toggle Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-surface px-4 py-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Campus Location
              </span>
              <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("map")}
                  className={`rounded-md px-3 py-1.5 transition-all duration-200 ${
                    activeTab === "map"
                      ? "bg-white text-brand shadow-sm font-medium"
                      : "text-muted hover:text-brand"
                  }`}
                >
                  Map View
                </button>
                <button
                  onClick={() => setActiveTab("photo")}
                  className={`rounded-md px-3 py-1.5 transition-all duration-200 ${
                    activeTab === "photo"
                      ? "bg-white text-brand shadow-sm font-medium"
                      : "text-muted hover:text-brand"
                  }`}
                >
                  Office Photo
                </button>
              </div>
            </div>

            {/* Media Container */}
            <div className="relative aspect-[4/3] lg:aspect-square flex-1 bg-slate-50">
              {activeTab === "map" ? (
                <iframe
                  src={location.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                ></iframe>
              ) : (
                <Image
                  src={images.branch}
                  alt="Sai SEO Solution office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              )}
            </div>

            <div className="border-t border-slate-100 bg-surface p-5">
              <p className="font-heading font-semibold text-brand">Open for admissions</p>
              <p className="mt-1 text-sm text-muted">
                Walk in or call to schedule a campus visit.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

