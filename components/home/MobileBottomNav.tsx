"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Phone,
  FileText,
  Images,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  { href: "/#courses", label: "Courses", icon: BookOpen, match: (p: string) => p === "/" },
  { href: "tel:7978258180", label: "Call", icon: Phone, match: () => false, external: true },
  { href: "/gallery", label: "Gallery", icon: Images, match: (p: string) => p === "/gallery" },
  { href: "/result", label: "Result", icon: FileText, match: (p: string) => p === "/result" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/80 bg-white/95 shadow-[0_-4px_24px_-4px_rgba(12,45,72,0.1)] backdrop-blur-lg md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Mobile navigation"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {items.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;

          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-semibold text-slate-500 transition-colors active:text-teal-dark"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal/10 text-teal-dark">
                  <Icon size={18} />
                </span>
                {item.label}
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-semibold transition-colors",
                active ? "text-teal-dark" : "text-slate-500"
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                  active ? "bg-teal/15 text-teal-dark" : "text-slate-500"
                )}
              >
                <Icon size={18} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
