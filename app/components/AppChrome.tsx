"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const renderPos = useRef({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!coarse);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (event: MouseEvent) => {
      mousePos.current.x = event.clientX;
      mousePos.current.y = event.clientY;
    };

    let frameId = 0;
    const animate = () => {
      const dx = mousePos.current.x - renderPos.current.x;
      const dy = mousePos.current.y - renderPos.current.y;
      renderPos.current.x += dx * 0.18;
      renderPos.current.y += dy * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${renderPos.current.x - 6}px, ${renderPos.current.y - 6}px, 0)`;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.cancelAnimationFrame(frameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-[var(--gold)] mix-blend-difference"
      aria-hidden="true"
    />
  );
}

function LiveQueueStatusWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[120] flex items-center gap-2 rounded-full border border-[var(--gold)]/25 bg-[var(--bg-primary)]/80 px-4 py-2 text-sm font-medium text-[var(--text-primary)] backdrop-blur-md"
      >
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
        Live Queue Status
      </button>

      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 right-0 z-[130] h-[280px] w-[320px] border-l border-t border-[var(--gold)]/20 bg-[var(--bg-primary)]/95 p-5 backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Live Queue</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-[var(--gold)]/20 bg-white/5 p-3">
                <p className="text-xs text-[var(--text-muted)]">
                  Current Token Being Served
                </p>
                <p className="mt-1 text-xl font-bold text-[var(--gold)]">
                  #44
                </p>
              </div>
              <div className="rounded-lg border border-[var(--gold)]/20 bg-white/5 p-3">
                <p className="text-xs text-[var(--text-muted)]">Queue Length</p>
                <p className="mt-1 text-xl font-bold">18</p>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <LiveQueueStatusWidget />
    </>
  );
}
