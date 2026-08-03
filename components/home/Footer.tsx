"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t border-white/10 bg-brand text-slate-100 overflow-hidden shadow-[0_-12px_30px_rgba(0,0,0,0.65)]"
      style={{
        backgroundImage: "url('/footer_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 24px 48px rgba(0, 0, 0, 0.95), inset 0 -24px 48px rgba(0, 0, 0, 0.95)",
      }}
    >
      {/* Dark tint overlay for maximum text readability */}
      <div className="absolute inset-0 bg-slate-950/96 z-0" />

      <div className="relative container-main py-12 pb-8 sm:py-14 z-10 filter drop-shadow-[0_2px_8px_rgba(0,0,0,1)]" style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.95)" }}>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="Sai SEO" width={40} height={40} />
              <span className="font-heading text-sm font-bold text-white">
                Sai SEO Solution
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              A Unit of Software & Hardware Solution. Quality computer education
              and IT services in Berhampur, Odisha.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/#courses", label: "Courses" },
                { href: "/#services", label: "Services" },
                { href: "/gallery", label: "Gallery" },
                { href: "/#location", label: "Location" },
                { href: "/result", label: "Check Result" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="https://maps.app.goo.gl/RGQptfJFbHUzM5seA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-white transition-colors"
                >
                  <MapPin size={15} className="mt-0.5 shrink-0 text-teal-light" />
                  Hatibandha Street, Brahmapur
                </a>
              </li>
              <li>
                <a href="tel:7978258180" className="flex items-center gap-2 hover:text-white">
                  <Phone size={15} className="text-teal-light" />
                  +91 7978258180
                </a>
              </li>
              <li>
                <a href="mailto:umasankar5747@gmail.com" className="flex items-center gap-2 hover:text-white">
                  <Mail size={15} className="text-teal-light" />
                  umasankar5747@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@saiseosolution"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-white transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width={15}
                    height={15}
                    className="mt-0.5 shrink-0 text-teal-light hover:scale-105 transition-transform"
                  >
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.025 0 12 0 12s0 3.975.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.525 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>YouTube Channel</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Sai SEO Solution. All rights reserved.</p>
          <Link href="/admin/login" className="hover:text-white">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
