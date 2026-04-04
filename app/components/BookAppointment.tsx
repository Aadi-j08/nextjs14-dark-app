"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown, Check, Clock, Moon, Sun, Sunset } from "lucide-react";

type Severity = "General" | "Intermediate" | "Emergency";

type TimeSlot = {
  time: string;
  filled: boolean;
};

type Doctor = {
  id: string;
  name: string;
  specialization: string;
  queueLoad: number;
  morningSlots: TimeSlot[];
  noonSlots: TimeSlot[];
  nightSlots: TimeSlot[];
};

const bloodGroupOptions = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−", "Unknown"];

const chronicOptions = [
  "None",
  "Diabetes",
  "Hypertension",
  "Cardiac Disease",
  "Asthma",
  "Arthritis",
  "Thyroid Disorder",
  "Kidney Disease",
  "Liver Disease",
  "Neurological Disorder",
  "Cancer",
  "Other",
];

const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];

const mockDoctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Arjun Mehta",
    specialization: "General Physician",
    queueLoad: 4,
    morningSlots: [
      { time: "9:00 AM", filled: true },
      { time: "9:30 AM", filled: true },
      { time: "10:00 AM", filled: false },
      { time: "10:30 AM", filled: false },
    ],
    noonSlots: [
      { time: "12:00 PM", filled: true },
      { time: "12:30 PM", filled: false },
      { time: "1:00 PM", filled: false },
    ],
    nightSlots: [
      { time: "6:00 PM", filled: false },
      { time: "6:30 PM", filled: true },
      { time: "7:00 PM", filled: false },
    ],
  },
  {
    id: "d2",
    name: "Dr. Naina Kapoor",
    specialization: "Cardiologist",
    queueLoad: 8,
    morningSlots: [
      { time: "9:00 AM", filled: true },
      { time: "9:30 AM", filled: true },
      { time: "10:00 AM", filled: true },
      { time: "10:30 AM", filled: false },
    ],
    noonSlots: [
      { time: "12:00 PM", filled: true },
      { time: "12:30 PM", filled: true },
      { time: "1:00 PM", filled: false },
    ],
    nightSlots: [
      { time: "5:30 PM", filled: false },
      { time: "6:00 PM", filled: false },
      { time: "6:30 PM", filled: true },
    ],
  },
  {
    id: "d3",
    name: "Dr. Vivek Rao",
    specialization: "Neurologist",
    queueLoad: 13,
    morningSlots: [
      { time: "9:00 AM", filled: true },
      { time: "9:30 AM", filled: true },
      { time: "10:00 AM", filled: true },
      { time: "10:30 AM", filled: true },
    ],
    noonSlots: [
      { time: "12:00 PM", filled: true },
      { time: "12:30 PM", filled: true },
      { time: "1:00 PM", filled: true },
    ],
    nightSlots: [
      { time: "6:00 PM", filled: false },
      { time: "6:30 PM", filled: false },
      { time: "7:00 PM", filled: false },
    ],
  },
];

function getQueueColor(load: number) {
  if (load < 5) return "bg-emerald-500";
  if (load <= 10) return "bg-yellow-500";
  return "bg-red-500";
}

function getQueueLabel(load: number) {
  if (load < 5) return { text: "Low", color: "text-emerald-400" };
  if (load <= 10) return { text: "Moderate", color: "text-yellow-400" };
  return { text: "High", color: "text-red-400" };
}

// Reusable custom dropdown component
function CustomDropdown({
  label,
  value,
  options,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <label className="mb-2 block text-sm text-[var(--text-muted)]">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none ring-[var(--gold)] transition hover:border-white/25 focus:ring-1"
      >
        <span className={value ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}>
          {value || placeholder || "Select…"}
        </span>
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""} text-[var(--text-muted)]`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-white/15 bg-[#0d1526] shadow-xl shadow-black/40 backdrop-blur-md"
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-sm transition hover:bg-white/10 ${
                    value === opt ? "text-[var(--gold)]" : "text-[var(--text-primary)]"
                  }`}
                >
                  {opt}
                  {value === opt && <Check size={14} />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// Multi-select dropdown for chronic conditions
function MultiSelectDropdown({
  label,
  selected,
  options,
  onChange,
}: {
  label: string;
  selected: string[];
  options: string[];
  onChange: (vals: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (opt: string) => {
    if (opt === "None") {
      onChange(selected.includes("None") ? [] : ["None"]);
      return;
    }
    const withoutNone = selected.filter((s) => s !== "None");
    if (withoutNone.includes(opt)) {
      onChange(withoutNone.filter((s) => s !== opt));
    } else {
      onChange([...withoutNone, opt]);
    }
  };

  const displayText =
    selected.length === 0
      ? "Select conditions…"
      : selected.length === 1
        ? selected[0]
        : `${selected[0]} +${selected.length - 1} more`;

  return (
    <div ref={ref} className="relative w-full">
      <label className="mb-2 block text-sm text-[var(--text-muted)]">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none ring-[var(--gold)] transition hover:border-white/25 focus:ring-1"
      >
        <span className={selected.length > 0 ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}>
          {displayText}
        </span>
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""} text-[var(--text-muted)]`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-white/15 bg-[#0d1526] shadow-xl shadow-black/40 backdrop-blur-md"
          >
            {options.map((opt) => {
              const isSelected = selected.includes(opt);
              return (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => toggle(opt)}
                    className={`flex w-full items-center justify-between px-3 py-2 text-sm transition hover:bg-white/10 ${
                      isSelected ? "text-[var(--gold)]" : "text-[var(--text-primary)]"
                    }`}
                  >
                    {opt}
                    {isSelected && <Check size={14} />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// Severity pill selector
function SeveritySelector({
  value,
  onChange,
}: {
  value: Severity;
  onChange: (v: Severity) => void;
}) {
  const options: { label: Severity; color: string; active: string }[] = [
    { label: "General", color: "border-emerald-500/40 text-emerald-400", active: "bg-emerald-500/20 border-emerald-500 text-emerald-300" },
    { label: "Intermediate", color: "border-yellow-500/40 text-yellow-400", active: "bg-yellow-500/20 border-yellow-500 text-yellow-300" },
    { label: "Emergency", color: "border-red-500/40 text-red-400", active: "bg-red-500/20 border-red-500 text-red-300" },
  ];
  return (
    <div>
      <label className="mb-2 block text-sm text-[var(--text-muted)]">Severity</label>
      <div className="flex flex-wrap gap-3">
        {options.map(({ label, color, active }) => (
          <button
            key={label}
            type="button"
            onClick={() => onChange(label)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
              value === label ? active : `${color} bg-white/5 hover:bg-white/10`
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// BookMyShow style slot grid
function SlotGrid({ slots, label, icon }: { slots: TimeSlot[]; label: string; icon: React.ReactNode }) {
  return (
    <div className="mt-3">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        {icon}
        <span>{label}</span>
        <span className="ml-auto text-[10px] font-normal normal-case">
          {slots.filter((s) => !s.filled).length} available
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {slots.map((slot) => (
          <button
            key={slot.time}
            type="button"
            disabled={slot.filled}
            className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-all duration-150 ${
              slot.filled
                ? "cursor-not-allowed border-white/8 bg-white/5 text-[var(--text-muted)] line-through opacity-40"
                : "border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] hover:bg-[var(--gold)]/20 hover:border-[var(--gold)]"
            }`}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BookAppointment() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [chronicConditions, setChronicConditions] = useState<string[]>([]);
  const [severity, setSeverity] = useState<Severity>("General");
  const [currentIssue, setCurrentIssue] = useState("");

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [secondsLeft, setSecondsLeft] = useState(9 * 60 + 59);
  const [otpSubmitted, setOtpSubmitted] = useState(false);

  const progress = `${(step / 3) * 100}%`;

  useEffect(() => {
    if (step !== 2) return;
    setLoadingDoctors(true);
    const timer = window.setTimeout(() => {
      setDoctors(mockDoctors);
      setLoadingDoctors(false);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step !== 3 || otpSubmitted) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [step, otpSubmitted]);

  useEffect(() => {
    if (step === 3) {
      otpRefs.current[0]?.focus();
    }
  }, [step]);

  const formattedCountdown = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} remaining`;
  }, [secondsLeft]);

  const goToStep2 = () => setStep(2);

  const bookDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep(3);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const submitOtp = () => {
    if (otp.some((digit) => digit === "")) return;
    setOtpSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[var(--bg-secondary)] px-4 py-10 text-[var(--text-primary)] sm:px-6">
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-[var(--gold)]/20 bg-[var(--bg-primary)]/80 p-6 backdrop-blur-md sm:p-10">
        <h1 className="text-3xl font-bold">Book Appointment</h1>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/10">
            <motion.div
              className="h-2 rounded-full bg-[var(--gold)]"
              animate={{ width: progress }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* ──────────── STEP 1: Patient Info ──────────── */}
        {step === 1 ? (
          <section className="mt-8 space-y-5">
            {/* Name + Age (plain text inputs) */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm text-[var(--text-muted)]">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none ring-[var(--gold)] transition hover:border-white/25 focus:ring-1"
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[var(--text-muted)]">Age</label>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="number"
                  min="0"
                  max="130"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none ring-[var(--gold)] transition hover:border-white/25 focus:ring-1"
                  placeholder="Age"
                />
              </div>
            </div>

            {/* Gender + Blood Group dropdowns */}
            <div className="grid gap-4 sm:grid-cols-2">
              <CustomDropdown
                label="Gender"
                value={gender}
                options={genderOptions}
                onChange={setGender}
                placeholder="Select gender"
              />
              <CustomDropdown
                label="Blood Group"
                value={bloodGroup}
                options={bloodGroupOptions}
                onChange={setBloodGroup}
                placeholder="Select blood group"
              />
            </div>

            {/* Chronic conditions multi-select */}
            <MultiSelectDropdown
              label="Chronic Conditions"
              selected={chronicConditions}
              options={chronicOptions}
              onChange={setChronicConditions}
            />

            {/* Severity */}
            <SeveritySelector value={severity} onChange={setSeverity} />

            {/* Current Issue — last field above the button */}
            <div>
              <label className="mb-2 block text-sm text-[var(--text-muted)]">
                Current Issue
                <span className="ml-1 text-xs text-[var(--text-muted)]/60">(Describe your symptoms)</span>
              </label>
              <textarea
                value={currentIssue}
                onChange={(e) => setCurrentIssue(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none ring-[var(--gold)] transition hover:border-white/25 focus:ring-1 resize-none"
                placeholder="Describe your symptoms or concern in detail…"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={goToStep2}
                className="rounded-lg bg-[var(--gold)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--deep-blue)] active:scale-95"
              >
                Continue to Doctor Selection →
              </button>
            </div>
          </section>
        ) : null}

        {/* ──────────── STEP 2: Available Doctors ──────────── */}
        {step === 2 ? (
          <section className="mt-8">
            <h2 className="text-xl font-semibold">Available Doctors</h2>

            {/* Legend */}
            <div className="mt-3 flex items-center gap-4 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-6 rounded-sm border border-[var(--gold)]/40 bg-[var(--gold)]/10" />
                Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-6 rounded-sm border border-white/10 bg-white/5 opacity-40" />
                Filled
              </span>
            </div>

            {loadingDoctors ? (
              <p className="mt-4 text-sm text-[var(--text-muted)]">Fetching available doctors…</p>
            ) : (
              <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {doctors.map((doctor) => {
                  const queueLabel = getQueueLabel(doctor.queueLoad);
                  return (
                    <div
                      key={doctor.id}
                      className="flex flex-col rounded-xl border border-[var(--gold)]/20 bg-white/5 p-5 transition hover:border-[var(--gold)]/40"
                    >
                      {/* Doctor header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base font-semibold">{doctor.name}</h3>
                          <p className="mt-0.5 text-xs text-[var(--text-muted)]">{doctor.specialization}</p>
                        </div>
                        <span className={`shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-xs font-semibold ${queueLabel.color}`}>
                          {queueLabel.text}
                        </span>
                      </div>

                      {/* Queue bar */}
                      <div className="mt-3">
                        <div className="mb-1 flex items-center justify-between text-xs text-[var(--text-muted)]">
                          <span>Queue Load</span>
                          <span>{doctor.queueLoad} patients</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/10">
                          <div
                            className={`h-1.5 rounded-full ${getQueueColor(doctor.queueLoad)}`}
                            style={{ width: `${Math.min(100, doctor.queueLoad * 8)}%` }}
                          />
                        </div>
                      </div>

                      {/* Slot grids */}
                      <div className="mt-1 flex-1 divide-y divide-white/5">
                        <SlotGrid
                          slots={doctor.morningSlots}
                          label="Morning"
                          icon={<Sun size={12} className="text-[var(--gold-light)]" />}
                        />
                        <SlotGrid
                          slots={doctor.noonSlots}
                          label="Noon"
                          icon={<Sunset size={12} className="text-orange-400" />}
                        />
                        <SlotGrid
                          slots={doctor.nightSlots}
                          label="Evening"
                          icon={<Moon size={12} className="text-indigo-400" />}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => bookDoctor(doctor)}
                        className="mt-4 w-full rounded-lg bg-gradient-to-r from-[var(--gold)] to-[var(--purple)] py-2 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
                      >
                        Book This Doctor
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ) : null}

        {/* ──────────── STEP 3: OTP Confirmation ──────────── */}
        {step === 3 ? (
          <section className="mt-8">
            <h2 className="text-xl font-semibold">OTP Confirmation</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Enter the 6-digit OTP sent to your registered mobile number.
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--gold)]">{formattedCountdown}</p>

            {!otpSubmitted ? (
              <>
                <div className="mt-5 flex gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={`otp-${index}`}
                      ref={(el) => {
                        otpRefs.current[index] = el;
                      }}
                      value={digit}
                      maxLength={1}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="h-12 w-10 rounded-lg border border-white/20 bg-white/5 text-center text-lg outline-none ring-[var(--gold)] focus:ring-1 sm:w-12"
                      inputMode="numeric"
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={submitOtp}
                  className="mt-6 rounded-lg bg-[var(--gold)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--deep-blue)] active:scale-95"
                >
                  Submit OTP
                </button>
              </>
            ) : (
              <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-white"
                  >
                    ✓
                  </motion.div>
                  <div>
                    <p className="text-lg font-semibold">Appointment Confirmed</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {selectedDoctor ? `Booked with ${selectedDoctor.name}` : "Doctor assigned"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-white/5 p-4">
                    <p className="text-xs text-[var(--text-muted)]">Token Number</p>
                    <p className="mt-1 text-lg font-semibold">MQ-2471</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-4">
                    <p className="text-xs text-[var(--text-muted)]">Estimated Wait Time</p>
                    <p className="mt-1 text-lg font-semibold">18 minutes</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        ) : null}
      </div>
    </main>
  );
}
