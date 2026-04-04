"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bell,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Heart,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Zap,
  Eye,
  Bone,
  Ear,
} from "lucide-react";
import Link from "next/link";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";

/* ─── Specialities ─────────────────────────────────────────── */
const specialities = [
  { label: "General Physician", icon: Stethoscope, color: "#0ea5e9" },
  { label: "Cardiologist",      icon: Heart,       color: "#ef4444" },
  { label: "Neurologist",       icon: Brain,       color: "#8b5cf6" },
  { label: "Orthopaedic",       icon: Bone,        color: "#f59e0b" },
  { label: "Dermatologist",     icon: ShieldCheck, color: "#10b981" },
  { label: "ENT Specialist",    icon: Ear,         color: "#06b6d4" },
  { label: "Ophthalmologist",   icon: Eye,         color: "#6366f1" },
  { label: "Pulmonologist",     icon: Activity,    color: "#f97316" },
];

/* ─── How It Works ─────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    title: "Search & Choose",
    desc: "Find doctors by speciality, symptoms, or name. See real-time queue loads and slot availability.",
    color: "var(--gold)",
  },
  {
    num: "02",
    title: "Book in Seconds",
    desc: "Select a time slot, fill your details, and confirm via OTP. No more long phone calls.",
    color: "var(--purple-light)",
  },
  {
    num: "03",
    title: "Track Your Queue",
    desc: "Watch your live position update in real time and get notified when your turn is near.",
    color: "#10b981",
  },
  {
    num: "04",
    title: "Walk In & Consult",
    desc: "Arrive exactly when your token is called. Zero waiting room time.",
    color: "#f59e0b",
  },
];

/* ─── Features ─────────────────────────────────────────────── */
const features = [
  {
    title: "Smart Scheduling",
    desc: "AI assigns slots based on medical history and case severity.",
    Icon: Calendar,
    glow: "var(--gold)",
  },
  {
    title: "Live Wait Tracking",
    desc: "Real-time queue position updated via WebSocket. Never guess again.",
    Icon: Clock,
    glow: "var(--purple-light)",
  },
  {
    title: "OTP Check-In",
    desc: "Secure 6-digit OTP confirmation ties your identity to your token.",
    Icon: ShieldCheck,
    glow: "#10b981",
  },
  {
    title: "Smart Alerts",
    desc: "Push notifications when you're 5 patients away from being called.",
    Icon: Bell,
    glow: "#f59e0b",
  },
  {
    title: "Lab Reports",
    desc: "Upload and share diagnostic reports directly from your profile.",
    Icon: FileText,
    glow: "#ef4444",
  },
  {
    title: "Instant Availability",
    desc: "See morning, noon and evening slot counts — BookMyShow style.",
    Icon: Zap,
    glow: "#06b6d4",
  },
];

/* ─── Testimonials ─────────────────────────────────────────── */
const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Patient",
    city: "Mumbai",
    quote:
      "I booked a cardiologist in under 2 minutes and walked in exactly when my token was called. This is how healthcare should work.",
    avatar: "AS",
    rating: 5,
  },
  {
    name: "Dr. Vivek Rao",
    role: "Neurologist",
    city: "Bangalore",
    quote:
      "MediQueue has reduced no-shows by 90% in my clinic. The real-time queue dashboard is a game changer for doctors.",
    avatar: "VR",
    rating: 5,
  },
  {
    name: "Ramesh Iyer",
    role: "Patient",
    city: "Chennai",
    quote:
      "Used to spend 3 hours in OPD waiting rooms. Now I just come in when it's my turn. Brilliant system.",
    avatar: "RI",
    rating: 5,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.33, 1, 0.68, 1], delay: i * 0.1 },
  }),
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)]">
      <Navbar />

      {/* ①  HERO */}
      <HeroSection />

      {/* ②  SPECIALITIES */}
      <section className="relative z-10 bg-[var(--bg-secondary)] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">Browse by Speciality</p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Find the Right Doctor
            </h2>
            <p className="mt-3 text-sm text-[var(--text-muted)] max-w-xl mx-auto">
              From routine check-ups to complex consultations — all specialities available with live slot data.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {specialities.map(({ label, icon: Icon, color }, i) => (
              <motion.button
                key={label}
                type="button"
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i * 0.05}
                whileHover={{ y: -4, scale: 1.04 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/8 bg-white/4 p-4 text-center transition-all duration-200 hover:border-white/20 hover:bg-white/8"
                style={{ ["--glow" as string]: color }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `${color}22` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <span className="text-xs font-medium leading-tight text-[var(--text-muted)]">
                  {label}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--gold)] hover:underline"
            >
              View all specialities <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ③  HOW IT WORKS */}
      <section className="relative z-10 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">Simple Process</p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              How MediQueue Works
            </h2>
            <p className="mt-3 text-sm text-[var(--text-muted)] max-w-xl mx-auto">
              Four steps between you and a confirmed appointment with zero waiting room time.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ num, title, desc, color }, i) => (
              <motion.div
                key={num}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i * 0.12}
                className="relative rounded-2xl border border-white/8 bg-[var(--bg-secondary)]/60 p-6 backdrop-blur-sm"
              >
                {/* connector line between cards */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <ArrowRight size={16} className="text-white/20" />
                  </div>
                )}
                <p className="text-4xl font-black" style={{ color, opacity: 0.25 }}>
                  {num}
                </p>
                <div
                  className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${color}22` }}
                >
                  {i === 0 && <UserCheck size={18} style={{ color }} />}
                  {i === 1 && <Calendar size={18} style={{ color }} />}
                  {i === 2 && <Activity size={18} style={{ color }} />}
                  {i === 3 && <CheckCircle2 size={18} style={{ color }} />}
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ④  FEATURES GRID */}
      <section className="relative z-10 bg-[var(--bg-secondary)] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">Platform Features</p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Everything Your Clinic Needs
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ title, desc, Icon, glow }, i) => (
              <motion.div
                key={title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i * 0.08}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group rounded-2xl border border-white/8 bg-[var(--bg-primary)]/60 p-6 backdrop-blur-sm transition-all duration-300"
                style={{ ["--glow" as string]: glow }}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${glow}20` }}
                >
                  <Icon size={20} style={{ color: glow }} />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{desc}</p>
                <div
                  className="mt-4 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: `linear-gradient(90deg, ${glow}, transparent)` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤  STATS BANNER */}
      <section className="relative z-10 overflow-hidden px-4 py-16 sm:px-6">
        <div
          className="mx-auto max-w-6xl rounded-3xl border border-[var(--gold)]/20 bg-gradient-to-br from-[var(--gold)]/10 to-[#7c3aed]/10 p-10 text-center backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Trusted by Thousands of Patients &amp; Clinics Across India
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { v: "500+",  l: "Verified Doctors" },
              { v: "2M+",   l: "Appointments Booked" },
              { v: "98%",   l: "Satisfaction Rate" },
              { v: "< 5min", l: "Avg Booking Time" },
            ].map(({ v, l }) => (
              <div key={l}>
                <p className="text-3xl font-extrabold text-[var(--gold)] sm:text-4xl">{v}</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑥  TESTIMONIALS */}
      <section className="relative z-10 bg-[var(--bg-secondary)] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">What People Say</p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Real Stories, Real Results</h2>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {testimonials.map(({ name, role, city, quote, avatar, rating }, i) => (
              <motion.div
                key={name}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i * 0.12}
                className="flex flex-col rounded-2xl border border-white/8 bg-[var(--bg-primary)]/70 p-6 backdrop-blur-sm"
              >
                <div className="flex gap-0.5 text-yellow-400">
                  {Array.from({ length: rating }).map((_, j) => (
                    <span key={j} className="text-sm">★</span>
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)]/20 text-sm font-bold text-[var(--gold)]">
                    {avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{role} · {city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑦  CTA BANNER */}
      <section className="relative z-10 px-4 py-20 sm:px-6">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} custom={0}
          className="mx-auto max-w-3xl rounded-3xl border border-[var(--gold)]/25 bg-gradient-to-br from-[var(--gold)]/15 to-[#7c3aed]/15 p-12 text-center backdrop-blur-md"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">Get Started Today</p>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            Your Health Can&apos;t Wait
          </h2>
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            Join 2 million+ patients who&apos;ve already skipped the waiting room.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book"
              className="rounded-xl bg-[var(--gold)] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--gold)]/30 transition hover:bg-[var(--deep-blue)] active:scale-95"
            >
              Book Appointment Now
            </Link>
            <Link
              href="/queue"
              className="rounded-xl border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-95"
            >
              Track My Queue
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ⑧  FOOTER */}
      <footer className="relative z-10 border-t border-white/8 bg-[var(--bg-primary)] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <p className="text-xl font-extrabold bg-gradient-to-r from-[var(--gold)] to-[var(--purple-light)] bg-clip-text text-transparent">
                MediQueue
              </p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Intelligent Healthcare, Zero Wait Time
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-[var(--text-muted)]">
              {["About", "Doctors", "Book Appointment", "Live Queue", "Admin", "Privacy"].map((l) => (
                <a key={l} href="#" className="hover:text-[var(--text-primary)] transition">
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 border-t border-white/6 pt-6 text-center text-xs text-[var(--text-muted)]">
            © 2026 MediQueue. All rights reserved. Built with ❤️ for better healthcare.
          </div>
        </div>
      </footer>
    </main>
  );
}
