"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  BookOpen,
  Wrench,
  Images,
  MapPin,
  Phone,
  FileText,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#courses", label: "Courses", icon: BookOpen },
  { href: "/#services", label: "Services", icon: Wrench },
  { href: "/gallery", label: "Gallery", icon: Images },
  { href: "/#location", label: "Location", icon: MapPin },
  { href: "/#contact", label: "Contact", icon: Phone },
  { href: "/result", label: "Check Result", icon: FileText },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const onDarkHero = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-slate-200/80 bg-white/95 py-2 shadow-soft backdrop-blur-md"
            : onDarkHero
              ? "border-b border-white/10 bg-brand/85 py-3 backdrop-blur-md"
              : "border-b border-slate-200/60 bg-white/90 py-3 backdrop-blur-md"
        )}
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top, 0px))" }}
      >
        <div className="container-main flex items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3.5">
            <Image src="/logo.png" alt="Sai SEO" width={80} height={80} priority />
            <div className="min-w-0">
              <p
                className={cn(
                  "truncate font-heading text-xl font-bold leading-tight",
                  onDarkHero ? "text-white" : "text-brand"
                )}
              >
                Sai SEO Solution
              </p>
              <p
                className={cn(
                  "truncate text-sm font-medium tracking-wide mt-0.5",
                  onDarkHero ? "text-slate-300" : "text-muted"
                )}
              >
                Software & Hardware
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex lg:gap-7">
            {navLinks.slice(1, 6).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  onDarkHero
                    ? "text-slate-200 hover:text-white"
                    : "text-slate-600 hover:text-teal-dark"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/result" className="btn-teal !px-5 !py-2 text-xs">
              Check Result
              <ChevronRight size={14} />
            </Link>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <a
              href="tel:7978258180"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                onDarkHero
                  ? "bg-white/10 text-white"
                  : "bg-teal/10 text-teal-dark"
              )}
              aria-label="Call us"
            >
              <Phone size={17} />
            </a>
            <button
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                onDarkHero
                  ? "bg-white/10 text-white"
                  : "bg-surface-2 text-brand"
              )}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-brand/50 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="fixed inset-x-0 bottom-0 z-[70] max-h-[88vh] overflow-y-auto rounded-t-[1.75rem] bg-white shadow-2xl md:hidden"
              style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
            >
              <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
                <div>
                  <p className="font-heading font-bold text-brand">Menu</p>
                  <p className="text-xs text-muted">Sai SEO Solution</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-2 text-brand"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="px-3 py-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-2xl px-4 py-3.5 font-medium text-brand transition-colors active:bg-surface-2"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal-dark">
                        <Icon size={18} />
                      </span>
                      {link.label}
                      <ChevronRight size={16} className="ml-auto text-slate-300" />
                    </Link>
                  );
                })}
              </nav>

              <div className="mx-4 mb-2 rounded-2xl bg-brand p-4 text-white">
                <a
                  href="https://maps.app.goo.gl/RGQptfJFbHUzM5seA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2 text-sm font-semibold hover:text-teal-light transition-colors"
                >
                  <MapPin size={16} className="mt-0.5 shrink-0 text-teal-light group-hover:scale-110 transition-transform" />
                  <span>Hatibandha Street, Brahmapur</span>
                </a>
                <a
                  href="tel:7978258180"
                  className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-teal py-3 text-sm font-semibold text-white hover:bg-teal-dark transition-colors"
                >
                  <Phone size={16} />
                  Call +91 7978258180
                </a>
                <a
                  href="https://www.youtube.com/@saiseosolution"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#FF0000] py-3 text-sm font-semibold text-white hover:bg-[#D90000] transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width={16}
                    height={16}
                    className="fill-white"
                  >
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.025 0 12 0 12s0 3.975.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.525 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>YouTube Channel</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
