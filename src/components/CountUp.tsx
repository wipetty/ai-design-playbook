import { useEffect, useState } from "react";
import { useInView, usePrefersReducedMotion } from "../hooks/useInView";

interface CountUpProps {
  to: number;
  /** ms to fully count up */
  duration?: number;
  /** prefix the rendered number */
  prefix?: string;
  /** suffix appended to the rendered number */
  suffix?: string;
  className?: string;
}

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

/**
 * Animates a number from 0 → `to` once it scrolls into view. Used for the
 * stat strip on the homepage. Respects reduced-motion.
 */
export function CountUp({
  to,
  duration = 1400,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const [ref, inView] = useInView<HTMLSpanElement>("0px 0px -15% 0px");
  const reduceMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(reduceMotion ? to : 0);

  useEffect(() => {
    if (!inView || reduceMotion) {
      setValue(to);
      return;
    }
    let raf = 0;
    let startTs: number | null = null;
    const tick = (now: number) => {
      if (startTs === null) startTs = now;
      const t = Math.min(1, (now - startTs) / duration);
      setValue(Math.round(easeOutQuint(t) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
