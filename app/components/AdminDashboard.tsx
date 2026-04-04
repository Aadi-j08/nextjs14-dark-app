"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo, useState } from "react";

type ViewMode = "Today" | "This Week";

type TrendPoint = {
  label: string;
  predicted: number;
  actual: number;
};

type UtilizationEntry = {
  doctor: string;
  utilization: number;
};

const todayTrend: TrendPoint[] = [
  { label: "9 AM", predicted: 18, actual: 16 },
  { label: "10 AM", predicted: 20, actual: 22 },
  { label: "11 AM", predicted: 24, actual: 26 },
  { label: "12 PM", predicted: 28, actual: 25 },
  { label: "1 PM", predicted: 22, actual: 20 },
  { label: "2 PM", predicted: 26, actual: 29 },
  { label: "3 PM", predicted: 30, actual: 33 },
  { label: "4 PM", predicted: 24, actual: 23 },
  { label: "5 PM", predicted: 20, actual: 19 },
  { label: "6 PM", predicted: 16, actual: 15 },
];

const weekTrend: TrendPoint[] = [
  { label: "Mon", predicted: 22, actual: 24 },
  { label: "Tue", predicted: 21, actual: 19 },
  { label: "Wed", predicted: 23, actual: 26 },
  { label: "Thu", predicted: 20, actual: 22 },
  { label: "Fri", predicted: 25, actual: 28 },
  { label: "Sat", predicted: 18, actual: 17 },
  { label: "Sun", predicted: 14, actual: 13 },
];

const todayUtilization: UtilizationEntry[] = [
  { doctor: "Dr. A. Mehta", utilization: 54 },
  { doctor: "Dr. N. Kapoor", utilization: 72 },
  { doctor: "Dr. V. Rao", utilization: 88 },
  { doctor: "Dr. P. Singh", utilization: 64 },
];

const weekUtilization: UtilizationEntry[] = [
  { doctor: "Dr. A. Mehta", utilization: 61 },
  { doctor: "Dr. N. Kapoor", utilization: 79 },
  { doctor: "Dr. V. Rao", utilization: 91 },
  { doctor: "Dr. P. Singh", utilization: 67 },
];

function utilizationColor(value: number) {
  if (value < 60) return "bg-emerald-500";
  if (value <= 85) return "bg-yellow-500";
  return "bg-red-500";
}

export default function AdminDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>("Today");

  const trendData = useMemo(
    () => (viewMode === "Today" ? todayTrend : weekTrend),
    [viewMode],
  );
  const utilizationData = useMemo(
    () => (viewMode === "Today" ? todayUtilization : weekUtilization),
    [viewMode],
  );

  const kpis = useMemo(
    () =>
      viewMode === "Today"
        ? [
            { label: "Total Appointments Today", value: "124" },
            { label: "Active Doctors", value: "18" },
            { label: "No-Show Rate Today", value: "6.8%" },
            { label: "Avg Wait Time", value: "17 min" },
          ]
        : [
            { label: "Total Appointments Today", value: "812" },
            { label: "Active Doctors", value: "21" },
            { label: "No-Show Rate Today", value: "7.4%" },
            { label: "Avg Wait Time", value: "19 min" },
          ],
    [viewMode],
  );

  return (
    <main className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)]">
      <div className="mx-auto flex w-full max-w-[1400px]">
        <aside className="sticky top-0 h-screen w-64 border-r border-[var(--gold)]/20 bg-[var(--bg-primary)]/75 p-6 backdrop-blur-md">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <nav className="mt-8 space-y-2">
            {["Overview", "Doctors", "Schedule", "Reports"].map((item) => (
              <a
                key={item}
                href="#"
                className="block rounded-lg px-3 py-2 text-sm text-[var(--text-muted)] transition-colors hover:bg-[var(--gold)]/10 hover:text-[var(--text-primary)]"
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <section className="w-full p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <div className="inline-flex rounded-lg border border-[var(--gold)]/30 bg-[var(--bg-primary)]/60 p-1">
              {(["Today", "This Week"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                    viewMode === mode
                      ? "bg-[var(--gold)] text-white"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-[var(--gold)]/20 bg-[var(--bg-primary)]/70 p-5"
              >
                <p className="text-sm text-[var(--text-muted)]">{card.label}</p>
                <p className="mt-2 text-2xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--gold)]/20 bg-[var(--bg-primary)]/70 p-5">
            <h3 className="text-lg font-semibold">Wait Time Trend</h3>
            <div className="mt-4 h-80 w-full min-h-[20rem] min-w-0">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.25)" />
                  <XAxis dataKey="label" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#050810",
                      border: "1px solid rgba(14,165,233,0.2)",
                      borderRadius: "12px",
                      color: "#f1f5f9",
                    }}
                    labelStyle={{ color: "#cbd5e1" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="var(--gold)"
                    strokeWidth={3}
                    dot={false}
                    name="Predicted"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="var(--gold-light)"
                    strokeWidth={3}
                    dot={false}
                    name="Actual"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--gold)]/20 bg-[var(--bg-primary)]/70 p-5">
            <h3 className="text-lg font-semibold">Doctor Utilization</h3>
            <div className="mt-4 space-y-4">
              {utilizationData.map((entry) => (
                <div key={entry.doctor}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-[var(--text-primary)]">{entry.doctor}</span>
                    <span className="text-[var(--text-muted)]">{entry.utilization}%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-white/10">
                    <div
                      className={`h-3 rounded-full ${utilizationColor(entry.utilization)}`}
                      style={{ width: `${entry.utilization}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
