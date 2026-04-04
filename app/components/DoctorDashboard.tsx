"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type QueueStatus = "Waiting" | "In Consultation" | "No Show";

type QueuePatient = {
  token: string;
  patientName: string;
  predictedDuration: string;
  status: QueueStatus;
  emergency?: boolean;
};

type RowTimers = {
  startAt?: number;
  endAt?: number;
};

const hourlyLoad = [
  { hour: "9 AM", patients: 6 },
  { hour: "10 AM", patients: 9 },
  { hour: "11 AM", patients: 11 },
  { hour: "12 PM", patients: 8 },
  { hour: "1 PM", patients: 7 },
  { hour: "2 PM", patients: 10 },
  { hour: "3 PM", patients: 12 },
  { hour: "4 PM", patients: 9 },
  { hour: "5 PM", patients: 8 },
  { hour: "6 PM", patients: 5 },
];

const queueData: QueuePatient[] = [
  {
    token: "A-101",
    patientName: "Riya Sharma",
    predictedDuration: "12 min",
    status: "Waiting",
  },
  {
    token: "A-102",
    patientName: "Aman Verma",
    predictedDuration: "18 min",
    status: "In Consultation",
    emergency: true,
  },
  {
    token: "A-103",
    patientName: "Neha Gupta",
    predictedDuration: "10 min",
    status: "No Show",
  },
  {
    token: "A-104",
    patientName: "Rahul Das",
    predictedDuration: "15 min",
    status: "Waiting",
    emergency: true,
  },
];

function formatElapsed(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function statusBadgeClass(status: QueueStatus) {
  if (status === "Waiting") {
    return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40";
  }
  if (status === "In Consultation") {
    return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
  }
  return "bg-red-500/20 text-red-300 border border-red-500/40";
}

export default function DoctorDashboard() {
  const [timers, setTimers] = useState<Record<string, RowTimers>>({});
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const totalPatients = useMemo(() => queueData.length, []);

  const onStartConsultation = (token: string) => {
    setTimers((prev) => ({
      ...prev,
      [token]: {
        ...prev[token],
        startAt: Date.now(),
      },
    }));
  };

  const onEndConsultation = (token: string) => {
    setTimers((prev) => ({
      ...prev,
      [token]: {
        ...prev[token],
        endAt: Date.now(),
      },
    }));
  };

  return (
    <main className="min-h-screen bg-[var(--bg-secondary)] px-6 py-8 text-[var(--text-primary)]">
      <div className="mx-auto w-full max-w-7xl">
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-[var(--gold)]/25 bg-[var(--bg-primary)]/70 p-5">
            <p className="text-sm text-[var(--text-muted)]">Patients Today</p>
            <p className="mt-2 text-2xl font-semibold">24</p>
          </div>
          <div className="rounded-2xl border border-[var(--gold)]/25 bg-[var(--bg-primary)]/70 p-5">
            <p className="text-sm text-[var(--text-muted)]">Avg Consult Time</p>
            <p className="mt-2 text-2xl font-semibold">14 min</p>
          </div>
          <div className="rounded-2xl border border-[var(--gold)]/25 bg-[var(--bg-primary)]/70 p-5">
            <p className="text-sm text-[var(--text-muted)]">Queue Status</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-300">Active</p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[var(--gold)]/20 bg-[var(--bg-primary)]/70 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Hourly Patient Load</h2>
            <span className="text-xs text-[var(--text-muted)]">
              Total in table: {totalPatients}
            </span>
          </div>

          <div className="h-72 w-full min-h-[18rem] min-w-0">
            <ResponsiveContainer width="100%" height={288}>
              <BarChart data={hourlyLoad}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.25)" />
                <XAxis dataKey="hour" stroke="#94a3b8" />
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
                <Bar dataKey="patients" fill="var(--gold)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[var(--gold)]/20 bg-[var(--bg-primary)]/70 p-5">
          <h2 className="mb-4 text-lg font-semibold">Queue Table</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--gold)]/20 text-[var(--text-muted)]">
                  <th className="px-3 py-3 font-medium">Token</th>
                  <th className="px-3 py-3 font-medium">Patient Name</th>
                  <th className="px-3 py-3 font-medium">Predicted Duration</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {queueData.map((row) => {
                  const rowTimes = timers[row.token];
                  return (
                    <tr
                      key={row.token}
                      className="border-b border-[var(--gold)]/10 last:border-b-0"
                    >
                      <td className="px-3 py-4 font-medium">{row.token}</td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <span>{row.patientName}</span>
                          {row.emergency ? (
                            <span className="rounded-full bg-[var(--purple-light)]/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--purple-light)]">
                              Priority Triage
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-3 py-4">{row.predictedDuration}</td>
                      <td className="px-3 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onStartConsultation(row.token)}
                              className="rounded-lg bg-[var(--gold)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--deep-blue)]"
                            >
                              Start Consultation
                            </button>
                            {rowTimes?.startAt ? (
                              <span className="text-xs text-[var(--text-muted)]">
                                {formatElapsed(now - rowTimes.startAt)}
                              </span>
                            ) : null}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onEndConsultation(row.token)}
                              className="rounded-lg border border-[var(--purple-light)] px-3 py-1.5 text-xs font-semibold text-[var(--purple-light)] hover:bg-[var(--purple-light)]/10"
                            >
                              End Consultation
                            </button>
                            {rowTimes?.endAt ? (
                              <span className="text-xs text-[var(--text-muted)]">
                                {formatElapsed(now - rowTimes.endAt)}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
