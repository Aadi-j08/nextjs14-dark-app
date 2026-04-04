"use client";

import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";

type QueueUpdatePayload = {
  position?: number;
  waitMins?: number;
  currentStep?: number;
};

const timelineSteps = [
  "Appointment Booked",
  "OTP Verified",
  "In Queue",
  "Consultation Started",
  "Consultation Complete",
];

export default function LiveQueue() {
  const [tokenNumber] = useState(47);
  const [position, setPosition] = useState(3);
  const [estimatedWaitMins, setEstimatedWaitMins] = useState(14);
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    const socket = io("http://localhost:3001", {
      transports: ["websocket"],
      reconnection: true,
    });

    socket.on("queue-update", (payload: QueueUpdatePayload) => {
      if (typeof payload.position === "number") {
        setPosition(Math.max(0, payload.position));
      }
      if (typeof payload.waitMins === "number") {
        setEstimatedWaitMins(Math.max(0, payload.waitMins));
      }
      if (typeof payload.currentStep === "number") {
        setCurrentStep(
          Math.min(timelineSteps.length - 1, Math.max(0, payload.currentStep)),
        );
      }
    });

    socket.on("connect_error", () => {
      // Keep UI functional even if the mock server is unavailable.
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setEstimatedWaitMins((prev) => Math.max(0, prev - 1));
    }, 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const nextStep = Math.min(timelineSteps.length - 1, Math.max(0, 5 - position));
    setCurrentStep((prev) => (prev >= nextStep ? prev : nextStep));
  }, [position]);

  const progressPercent = useMemo(() => {
    const maxPosition = 10;
    const normalized = Math.max(0, Math.min(maxPosition, position));
    return ((maxPosition - normalized) / maxPosition) * 100;
  }, [position]);

  return (
    <main className="min-h-screen bg-[var(--bg-secondary)] px-4 py-12 text-[var(--text-primary)] sm:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">

        {/* Current Token — fixed clipping + padding */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-br from-[var(--gold)]/20 to-[var(--bg-primary)]/60 p-8 text-center backdrop-blur-md"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--text-muted)]">
            Your Current Token
          </p>
          <h1 className="text-6xl font-bold text-white sm:text-7xl">
            #{tokenNumber}
          </h1>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--gold)]/15 px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--gold)]" />
            <span className="text-sm text-[var(--gold)]">Live Tracking Active</span>
          </div>
        </motion.div>

        {/* Queue position + progress */}
        <div className="mt-6 w-full rounded-2xl border border-[var(--gold)]/20 bg-[var(--bg-primary)]/70 p-6 backdrop-blur-md sm:p-8">
          <p className="text-center text-xl font-semibold">
            You are <span className="text-[var(--gold)]">#{position}</span> in queue
          </p>
          <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-3 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--purple-light)]"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex-1 rounded-xl bg-white/5 px-5 py-4 text-center">
              <p className="text-xs text-[var(--text-muted)]">Queue Position</p>
              <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">#{position}</p>
            </div>
            <div className="flex-1 rounded-xl bg-white/5 px-5 py-4 text-center">
              <p className="text-xs text-[var(--text-muted)]">Estimated Wait</p>
              <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{estimatedWaitMins} min</p>
            </div>
          </div>
        </div>

        {/* Queue Journey timeline */}
        <section className="mt-6 w-full rounded-2xl border border-[var(--gold)]/20 bg-[var(--bg-primary)]/70 p-6 backdrop-blur-md sm:p-8">
          <h2 className="text-lg font-semibold">Queue Journey</h2>

          <div className="relative mt-6 space-y-6">
            {/* Vertical connector line */}
            <div className="absolute left-[9px] top-2 h-[calc(100%-16px)] w-[2px] bg-white/10" />

            {timelineSteps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;

              return (
                <div key={step} className="relative flex items-center gap-4 pl-1">
                  <span
                    className={`relative z-10 h-5 w-5 shrink-0 rounded-full border-2 ${
                      isCompleted
                        ? "border-[var(--gold)] bg-[var(--gold)]"
                        : isCurrent
                          ? "animate-pulse border-[var(--purple-light)] bg-[var(--purple-light)]/30"
                          : "border-white/20 bg-transparent"
                    }`}
                  />
                  <p
                    className={`text-sm font-medium ${
                      isCompleted
                        ? "text-[var(--gold)]"
                        : isCurrent
                          ? "text-[var(--purple-light)]"
                          : "text-[var(--text-muted)]"
                    }`}
                  >
                    {step}
                    {isCurrent && (
                      <span className="ml-2 rounded-full bg-[var(--purple-light)]/15 px-2 py-0.5 text-[10px] font-semibold text-[var(--purple-light)]">
                        Current
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
