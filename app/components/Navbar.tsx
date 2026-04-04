"use client";

import { Bell, Menu, X } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const navLinks = [
  { label: "Home",        href: "/" },
  { label: "Book",        href: "/book" },
  { label: "Live Queue",  href: "/queue" },
  { label: "Doctors",     href: "/doctor" },
  { label: "Admin",       href: "/admin" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 w-full border-b border-[#0ea5e933] bg-[#050810cc] backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className={`${spaceGrotesk.className} text-2xl font-bold`}>
            <span className="bg-gradient-to-r from-[var(--gold)] to-[var(--purple-light)] bg-clip-text text-transparent">
              MediQueue
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    className={`group relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-[var(--gold)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {label}
                    {active && (
                      <span className="absolute -bottom-0.5 left-2 right-2 h-[2px] rounded-full bg-[var(--gold)]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative rounded-full p-2 text-[var(--text-muted)] transition-colors hover:text-[var(--gold)]"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
                3
              </span>
            </button>

            <Link
              href="/book"
              className="hidden rounded-lg bg-[var(--gold)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--deep-blue)] sm:block"
            >
              Book Now
            </Link>

            {/* Avatar */}
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/40 bg-[var(--bg-secondary)] text-xs font-bold text-[var(--gold)]"
              aria-label="User avatar"
            >
              P
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="ml-1 md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={22} className="text-[var(--text-primary)]" />
              ) : (
                <Menu size={22} className="text-[var(--text-primary)]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="border-t border-white/8 bg-[var(--bg-primary)]/95 px-4 py-3 md:hidden">
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ label, href }) => {
                const active = pathname === href;
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                        active
                          ? "bg-[var(--gold)]/15 text-[var(--gold)]"
                          : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
