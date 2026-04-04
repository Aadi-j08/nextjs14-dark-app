"use client";

import {
  Activity,
  Bell,
  Calendar,
  Clock,
  FileText,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Smart Scheduling",
    description:
      "AI assigns slots based on patient medical history and case severity.",
    Icon: Calendar,
  },
  {
    title: "Live Wait Time",
    description:
      "Real-time queue position and countdown, updated via WebSocket.",
    Icon: Clock,
  },
  {
    title: "Find a Doctor",
    description:
      "See all available doctors, their queue load, and estimated availability.",
    Icon: UserCheck,
  },
  {
    title: "Alerts and Notifications",
    description:
      "OTP check-in system. Sticky alerts guide patients from booking to exit.",
    Icon: Bell,
  },
  {
    title: "Patient Tracking",
    description:
      "Track consultation stage, token number, and queue movement live.",
    Icon: Activity,
  },
  {
    title: "Lab Reports",
    description:
      "Upload, view, and share diagnostic reports directly from your profile.",
    Icon: FileText,
  },
];

export default function FeaturesGrid() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
        Everything Your Clinic Needs
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, description, Icon }) => (
          <motion.article
            key={title}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-[rgba(124,58,237,0.25)] bg-[rgba(10,15,30,0.7)] p-6 backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_14px_40px_rgba(14,165,233,0.28)]"
          >
            <Icon className="h-7 w-7 text-[var(--gold)]" />
            <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              {description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
