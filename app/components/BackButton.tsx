"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ label = "Back" }: { label?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="group fixed left-4 top-4 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-[var(--bg-primary)]/80 px-4 py-2 text-sm font-medium text-[var(--text-muted)] shadow-lg backdrop-blur-md transition-all duration-200 hover:border-[var(--gold)]/40 hover:text-[var(--gold)] sm:left-6 sm:top-5"
    >
      <ArrowLeft
        size={15}
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      />
      {label}
    </button>
  );
}
