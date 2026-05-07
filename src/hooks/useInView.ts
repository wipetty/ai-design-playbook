import { useEffect, useRef, useState } from "react";

/**
 * Sets `inView` to true the first time the element intersects the viewport.
 * Disconnects the observer afterwards, so it only fires once.
 */
export function useInView<T extends HTMLElement>(
  rootMargin = "0px 0px -10% 0px",
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const node = ref.current;
    if (!node) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      typeof window === "undefined"
    ) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.15 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [inView, rootMargin]);

  return [ref, inView];
}

/**
 * Returns true when the user has reduced-motion enabled.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);
  return reduced;
}
