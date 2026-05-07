import { useEffect, useState } from "react";

const SHOW_AFTER = 600;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SHOW_AFTER);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={handleClick}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <span className="back-to-top-arrow" aria-hidden="true">
        ↑
      </span>
      <span className="back-to-top-label">Top</span>
    </button>
  );
}

export default BackToTop;
