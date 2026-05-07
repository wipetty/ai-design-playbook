import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { createPortal } from "react-dom";

interface LightboxThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 6;
const DOUBLE_CLICK_ZOOM = 2.4;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function LightboxThumbnail({
  src,
  alt,
  className,
  style,
}: LightboxThumbnailProps) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement | null>(null);
  // Pointer-based pan + pinch tracking. We support up to two simultaneous
  // pointers so trackpad / touch pinch-zoom works alongside drag-to-pan.
  const pointers = useRef(
    new Map<number, { x: number; y: number }>(),
  );
  const dragRef = useRef<{
    panX: number;
    panY: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);
  const pinchRef = useRef<{
    initialDist: number;
    initialZoom: number;
    initialPan: { x: number; y: number };
    centerX: number;
    centerY: number;
  } | null>(null);

  const reset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    pointers.current.clear();
    dragRef.current = null;
    pinchRef.current = null;
  }, []);

  const closeLightbox = useCallback(() => {
    setOpen(false);
    reset();
  }, [reset]);

  const openLightbox = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, closeLightbox]);

  // Zoom about a point in image-element coordinates so the pixel under the
  // cursor stays put while we scale.
  const zoomAt = useCallback(
    (
      nextZoom: number,
      pointInImage: { x: number; y: number } | null = null,
    ) => {
      const next = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);
      setZoom((current) => {
        if (next === current) return current;
        if (next <= MIN_ZOOM) {
          setPan({ x: 0, y: 0 });
          return MIN_ZOOM;
        }
        const el = imgRef.current;
        if (!el || !pointInImage) {
          setPan((p) => ({
            x: (p.x * next) / current,
            y: (p.y * next) / current,
          }));
          return next;
        }
        const rect = el.getBoundingClientRect();
        // pointInImage is relative to the element's top-left at current
        // transform. Convert to the image's natural-center frame so the
        // formula keeps the cursor's pixel anchored.
        const cx = pointInImage.x - rect.width / 2;
        const cy = pointInImage.y - rect.height / 2;
        const ratio = next / current;
        setPan((p) => ({
          x: cx - (cx - p.x) * ratio,
          y: cy - (cy - p.y) * ratio,
        }));
        return next;
      });
    },
    [],
  );

  const onWheel = useCallback(
    (event: ReactWheelEvent<HTMLImageElement>) => {
      event.preventDefault();
      const el = imgRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Trackpad pinch on macOS arrives as wheel with ctrlKey; use a steeper
      // factor so it feels like a real pinch.
      const factor = event.ctrlKey
        ? Math.exp(-event.deltaY * 0.01)
        : event.deltaY < 0
          ? 1.12
          : 1 / 1.12;
      zoomAt(zoom * factor, {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    },
    [zoom, zoomAt],
  );

  const onDoubleClick = useCallback(
    (event: ReactPointerEvent<HTMLImageElement>) => {
      const el = imgRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const target = zoom > 1 ? 1 : DOUBLE_CLICK_ZOOM;
      zoomAt(target, {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    },
    [zoom, zoomAt],
  );

  const distance = (
    a: { x: number; y: number },
    b: { x: number; y: number },
  ) => Math.hypot(a.x - b.x, a.y - b.y);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLImageElement>) => {
      const el = imgRef.current;
      if (!el) return;
      el.setPointerCapture(event.pointerId);
      pointers.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });

      if (pointers.current.size === 2) {
        // Begin pinch — record initial distance and midpoint.
        const [a, b] = Array.from(pointers.current.values());
        const rect = el.getBoundingClientRect();
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        pinchRef.current = {
          initialDist: distance(a, b),
          initialZoom: zoom,
          initialPan: pan,
          centerX: midX - rect.left,
          centerY: midY - rect.top,
        };
        dragRef.current = null;
      } else if (pointers.current.size === 1) {
        dragRef.current = {
          panX: pan.x,
          panY: pan.y,
          startX: event.clientX,
          startY: event.clientY,
          moved: false,
        };
      }
    },
    [pan, zoom],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLImageElement>) => {
      if (!pointers.current.has(event.pointerId)) return;
      pointers.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });

      if (pinchRef.current && pointers.current.size >= 2) {
        const [a, b] = Array.from(pointers.current.values());
        const dist = distance(a, b);
        const ratio = dist / pinchRef.current.initialDist;
        zoomAt(pinchRef.current.initialZoom * ratio, {
          x: pinchRef.current.centerX,
          y: pinchRef.current.centerY,
        });
        return;
      }

      if (dragRef.current && zoom > 1) {
        const dx = event.clientX - dragRef.current.startX;
        const dy = event.clientY - dragRef.current.startY;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
          dragRef.current.moved = true;
        }
        setPan({
          x: dragRef.current.panX + dx,
          y: dragRef.current.panY + dy,
        });
      }
    },
    [zoom, zoomAt],
  );

  const endPointer = useCallback(
    (event: ReactPointerEvent<HTMLImageElement>) => {
      pointers.current.delete(event.pointerId);
      if (pointers.current.size < 2) {
        pinchRef.current = null;
      }
      if (pointers.current.size === 0) {
        dragRef.current = null;
      }
    },
    [],
  );

  const onImageClick = useCallback(
    (event: ReactPointerEvent<HTMLImageElement>) => {
      // Block overlay-close when the click was actually a drag.
      event.stopPropagation();
      if (dragRef.current?.moved) {
        dragRef.current.moved = false;
      }
    },
    [],
  );

  const cursor =
    zoom > 1 ? (dragRef.current ? "grabbing" : "grab") : "zoom-in";

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`lightbox-img${className ? ` ${className}` : ""}`}
        style={style}
        loading="lazy"
        decoding="async"
        role="button"
        tabIndex={0}
        onClick={openLightbox}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLightbox();
          }
        }}
      />
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="lightbox-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={closeLightbox}
          >
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close image"
              onClick={(event) => {
                event.stopPropagation();
                closeLightbox();
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
            <div
              className="lightbox-stage"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                ref={imgRef}
                src={src}
                alt={alt}
                className="lightbox-image"
                draggable={false}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  cursor,
                  touchAction: "none",
                }}
                onWheel={onWheel}
                onDoubleClick={onDoubleClick}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endPointer}
                onPointerCancel={endPointer}
                onClick={onImageClick}
              />
            </div>
            <div className="lightbox-controls" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="lightbox-control"
                aria-label="Zoom out"
                onClick={() => zoomAt(zoom / 1.4)}
                disabled={zoom <= MIN_ZOOM + 0.001}
              >
                <span aria-hidden="true">−</span>
              </button>
              <span className="lightbox-zoom-readout" aria-live="polite">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                className="lightbox-control"
                aria-label="Zoom in"
                onClick={() => zoomAt(zoom * 1.4)}
                disabled={zoom >= MAX_ZOOM - 0.001}
              >
                <span aria-hidden="true">+</span>
              </button>
              <button
                type="button"
                className="lightbox-control lightbox-control-text"
                aria-label="Reset zoom"
                onClick={reset}
                disabled={zoom === 1 && pan.x === 0 && pan.y === 0}
              >
                Reset
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
