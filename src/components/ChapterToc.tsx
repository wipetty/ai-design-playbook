import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";
import { playbook } from "../data/playbook";

export function ChapterToc() {
  const [open, setOpen] = useState(false);
  const { partId, chapterId } = useParams();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    setOpen(false);
  }, [partId, chapterId]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="toc-trigger"
        aria-label="Open table of contents"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
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
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h10" />
        </svg>
        <span className="toc-trigger-label">Contents</span>
      </button>

      {open &&
        createPortal(
          <div
            className="toc-overlay"
            role="presentation"
            onClick={() => setOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Table of contents"
              className="toc-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="toc-dialog-head">
                <span className="toc-dialog-eyebrow">Contents</span>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="toc-close"
                  aria-label="Close table of contents"
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

              <div className="toc-dialog-body">
                <ol className="toc-parts">
                  {playbook.map((part) => (
                    <li key={part.id} className="toc-part">
                      <div className="toc-part-head">
                        <span className="toc-part-eyebrow">
                          Part {String(part.number).padStart(2, "0")}
                        </span>
                        <h3 className="toc-part-title">{part.title}</h3>
                      </div>
                      <ol className="toc-chapters">
                        {part.chapters.map((chapter) => {
                          const isCurrent =
                            part.id === partId && chapter.id === chapterId;
                          return (
                            <li key={chapter.id}>
                              <Link
                                to={`/${part.id}/${chapter.id}`}
                                className={`toc-chapter${
                                  isCurrent ? " toc-chapter-current" : ""
                                }`}
                                aria-current={isCurrent ? "page" : undefined}
                                viewTransition
                              >
                                <span className="toc-chapter-number">
                                  {String(chapter.number).padStart(2, "0")}
                                </span>
                                <span className="toc-chapter-title">
                                  {chapter.title}
                                </span>
                                <span className="toc-chapter-readtime">
                                  {chapter.readTime}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ol>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export default ChapterToc;
