import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

type CoffeeButtonProps = {
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

const CONFETTI_EMOJIS = ["☕", "☕", "☕", "☕", "✨", "🫶"];
const CONFETTI_COUNT = 28;

type ConfettiPiece = {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  drift: number;
  rotate: number;
  size: number;
};

function makeConfetti(seed: number): ConfettiPiece[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, i) => {
    const r = (n: number) => {
      const x = Math.sin(seed * 9301 + i * 49297 + n * 233280) * 10000;
      return x - Math.floor(x);
    };
    return {
      id: i,
      emoji: CONFETTI_EMOJIS[Math.floor(r(1) * CONFETTI_EMOJIS.length)],
      left: r(2) * 100,
      delay: r(3) * 600,
      duration: 1800 + r(4) * 1400,
      drift: (r(5) - 0.5) * 120,
      rotate: (r(6) - 0.5) * 540,
      size: 22 + r(7) * 18,
    };
  });
}

export function CoffeeButton({
  className,
  ariaLabel,
  children,
}: CoffeeButtonProps) {
  const [open, setOpen] = useState(false);
  const [confettiSeed, setConfettiSeed] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const confetti = useMemo(
    () => (showConfetti ? makeConfetti(confettiSeed) : []),
    [showConfetti, confettiSeed],
  );

  useEffect(() => {
    if (!open) return;
    setConfettiSeed((n) => n + 1);
    setShowConfetti(true);
    const hideTimer = window.setTimeout(() => setShowConfetti(false), 3400);
    return () => window.clearTimeout(hideTimer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const triggerEl = triggerRef.current;
    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      triggerEl?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={className}
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>

      {open &&
        createPortal(
          <div
            className="coffee-overlay"
            role="presentation"
            onClick={() => setOpen(false)}
          >
            {showConfetti && (
              <div className="coffee-confetti" aria-hidden="true">
                {confetti.map((p) => (
                  <span
                    key={p.id}
                    className="coffee-confetti-piece"
                    style={
                      {
                        left: `${p.left}%`,
                        fontSize: `${p.size}px`,
                        animationDelay: `${p.delay}ms`,
                        animationDuration: `${p.duration}ms`,
                        ["--drift" as string]: `${p.drift}px`,
                        ["--rotate" as string]: `${p.rotate}deg`,
                      } as React.CSSProperties
                    }
                  >
                    {p.emoji}
                  </span>
                ))}
              </div>
            )}
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="coffee-dialog-title"
              className="coffee-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="coffee-dialog-head">
                <span className="coffee-dialog-eyebrow">Buy me a coffee</span>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="coffee-close"
                  aria-label="Close buy me a coffee"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <div className="coffee-dialog-body">
                <h2 id="coffee-dialog-title" className="coffee-title">
                  Thank you <em>truly</em>.
                </h2>
                <p className="coffee-lede">
                  This playbook is a quiet side project. If a chapter helped
                  you ship better work, a small tip keeps the next one coming.
                </p>

                <div className="coffee-options">
                  <div className="coffee-option">
                    <div className="coffee-qr-frame">
                      <img
                        src="/images/venmo-qr.png"
                        alt="Venmo QR code for @wipetty"
                        className="coffee-qr"
                      />
                    </div>
                    <div className="coffee-brand">
                      <img
                        src="/images/venmo-logo.png"
                        alt="Venmo"
                        className="coffee-brand-logo"
                      />
                    </div>
                  </div>

                  <div className="coffee-option">
                    <div className="coffee-qr-frame">
                      <img
                        src="/images/zelle-qr.png"
                        alt="Zelle QR code"
                        className="coffee-qr"
                      />
                    </div>
                    <div className="coffee-brand">
                      <img
                        src="/images/zelle-logo.png"
                        alt="Zelle"
                        className="coffee-brand-logo coffee-brand-logo-zelle"
                      />
                    </div>
                  </div>
                </div>

                <p className="coffee-handle">
                  Scan with your camera, or search{" "}
                  <span className="coffee-handle-link">@wipetty</span> on
                  Venmo.
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export default CoffeeButton;
