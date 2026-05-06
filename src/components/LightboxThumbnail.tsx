import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

interface LightboxThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

export default function LightboxThumbnail({
  src,
  alt,
  className,
  style,
}: LightboxThumbnailProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const openLightbox = () => setOpen(true);
  const closeLightbox = () => setOpen(false);

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
            <img
              src={src}
              alt={alt}
              className="lightbox-image"
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
