import { forwardRef, useEffect, useRef } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { usePrefersReducedMotion } from "../hooks/useInView";

interface MagneticLinkProps extends LinkProps {
  /** strength of the pull, 0–1 */
  strength?: number;
  /** distance in px the inner content travels at full strength */
  travel?: number;
  children: React.ReactNode;
}

/**
 * GSAP-style magnetic hover. The button slides toward the cursor while
 * inside its bounding box, returning home with a soft spring. Respects
 * reduced-motion. Thin wrapper around react-router's Link so existing
 * routing/transition props pass through.
 */
export const MagneticLink = forwardRef<HTMLAnchorElement, MagneticLinkProps>(
  function MagneticLink(
    { strength = 0.35, travel = 12, children, className, onMouseLeave, ...rest },
    ref,
  ) {
    const innerRef = useRef<HTMLSpanElement>(null);
    const reduceMotion = usePrefersReducedMotion();

    useEffect(() => {
      if (reduceMotion) return;
      const el = innerRef.current;
      if (!el) return;
      const parent = el.parentElement;
      if (!parent) return;

      let raf = 0;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      const tick = () => {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        el.style.transform = `translate(${currentX}px, ${currentY}px)`;
        if (
          Math.abs(targetX - currentX) > 0.05 ||
          Math.abs(targetY - currentY) > 0.05
        ) {
          raf = requestAnimationFrame(tick);
        }
      };

      const onMove = (e: MouseEvent) => {
        const rect = parent.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy =
          (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        targetX = dx * travel * strength;
        targetY = dy * travel * strength;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      };
      const onLeave = () => {
        targetX = 0;
        targetY = 0;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      };

      parent.addEventListener("mousemove", onMove);
      parent.addEventListener("mouseleave", onLeave);
      return () => {
        parent.removeEventListener("mousemove", onMove);
        parent.removeEventListener("mouseleave", onLeave);
        cancelAnimationFrame(raf);
      };
    }, [reduceMotion, strength, travel]);

    return (
      <Link
        ref={ref}
        className={`magnetic${className ? ` ${className}` : ""}`}
        onMouseLeave={onMouseLeave}
        {...rest}
      >
        <span ref={innerRef} className="magnetic-inner">
          {children}
        </span>
      </Link>
    );
  },
);
