"use client";

import { motion, type Variants } from "framer-motion";
import { Search, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";
import HumanBodyBG from "./HumanBodyBG";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: custom * 0.14 },
  }),
};

const stats = [
  { value: "500+", label: "Doctors" },
  { value: "2M+", label: "Patients Served" },
  { value: "4.9★", label: "Avg Rating" },
  { value: "< 5 min", label: "Avg Wait" },
];

const quickSpecialities = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopaedic",
  "ENT",
];

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-28 sm:px-6">
      <HumanBodyBG />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--gold)] backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--gold)]" />
          India&apos;s #1 AI-Powered Hospital Queue System
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-4xl text-[42px] font-extrabold leading-tight text-white sm:text-[58px] lg:text-[70px]"
        >
          Skip the Wait.{" "}
          <span className="bg-gradient-to-r from-[var(--gold)] via-[var(--purple-light)] to-[var(--gold)] bg-clip-text text-transparent">
            See a Doctor
          </span>{" "}
          in Minutes.
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-5 max-w-2xl text-base text-[var(--text-muted)] sm:text-lg"
        >
          Book appointments, track your live queue position, and consult top specialists — all from one intelligent platform.
        </motion.p>

        {/* Search bar — Practo-style */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 w-full max-w-3xl"
        >
          <div className="flex items-center overflow-hidden rounded-2xl border border-white/15 bg-[var(--bg-primary)]/80 shadow-2xl shadow-black/40 backdrop-blur-md">
            <div className="flex flex-1 items-center gap-2 px-4 py-3.5">
              <Search size={17} className="shrink-0 text-[var(--text-muted)]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctors, specialities, symptoms…"
                className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
              />
            </div>
            <div className="hidden items-center gap-2 border-l border-white/10 px-4 sm:flex">
              <MapPin size={14} className="text-[var(--text-muted)]" />
              <span className="text-sm text-[var(--text-muted)]">Mumbai</span>
            </div>
            <button
              type="button"
              className="m-1.5 flex items-center gap-1.5 rounded-xl bg-[var(--gold)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--deep-blue)] active:scale-95"
            >
              Search
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Quick speciality chips */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-[var(--text-muted)]">Popular:</span>
            {quickSpecialities.map((s) => (
              <button
                key={s}
                type="button"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--text-muted)] transition hover:border-[var(--gold)]/50 hover:text-[var(--gold)]"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="/book"
            className="rounded-xl bg-[var(--gold)] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--gold)]/30 transition-all duration-300 hover:bg-[var(--deep-blue)] hover:shadow-[var(--gold)]/50 active:scale-95"
          >
            Book Appointment
          </a>
          <a
            href="/queue"
            className="rounded-xl border border-[var(--purple-light)]/50 bg-[var(--purple-light)]/10 px-7 py-3 text-sm font-semibold text-[var(--purple-light)] transition-all duration-300 hover:bg-[var(--purple-light)] hover:text-[var(--bg-primary)] active:scale-95"
          >
            Track Live Queue
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-[var(--gold)]/20 bg-[var(--gold)]/8 p-4 text-center backdrop-blur-sm"
            >
              <p className="text-xl font-bold text-white sm:text-2xl">{value}</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
