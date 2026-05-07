import { Fragment, useEffect, useRef, useState } from "react";
import type { SectionBlock } from "../data/playbook";
import Icon from "./Icon";
import LightboxThumbnail from "./LightboxThumbnail";

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

/*
 * Fires once the element first crosses ~15% into the viewport.
 * Returns a ref + className suffix so diagram components can opt in
 * to a "reveal" animation without each re-implementing the observer.
 */
function useInView<T extends HTMLElement>(
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

function revealClass(inView: boolean) {
  return inView ? " is-in-view" : "";
}

function RichText({ text }: { text: string }) {
  const parts: Array<string | { label: string; href: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push({ label: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  if (parts.length === 0) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) => {
        if (typeof part === "string") return <span key={i}>{part}</span>;
        const isExternal = /^https?:\/\//.test(part.href);
        return (
          <a
            key={i}
            className="cb-link"
            href={part.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {part.label}
          </a>
        );
      })}
    </>
  );
}

export function SectionBlocks({ blocks }: { blocks: SectionBlock[] }) {
  return (
    <div className="cb-stack">
      {blocks.map((block, idx) => (
        <Block key={idx} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: SectionBlock }) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p className="cb-paragraph">
          <RichText text={block.text} />
        </p>
      );

    case "callout":
      return (
        <aside
          className={`cb-callout cb-callout-${block.tone ?? "accent"}`}
          role="note"
        >
          {block.icon && (
            <span className="cb-callout-icon" aria-hidden="true">
              <Icon name={block.icon} size={20} />
            </span>
          )}
          <div className="cb-callout-body">
            {block.title && <p className="cb-callout-title">{block.title}</p>}
            <p className="cb-callout-text">
              <RichText text={block.text} />
            </p>
            {block.image && (
              <figure className="cb-callout-figure">
                <div className="cb-callout-figure-frame">
                  <LightboxThumbnail
                    src={block.image.src}
                    alt={block.image.alt}
                  />
                </div>
                {block.image.caption && (
                  <figcaption className="cb-callout-figure-caption">
                    <RichText text={block.image.caption} />
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        </aside>
      );

    case "quote":
      return (
        <figure className="cb-quote">
          <blockquote>
            <span className="cb-quote-mark" aria-hidden="true">
              “
            </span>
            <p>{block.text}</p>
          </blockquote>
          {block.attribution && (
            <figcaption className="cb-quote-attribution">
              — {block.attribution}
            </figcaption>
          )}
        </figure>
      );

    case "pullquote":
      return (
        <p className="cb-pullquote">
          <span aria-hidden="true" className="cb-pullquote-bar" />
          <span className="cb-pullquote-text">{block.text}</span>
        </p>
      );

    case "cards": {
      const columns = block.columns ?? 2;
      return (
        <div className={`cb-cards cb-cards-${columns}`} role="list">
          {block.items.map((item, i) => (
            <article
              key={i}
              className={`cb-card${item.image ? " cb-card-has-image" : ""}`}
              role="listitem"
            >
              {item.image && (
                <div className="cb-card-image">
                  <LightboxThumbnail
                    src={item.image.src}
                    alt={item.image.alt}
                    style={
                      item.image.position
                        ? { objectPosition: item.image.position }
                        : undefined
                    }
                  />
                </div>
              )}
              <div className="cb-card-content">
                {item.icon && (
                  <span className="cb-card-icon" aria-hidden="true">
                    <Icon name={item.icon} size={22} />
                  </span>
                )}
                {item.eyebrow && (
                  <span className="cb-card-eyebrow">{item.eyebrow}</span>
                )}
                <h3 className="cb-card-title">{item.title}</h3>
                <p className="cb-card-text">
                  <RichText text={item.text} />
                </p>
                {item.meta && (
                  <p className="cb-card-meta">
                    <RichText text={item.meta} />
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      );
    }

    case "flow":
      return <Flow block={block} />;

    case "wink":
      return (
        <p className="cb-wink" role="note">
          <span aria-hidden="true" className="cb-wink-mark">
            <Icon name="spark" size={14} />
          </span>
          <span className="cb-wink-text">
            <RichText text={block.text} />
          </span>
        </p>
      );

    case "compareFlow":
      return (
        <div className="cb-compare">
          <div className="cb-compare-side cb-compare-before">
            <span className="cb-compare-label">{block.before.label}</span>
            <ol className="cb-compare-steps">
              {block.before.steps.map((s, i) => (
                <li key={i} className="cb-compare-step">
                  <span className="cb-compare-step-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="cb-compare-step-text">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="cb-compare-divider" aria-hidden="true">
            <Icon name="arrow" size={16} />
          </div>
          <div className="cb-compare-side cb-compare-after">
            <span className="cb-compare-label">{block.after.label}</span>
            <ol className="cb-compare-steps">
              {block.after.steps.map((s, i) => (
                <li key={i} className="cb-compare-step">
                  <span className="cb-compare-step-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="cb-compare-step-text">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      );

    case "checklist":
      return (
        <ul className="cb-checklist">
          {block.items.map((item, i) => {
            const hasMedia = Boolean(item.image || item.video);
            return (
              <li
                key={i}
                className={`cb-check-item cb-check-${item.positive ? "yes" : "no"}${hasMedia ? " cb-check-has-media" : ""}`}
              >
                <span className="cb-check-mark" aria-hidden="true">
                  <Icon name={item.positive ? "check" : "x"} size={14} />
                </span>
                <div className="cb-check-body">
                  <span className="cb-check-title">
                    {item.positive ? "Does" : "Doesn't"}: {item.title}
                  </span>
                  <span className="cb-check-text">
                    <RichText text={item.text} />
                  </span>
                </div>
                {hasMedia && (
                  <div className="cb-check-media">
                    {item.video ? (
                      <video
                        className="cb-video-player"
                        src={item.video.src}
                        poster={item.video.poster}
                        aria-label={item.video.alt}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : item.image ? (
                      <LightboxThumbnail
                        src={item.image.src}
                        alt={item.image.alt}
                      />
                    ) : null}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      );

    case "steps":
      return (
        <ol className="cb-steps">
          {block.items.map((item, i) => (
            <li
              key={i}
              className={`cb-step${item.image ? " cb-step-has-image" : ""}${item.image?.variant === "logo" ? " cb-step-has-logo" : ""}`}
            >
              <span className="cb-step-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="cb-step-body">
                <h3 className="cb-step-title">{item.title}</h3>
                <p className="cb-step-text">
                  <RichText text={item.text} />
                </p>
                {item.image &&
                  (item.image.variant === "logo" ? (
                    <div className="cb-step-image cb-step-image-logo">
                      <img
                        src={item.image.src}
                        alt={item.image.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <div className="cb-step-image">
                      <LightboxThumbnail
                        src={item.image.src}
                        alt={item.image.alt}
                      />
                    </div>
                  ))}
              </div>
            </li>
          ))}
        </ol>
      );

    case "stats":
      return (
        <ul className="cb-stats">
          {block.items.map((item, i) => (
            <li key={i} className="cb-stat">
              <span className="cb-stat-value">{item.value}</span>
              <span className="cb-stat-label">{item.label}</span>
              {item.meta && <span className="cb-stat-meta">{item.meta}</span>}
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div className="cb-table-wrap">
          <table className="cb-table">
            <thead>
              <tr>
                {block.columns.map((c, i) => (
                  <th key={i} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "pathway":
      return (
        <ol className="cb-pathway">
          {block.items.map((item, i) => (
            <li key={i} className="cb-path-item">
              <span className="cb-path-num">{item.number}</span>
              <div className="cb-path-body">
                <h3 className="cb-path-title">{item.title}</h3>
                <p className="cb-path-desc">{item.description}</p>
              </div>
              {i < block.items.length - 1 && (
                <span className="cb-path-line" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      );

    case "slope":
      return <SlopeChart block={block} />;

    case "stageStack":
      return <StageStack block={block} />;

    case "roomDiagram":
      return <RoomDiagram block={block} />;

    case "mirror":
      return <MirrorDiagram block={block} />;

    case "figureGrid": {
      const columns = block.columns ?? 2;
      const framedClass = block.framed ? " cb-figure-grid-framed" : "";
      return (
        <figure
          className={`cb-figure-grid cb-figure-grid-${columns}${framedClass}`}
        >
          <div className="cb-figure-grid-track">
            {block.items.map((item, i) => (
              <figure key={i} className="cb-figure-tile">
                <div className="cb-figure-frame">
                  {item.video ? (
                    <video
                      className="cb-video-player"
                      src={item.video.src}
                      poster={item.video.poster}
                      aria-label={item.video.alt}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : item.image ? (
                    <LightboxThumbnail
                      src={item.image.src}
                      alt={item.image.alt}
                    />
                  ) : null}
                </div>
                <figcaption className="cb-figure-caption">
                  {item.eyebrow && (
                    <span className="cb-figure-eyebrow">{item.eyebrow}</span>
                  )}
                  <span className="cb-figure-caption-text">
                    <RichText text={item.caption} />
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          {block.caption && (
            <figcaption className="cb-figure-grid-caption">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "code":
      return (
        <figure className="cb-code">
          {(block.label || block.language) && (
            <figcaption className="cb-code-header">
              {block.label && (
                <span className="cb-code-label">{block.label}</span>
              )}
              {block.language && (
                <span className="cb-code-lang">{block.language}</span>
              )}
            </figcaption>
          )}
          <pre className="cb-code-body">
            <code>{block.text}</code>
          </pre>
        </figure>
      );

    case "figure":
      return (
        <figure className="cb-figure">
          <div className="cb-figure-frame">
            <LightboxThumbnail
              src={block.image.src}
              alt={block.image.alt}
            />
          </div>
          {(block.eyebrow || block.caption) && (
            <figcaption className="cb-figure-caption cb-figure-caption-center">
              {block.eyebrow && (
                <span className="cb-figure-eyebrow">{block.eyebrow}</span>
              )}
              {block.caption && (
                <span className="cb-figure-caption-text">
                  <RichText text={block.caption} />
                </span>
              )}
            </figcaption>
          )}
        </figure>
      );

    case "ratio":
      return (
        <figure className="cb-ratio">
          {block.rows.map((row, i) => (
            <div
              key={i}
              className={`cb-ratio-row cb-ratio-row-${row.tone ?? "active"}`}
            >
              {row.label && (
                <span className="cb-ratio-label">{row.label}</span>
              )}
              <div className="cb-ratio-equation">
                <div className="cb-ratio-term">
                  <span className="cb-ratio-term-title">{row.left.title}</span>
                  {row.left.text && (
                    <span className="cb-ratio-term-text">{row.left.text}</span>
                  )}
                </div>
                <span className="cb-ratio-operator" aria-hidden="true">
                  {row.operator}
                </span>
                <div className="cb-ratio-term">
                  <span className="cb-ratio-term-title">
                    {row.right.title}
                  </span>
                  {row.right.text && (
                    <span className="cb-ratio-term-text">
                      {row.right.text}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {block.caption && (
            <figcaption className="cb-figure-caption cb-figure-caption-center">
              <span className="cb-figure-caption-text">
                <RichText text={block.caption} />
              </span>
            </figcaption>
          )}
        </figure>
      );

    case "variantDemo":
      return <VariantDemo block={block} />;

    case "video":
      return (
        <figure className="cb-figure cb-video">
          <div className="cb-figure-frame cb-video-frame">
            <video
              className="cb-video-player"
              src={block.src}
              poster={block.poster}
              aria-label={block.alt}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
          {(block.eyebrow || block.caption) && (
            <figcaption className="cb-figure-caption cb-figure-caption-center">
              {block.eyebrow && (
                <span className="cb-figure-eyebrow">{block.eyebrow}</span>
              )}
              {block.caption && (
                <span className="cb-figure-caption-text">
                  <RichText text={block.caption} />
                </span>
              )}
            </figcaption>
          )}
        </figure>
      );

    case "anatomy":
      return <AnatomyDiagram block={block} />;

    case "balance":
      return <BalanceDiagram block={block} />;

    case "bento":
      return <BentoGrid block={block} />;

    case "loopOrbit":
      return <LoopOrbit block={block} />;

    case "lensCompare":
      return <LensCompare block={block} />;

    case "blindSpot":
      return <BlindSpot block={block} />;

    case "driftMeter":
      return <DriftMeter block={block} />;

    case "signGrid":
      return <SignGrid block={block} />;

    case "typeStack":
      return <TypeStack block={block} />;

    case "swatchSet":
      return <SwatchSet block={block} />;

    case "themeTokens":
      return <ThemeTokens block={block} />;

    case "themeLayers":
      return <ThemeLayers block={block} />;

    case "colorRoles":
      return <ColorRoles block={block} />;

    case "driftAudit":
      return <DriftAudit block={block} />;

    case "weightMap":
      return <WeightMap block={block} />;

    case "spacingRhythm":
      return <SpacingRhythm block={block} />;

    case "motionTrace":
      return <MotionTrace block={block} />;
  }
}

function Flow({
  block,
}: {
  block: Extract<SectionBlock, { kind: "flow" }>;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`cb-flow${revealClass(inView)}`}
      aria-label={block.label}
    >
      {block.label && <span className="cb-flow-label">{block.label}</span>}
      <ol className="cb-flow-track">
        {block.steps.map((step, i) => (
          <li key={i} className="cb-flow-step">
            {step.meta && <span className="cb-flow-meta">{step.meta}</span>}
            <span className="cb-flow-title">{step.title}</span>
            {i < block.steps.length - 1 && (
              <span className="cb-flow-arrow" aria-hidden="true">
                <Icon name="arrow" size={14} />
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function AnatomyDiagram({
  block,
}: {
  block: Extract<SectionBlock, { kind: "anatomy" }>;
}) {
  const orderedNotes = [...block.notes].sort((a, b) => a.mark - b.mark);
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <figure ref={ref} className={`cb-anatomy${revealClass(inView)}`}>
      {block.label && (
        <figcaption className="cb-anatomy-label">{block.label}</figcaption>
      )}
      <div className="cb-anatomy-grid">
        <pre className="cb-anatomy-source" aria-label={block.label}>
          {block.lines.map((line, i) => (
            <div key={i} className="cb-anatomy-line">
              <span className="cb-anatomy-line-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <code className="cb-anatomy-line-text">
                {line.text || "\u00A0"}
              </code>
              {line.mark != null && (
                <span
                  className="cb-anatomy-mark"
                  aria-label={`See note ${line.mark}`}
                >
                  {line.mark}
                </span>
              )}
            </div>
          ))}
        </pre>
        <ol className="cb-anatomy-notes">
          {orderedNotes.map((note) => (
            <li key={note.mark} className="cb-anatomy-note">
              <span className="cb-anatomy-note-mark" aria-hidden="true">
                {note.mark}
              </span>
              <div className="cb-anatomy-note-body">
                <p className="cb-anatomy-note-label">{note.label}</p>
                <p className="cb-anatomy-note-text">
                  <RichText text={note.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {block.caption && (
        <p className="cb-anatomy-caption">
          <RichText text={block.caption} />
        </p>
      )}
    </figure>
  );
}

function VariantDemo({
  block,
}: {
  block: Extract<SectionBlock, { kind: "variantDemo" }>;
}) {
  const [active, setActive] = useState(block.variants[0]?.key ?? "");
  const current =
    block.variants.find((v) => v.key === active) ?? block.variants[0];
  if (!current) return null;
  return (
    <figure className="cb-variant-demo">
      <div className="cb-variant-demo-frame">
        <div className="cb-variant-demo-chrome" aria-hidden="true">
          <div className="cb-variant-demo-dots">
            <span />
            <span />
            <span />
          </div>
          <div className="cb-variant-demo-url">
            prototype.local/?variant={current.key}
          </div>
        </div>
        <div className="cb-variant-demo-toolbar">
          <span className="cb-variant-demo-toolbar-label">Variant</span>
          <div className="cb-variant-demo-tabs" role="tablist">
            {block.variants.map((v) => {
              const isActive = v.key === current.key;
              return (
                <button
                  key={v.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`cb-variant-demo-tab${isActive ? " is-active" : ""}`}
                  onClick={() => setActive(v.key)}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="cb-variant-demo-canvas">
          {block.task && (
            <p className="cb-variant-demo-task">{block.task}</p>
          )}
          <div
            className="cb-variant-demo-stage"
            role="tabpanel"
            aria-label={`${current.label} preview`}
          >
            <VariantPreview kind={current.preview} />
          </div>
          {current.note && (
            <p className="cb-variant-demo-note">
              <RichText text={current.note} />
            </p>
          )}
        </div>
      </div>
      {(block.eyebrow || block.caption) && (
        <figcaption className="cb-figure-caption cb-figure-caption-center">
          {block.eyebrow && (
            <span className="cb-figure-eyebrow">{block.eyebrow}</span>
          )}
          {block.caption && (
            <span className="cb-figure-caption-text">
              <RichText text={block.caption} />
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

const SAMPLE_ITEMS: {
  title: string;
  meta: string;
  status: "draft" | "review" | "shipped";
}[] = [
  { title: "Empty state — Edit", meta: "Anya · 2h ago", status: "review" },
  { title: "Variant switcher", meta: "Jordan · yesterday", status: "draft" },
  { title: "Funnel benchmark", meta: "Maya · Mon", status: "shipped" },
  { title: "Date picker spec", meta: "Lee · Mon", status: "review" },
  { title: "Plan template v3", meta: "Anya · last week", status: "shipped" },
  { title: "Toolbar cleanup", meta: "Jordan · last week", status: "draft" },
];

function VariantPreview({
  kind,
}: {
  kind: "compact" | "cards" | "dense";
}) {
  switch (kind) {
    case "compact":
      return (
        <div className="cb-variant-preview cb-variant-preview-compact">
          <div className="cb-variant-preview-head">
            <span className="cb-variant-preview-title">Recent work</span>
            <span className="cb-variant-preview-count">
              {SAMPLE_ITEMS.length} items
            </span>
          </div>
          <ul className="cb-variant-preview-list">
            {SAMPLE_ITEMS.map((item) => (
              <li key={item.title}>
                <span className="cb-variant-preview-row-title">
                  {item.title}
                </span>
                <span className="cb-variant-preview-row-meta">
                  {item.meta}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "cards":
      return (
        <div className="cb-variant-preview cb-variant-preview-cards">
          <div className="cb-variant-preview-head">
            <span className="cb-variant-preview-title">Recent work</span>
            <span className="cb-variant-preview-count">
              {SAMPLE_ITEMS.length} items
            </span>
          </div>
          <div className="cb-variant-preview-card-grid">
            {SAMPLE_ITEMS.slice(0, 4).map((item, i) => (
              <article
                key={item.title}
                className={`cb-variant-preview-card cb-variant-preview-card-${i % 4}`}
              >
                <div className="cb-variant-preview-card-thumb" aria-hidden="true" />
                <div className="cb-variant-preview-card-body">
                  <span className="cb-variant-preview-card-title">
                    {item.title}
                  </span>
                  <span className="cb-variant-preview-card-meta">
                    {item.meta}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      );
    case "dense":
      return (
        <div className="cb-variant-preview cb-variant-preview-dense">
          <div className="cb-variant-preview-head">
            <span className="cb-variant-preview-title">Recent work</span>
            <span className="cb-variant-preview-count">
              {SAMPLE_ITEMS.length} items
            </span>
          </div>
          <table className="cb-variant-preview-table">
            <thead>
              <tr>
                <th>Title ↓</th>
                <th>Owner</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_ITEMS.map((item) => (
                <tr key={item.title}>
                  <td>{item.title}</td>
                  <td>{item.meta}</td>
                  <td>
                    <span
                      className={`cb-variant-preview-status cb-variant-preview-status-${item.status}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

function BalanceDiagram({
  block,
}: {
  block: Extract<SectionBlock, { kind: "balance" }>;
}) {
  const tilt = block.tilt ?? "even";
  const angle = tilt === "left" ? -8 : tilt === "right" ? 8 : 0;
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <figure
      ref={ref}
      className={`cb-balance cb-balance-tilt-${tilt}${revealClass(inView)}`}
    >
      <svg
        className="cb-balance-svg"
        viewBox="0 0 400 220"
        role="img"
        aria-label={`Tradeoff between ${block.left.label} and ${block.right.label}`}
      >
        <line
          x1="200"
          y1="60"
          x2="200"
          y2="180"
          className="cb-balance-stem"
        />
        <polygon
          points="200,60 170,180 230,180"
          className="cb-balance-base"
        />
        <line
          x1="180"
          y1="200"
          x2="220"
          y2="200"
          className="cb-balance-floor"
        />
        <g
          className="cb-balance-beam-group"
          style={{
            transform: `rotate(${inView ? angle : 0}deg)`,
            transformOrigin: "200px 60px",
            transition:
              "transform 1000ms cubic-bezier(.2,.7,.2,1) 320ms",
          }}
        >
          <line
            x1="60"
            y1="60"
            x2="340"
            y2="60"
            className="cb-balance-beam"
          />
          <line
            x1="80"
            y1="60"
            x2="80"
            y2="100"
            className="cb-balance-rope"
          />
          <line
            x1="320"
            y1="60"
            x2="320"
            y2="100"
            className="cb-balance-rope"
          />
          <circle
            cx="80"
            cy="118"
            r="22"
            className="cb-balance-pan-shape"
          />
          <circle
            cx="320"
            cy="118"
            r="22"
            className="cb-balance-pan-shape"
          />
        </g>
      </svg>
      <div className="cb-balance-pans">
        <div className="cb-balance-pan cb-balance-pan-left">
          <p className="cb-balance-pan-label">{block.left.label}</p>
          <p className="cb-balance-pan-text">
            <RichText text={block.left.text} />
          </p>
        </div>
        <div className="cb-balance-pan cb-balance-pan-right">
          <p className="cb-balance-pan-label">{block.right.label}</p>
          <p className="cb-balance-pan-text">
            <RichText text={block.right.text} />
          </p>
        </div>
      </div>
      {block.caption && (
        <figcaption className="cb-balance-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function BentoGrid({
  block,
}: {
  block: Extract<SectionBlock, { kind: "bento" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <figure ref={ref} className={`cb-bento${revealClass(inView)}`}>
      <div className="cb-bento-grid">
        {block.items.map((item, i) => (
          <article
            key={i}
            className={`cb-bento-tile cb-bento-tile-${item.size ?? "small"}${item.accent ? " cb-bento-tile-accent" : ""}`}
          >
            {item.icon && (
              <span className="cb-bento-icon" aria-hidden="true">
                <Icon name={item.icon} size={18} />
              </span>
            )}
            {item.eyebrow && (
              <span className="cb-bento-eyebrow">{item.eyebrow}</span>
            )}
            <h3 className="cb-bento-title">{item.title}</h3>
            <p className="cb-bento-text">
              <RichText text={item.text} />
            </p>
          </article>
        ))}
      </div>
      {block.caption && (
        <figcaption className="cb-bento-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function StageStack({
  block,
}: {
  block: Extract<SectionBlock, { kind: "stageStack" }>;
}) {
  const stages = [...block.stages].reverse();
  const top = stages[0];
  const attentionLabel = block.attentionLabel ?? "Where your attention is";

  return (
    <figure className="cb-stack-diagram">
      <ol className="cb-stack-layers" role="list">
        {stages.map((s, i) => {
          const isTop = i === 0;
          return (
            <li
              key={s.number}
              className={`cb-stack-layer${isTop ? " cb-stack-layer-top" : ""}`}
            >
              <div className="cb-stack-layer-row">
                <span className="cb-stack-layer-num">{s.number}</span>
                <div className="cb-stack-layer-body">
                  <p className="cb-stack-layer-name">{s.name}</p>
                  <p className="cb-stack-layer-verb">{s.verb}</p>
                </div>
                {isTop && top && (
                  <span className="cb-stack-pin" aria-hidden="true">
                    <span className="cb-stack-pin-dot" />
                    <span className="cb-stack-pin-label">{attentionLabel}</span>
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {block.caption && (
        <figcaption className="cb-stack-diagram-caption">{block.caption}</figcaption>
      )}
    </figure>
  );
}

function RoomDiagram({
  block,
}: {
  block: Extract<SectionBlock, { kind: "roomDiagram" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <figure ref={ref} className={`cb-room${revealClass(inView)}`}>
      <div className="cb-room-stage">
        <div className="cb-room-center" aria-hidden="true">
          <span className="cb-room-pulse cb-room-pulse-1" />
          <span className="cb-room-pulse cb-room-pulse-2" />
          <span className="cb-room-center-label">{block.center}</span>
        </div>
        <ul className="cb-room-chips" role="list">
          {block.chips.map((chip, i) => (
            <li
              key={i}
              className="cb-room-chip"
              style={{ ["--i" as string]: String(i) }}
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
      {block.caption && (
        <figcaption className="cb-room-caption">{block.caption}</figcaption>
      )}
    </figure>
  );
}

function MirrorDiagram({
  block,
}: {
  block: Extract<SectionBlock, { kind: "mirror" }>;
}) {
  const self = block.self ?? "You";
  const center = block.center ?? "Model";
  const forwardLabel = block.forwardLabel ?? "thought";
  const returnLabel = block.returnLabel ?? "reflection";

  const [ref, inView] = useInView<HTMLElement>();

  /*
   * One shared coordinate system. viewBox 800×260, aspect-ratio applied
   * to the wrapping figure so SVG scales uniformly without distortion.
   */
  return (
    <figure ref={ref} className={`cb-mirror${revealClass(inView)}`}>
      <svg
        className="cb-mirror-svg"
        viewBox="0 0 800 260"
        role="img"
        aria-label="Diagram showing thought going from you to the model and reflection coming back"
      >
        <defs>
          <marker
            id="cb-mirror-arrow-fwd"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
          <marker
            id="cb-mirror-arrow-back"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>

        <text
          x="400"
          y="36"
          className="cb-mirror-arc-label cb-mirror-arc-label-fwd"
          textAnchor="middle"
        >
          {forwardLabel}
        </text>
        <path
          className="cb-mirror-arc cb-mirror-arc-fwd"
          d="M 200 110 Q 400 30 600 110"
          markerEnd="url(#cb-mirror-arrow-fwd)"
        />

        <path
          className="cb-mirror-arc cb-mirror-arc-back"
          d="M 600 150 Q 400 230 200 150"
          markerEnd="url(#cb-mirror-arrow-back)"
        />
        <text
          x="400"
          y="248"
          className="cb-mirror-arc-label cb-mirror-arc-label-back"
          textAnchor="middle"
        >
          {returnLabel}
        </text>

        <g className="cb-mirror-node cb-mirror-node-self">
          <rect
            className="cb-mirror-node-rect"
            x="60"
            y="98"
            width="180"
            height="64"
            rx="18"
          />
          <text x="150" y="130" textAnchor="middle">
            {self}
          </text>
        </g>

        <g className="cb-mirror-node cb-mirror-node-center">
          <rect
            className="cb-mirror-node-halo"
            x="548"
            y="86"
            width="204"
            height="88"
            rx="26"
          />
          <rect
            className="cb-mirror-node-rect"
            x="560"
            y="98"
            width="180"
            height="64"
            rx="18"
          />
          <text x="650" y="130" textAnchor="middle">
            {center}
          </text>
        </g>
      </svg>

      {block.caption && (
        <figcaption className="cb-mirror-caption">{block.caption}</figcaption>
      )}
    </figure>
  );
}

function SlopeChart({
  block,
}: {
  block: Extract<SectionBlock, { kind: "slope" }>;
}) {
  const w = 720;
  const h = 320;
  const padL = 88;
  const padR = 56;
  const padT = 32;
  const padB = 96;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  const xAt = (i: number) =>
    padL + (block.modes.length === 1 ? plotW / 2 : (i * plotW) / (block.modes.length - 1));
  const yAt = (v: number) => padT + (1 - v) * plotH;

  const buildPath = (key: "context" | "dependencies") => {
    const points = block.modes.map((m, i) => [xAt(i), yAt(m[key])] as const);
    if (points.length === 0) return "";
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const [x0, y0] = points[i - 1];
      const [x1, y1] = points[i];
      const cx = (x0 + x1) / 2;
      d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
    }
    return d;
  };

  const gridY = [0, 0.25, 0.5, 0.75, 1];

  return (
    <figure className="cb-slope">
      <svg
        className="cb-slope-svg"
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label="Line chart showing context and dependencies rising from mode one to mode three"
      >
        <g className="cb-slope-grid">
          {gridY.map((g) => (
            <line
              key={g}
              x1={padL}
              x2={w - padR}
              y1={yAt(g)}
              y2={yAt(g)}
            />
          ))}
        </g>

        <g className="cb-slope-axes">
          <line x1={padL} x2={padL} y1={padT} y2={h - padB} />
          <line x1={padL} x2={w - padR} y1={h - padB} y2={h - padB} />
        </g>

        <text
          className="cb-slope-axis-label"
          x={padL - 16}
          y={padT + plotH / 2}
          transform={`rotate(-90 ${padL - 16} ${padT + plotH / 2})`}
          textAnchor="middle"
        >
          More context, more dependencies
        </text>

        <path className="cb-slope-line cb-slope-line-context" d={buildPath("context")} />
        <path
          className="cb-slope-line cb-slope-line-deps"
          d={buildPath("dependencies")}
        />

        {block.modes.map((m, i) => (
          <g key={`pts-${i}`}>
            <circle
              className="cb-slope-dot cb-slope-dot-context"
              cx={xAt(i)}
              cy={yAt(m.context)}
              r={6}
            />
            <circle
              className="cb-slope-dot cb-slope-dot-deps"
              cx={xAt(i)}
              cy={yAt(m.dependencies)}
              r={6}
            />
          </g>
        ))}

        {block.modes.map((m, i) => (
          <g key={`label-${i}`}>
            <line
              className="cb-slope-tick"
              x1={xAt(i)}
              x2={xAt(i)}
              y1={h - padB}
              y2={h - padB + 8}
            />
            <text
              className="cb-slope-mode-label"
              x={xAt(i)}
              y={h - padB + 28}
              textAnchor="middle"
            >
              {m.label}
            </text>
            <text
              className="cb-slope-mode-title"
              x={xAt(i)}
              y={h - padB + 50}
              textAnchor="middle"
            >
              {m.title}
            </text>
          </g>
        ))}
      </svg>

      <div className="cb-slope-legend">
        <span className="cb-slope-key cb-slope-key-context">
          <span className="cb-slope-swatch" aria-hidden="true" /> Context
        </span>
        <span className="cb-slope-key cb-slope-key-deps">
          <span className="cb-slope-swatch" aria-hidden="true" /> Dependencies
        </span>
      </div>

      {block.caption && (
        <figcaption className="cb-slope-caption">{block.caption}</figcaption>
      )}
    </figure>
  );
}

function LoopOrbit({
  block,
}: {
  block: Extract<SectionBlock, { kind: "loopOrbit" }>;
}) {
  const center = block.center ?? "The design";
  const stations = block.stations.slice(0, 4);
  const [ref, inView] = useInView<HTMLElement>();

  /*
   * Coordinate system: viewBox 800×560, center at (400, 280), orbit r=220.
   * Stations sit at the four cardinal points; arcs span 30° between cards
   * so the trace passes through the diagonal whitespace, never overlapping.
   */
  const cx = 400;
  const cy = 280;
  const r = 220;
  const positions = [
    { x: cx, y: cy - r },
    { x: cx + r, y: cy },
    { x: cx, y: cy + r },
    { x: cx - r, y: cy },
  ];
  const cardW = 200;
  const cardH = 88;

  const polar = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy - r * Math.sin(rad),
    };
  };

  const arcSegments: { d: string }[] = [
    { from: 60, to: 30 },
    { from: -30, to: -60 },
    { from: -120, to: -150 },
    { from: 150, to: 120 },
  ].map(({ from, to }) => {
    const a = polar(from);
    const b = polar(to);
    return {
      d: `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${r} ${r} 0 0 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`,
    };
  });

  return (
    <figure ref={ref} className={`cb-orbit${revealClass(inView)}`}>
      <svg
        className="cb-orbit-svg"
        viewBox="0 0 800 560"
        role="img"
        aria-label="The four moments arranged as a continuous loop around the design at the center"
      >
        <defs>
          <marker
            id="cb-orbit-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="9"
            markerHeight="9"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>

        <circle
          cx={cx}
          cy={cy}
          r={r}
          className="cb-orbit-ring"
        />

        {arcSegments.map((a, i) => (
          <path
            key={i}
            d={a.d}
            className="cb-orbit-arc"
            markerEnd="url(#cb-orbit-arrow)"
            style={{ ["--i" as string]: String(i) }}
          />
        ))}

        <g className="cb-orbit-center">
          <circle cx={cx} cy={cy} r="78" className="cb-orbit-center-halo" />
          <circle cx={cx} cy={cy} r="58" className="cb-orbit-center-disc" />
          <text
            x={cx}
            y={cy + 5}
            textAnchor="middle"
            className="cb-orbit-center-label"
          >
            {center}
          </text>
        </g>

        {stations.map((s, i) => {
          const p = positions[i];
          const left = p.x - cardW / 2;
          const top = p.y - cardH / 2;
          return (
            <g
              key={i}
              className="cb-orbit-station"
              style={{ ["--i" as string]: String(i) }}
            >
              <rect
                x={left}
                y={top}
                width={cardW}
                height={cardH}
                rx="18"
                className="cb-orbit-card"
              />
              {s.number && (
                <g>
                  <circle
                    cx={left + 22}
                    cy={top + 22}
                    r="14"
                    className="cb-orbit-number-bg"
                  />
                  <text
                    x={left + 22}
                    y={top + 26}
                    textAnchor="middle"
                    className="cb-orbit-number"
                  >
                    {s.number}
                  </text>
                </g>
              )}
              <text
                x={p.x}
                y={p.y - 2}
                textAnchor="middle"
                className="cb-orbit-label"
              >
                {s.label}
              </text>
              {s.meta && (
                <text
                  x={p.x}
                  y={p.y + 22}
                  textAnchor="middle"
                  className="cb-orbit-meta"
                >
                  {s.meta}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {block.caption && (
        <figcaption className="cb-orbit-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function LensCompare({
  block,
}: {
  block: Extract<SectionBlock, { kind: "lensCompare" }>;
}) {
  const center = block.center ?? "The design";
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <figure ref={ref} className={`cb-lens${revealClass(inView)}`}>
      <div className="cb-lens-stage">
        <div className="cb-lens-panel cb-lens-panel-left">
          <div className="cb-lens-panel-head">
            <span className="cb-lens-panel-label">{block.left.label}</span>
            {block.left.subtitle && (
              <span className="cb-lens-panel-subtitle">
                {block.left.subtitle}
              </span>
            )}
          </div>
          <ul className="cb-lens-chips">
            {block.left.reveals.map((r, i) => (
              <li
                key={i}
                className="cb-lens-chip"
                style={{ ["--i" as string]: String(i) }}
              >
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="cb-lens-axis" aria-hidden="true">
          <span className="cb-lens-beam cb-lens-beam-left" />
          <span className="cb-lens-beam cb-lens-beam-right" />
          <span className="cb-lens-center">
            <span className="cb-lens-center-pulse cb-lens-center-pulse-1" />
            <span className="cb-lens-center-pulse cb-lens-center-pulse-2" />
            <span className="cb-lens-center-disc" />
            <span className="cb-lens-center-label">{center}</span>
          </span>
        </div>

        <div className="cb-lens-panel cb-lens-panel-right">
          <div className="cb-lens-panel-head">
            <span className="cb-lens-panel-label">{block.right.label}</span>
            {block.right.subtitle && (
              <span className="cb-lens-panel-subtitle">
                {block.right.subtitle}
              </span>
            )}
          </div>
          <ul className="cb-lens-chips">
            {block.right.reveals.map((r, i) => (
              <li
                key={i}
                className="cb-lens-chip"
                style={{ ["--i" as string]: String(i) }}
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {block.caption && (
        <figcaption className="cb-lens-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

const AUDIENCE_META: Record<
  "keyboard" | "screenReader" | "lowVision" | "colorBlind" | "vestibular" | "cognitive",
  { label: string; glyph: string }
> = {
  keyboard: { label: "Keyboard", glyph: "⌨" },
  screenReader: { label: "Screen reader", glyph: "◌" },
  lowVision: { label: "Low vision", glyph: "◐" },
  colorBlind: { label: "Color blind", glyph: "◑" },
  vestibular: { label: "Vestibular", glyph: "≋" },
  cognitive: { label: "Cognitive", glyph: "❋" },
};

function BlindSpot({
  block,
}: {
  block: Extract<SectionBlock, { kind: "blindSpot" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <figure ref={ref} className={`cb-blind${revealClass(inView)}`}>
      <div className="cb-blind-stage" aria-hidden={false}>
        <div className="cb-blind-scan" aria-hidden="true" />

        <div className="cb-blind-col cb-blind-col-visible">
          <div className="cb-blind-col-head">
            <span className="cb-blind-col-eye" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M2 12c2.5-4.5 6-7 10-7s7.5 2.5 10 7c-2.5 4.5-6 7-10 7s-7.5-2.5-10-7Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </span>
            <div>
              <span className="cb-blind-col-label">{block.visible.label}</span>
              {block.visible.subtitle && (
                <span className="cb-blind-col-subtitle">
                  {block.visible.subtitle}
                </span>
              )}
            </div>
          </div>
          <ul className="cb-blind-list cb-blind-list-visible">
            {block.visible.items.map((item, i) => (
              <li
                key={i}
                className="cb-blind-row cb-blind-row-visible"
                style={{ ["--i" as string]: String(i) }}
              >
                <span className="cb-blind-bar" aria-hidden="true" />
                <span className="cb-blind-row-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="cb-blind-col cb-blind-col-invisible">
          <div className="cb-blind-col-head">
            <span className="cb-blind-col-eye cb-blind-col-eye-closed" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M2 14c2.5 3 6 5 10 5s7.5-2 10-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M5 16l-1 2M19 16l1 2M12 19v2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div>
              <span className="cb-blind-col-label">{block.invisible.label}</span>
              {block.invisible.subtitle && (
                <span className="cb-blind-col-subtitle">
                  {block.invisible.subtitle}
                </span>
              )}
            </div>
          </div>
          <ul className="cb-blind-list cb-blind-list-invisible">
            {block.invisible.items.map((item, i) => {
              const meta = AUDIENCE_META[item.audience];
              return (
                <li
                  key={i}
                  className="cb-blind-row cb-blind-row-invisible"
                  style={{ ["--i" as string]: String(i) }}
                >
                  <span className="cb-blind-row-text">{item.text}</span>
                  <span
                    className={`cb-blind-aud cb-blind-aud-${item.audience}`}
                    title={`Affects: ${meta.label} users`}
                  >
                    <span className="cb-blind-aud-glyph" aria-hidden="true">
                      {meta.glyph}
                    </span>
                    {meta.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {block.caption && (
        <figcaption className="cb-blind-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function SignDiagram({
  kind,
}: {
  kind: "collapse" | "lag" | "break" | "dwarf";
}) {
  switch (kind) {
    case "collapse":
      return (
        <svg
          className="cb-sign-svg cb-sign-collapse"
          viewBox="0 0 120 72"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="cb-collapse-grad"
              x1="0"
              x2="1"
              y1="0"
              y2="0"
            >
              <stop offset="0%" stopColor="var(--accent)" />
              <stop
                offset="100%"
                stopColor="var(--accent)"
                stopOpacity="0.55"
              />
            </linearGradient>
            <clipPath id="cb-collapse-clip">
              <rect x="8" y="8" width="104" height="56" rx="10" />
            </clipPath>
          </defs>
          <rect
            className="cb-sign-frame"
            x="8"
            y="8"
            width="104"
            height="56"
            rx="10"
          />
          <g clipPath="url(#cb-collapse-clip)">
            <rect
              className="cb-collapse-title"
              x="16"
              y="20"
              width="42"
              height="1.6"
              rx="0.8"
            />
            <rect
              className="cb-collapse-row cb-collapse-row-a"
              x="16"
              y="34"
              width="58"
              height="1.2"
              rx="0.6"
            />
            <rect
              className="cb-collapse-row cb-collapse-row-b"
              x="16"
              y="40.6"
              width="58"
              height="3"
              rx="1.5"
            />
            <rect
              className="cb-collapse-row cb-collapse-row-c"
              x="16"
              y="49"
              width="58"
              height="1.2"
              rx="0.6"
            />
          </g>
        </svg>
      );

    case "lag":
      return (
        <svg
          className="cb-sign-svg cb-sign-lag"
          viewBox="0 0 120 72"
          aria-hidden="true"
        >
          <defs>
            <filter
              id="cb-lag-trail"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>
          <line
            className="cb-lag-track"
            x1="22"
            y1="36"
            x2="98"
            y2="36"
          />
          <rect
            className="cb-lag-source"
            x="14"
            y="28"
            width="16"
            height="16"
            rx="4"
          />
          <rect
            className="cb-lag-target"
            x="90"
            y="28"
            width="16"
            height="16"
            rx="4"
          />
          <g className="cb-lag-ghost-group">
            <circle className="cb-lag-ghost" cx="22" cy="36" r="1.6" />
          </g>
          <g className="cb-lag-actual-group">
            <circle
              className="cb-lag-actual-glow"
              cx="22"
              cy="36"
              r="6"
              filter="url(#cb-lag-trail)"
            />
            <circle className="cb-lag-actual" cx="22" cy="36" r="3.4" />
          </g>
        </svg>
      );

    case "break":
      return (
        <svg
          className="cb-sign-svg cb-sign-break"
          viewBox="0 0 120 72"
          aria-hidden="true"
        >
          <line
            className="cb-break-line cb-break-line-1"
            x1="28"
            y1="36"
            x2="50"
            y2="36"
          />
          <rect
            className="cb-break-node cb-break-node-1"
            x="8"
            y="24"
            width="20"
            height="24"
            rx="6"
          />
          <rect
            className="cb-break-node cb-break-node-2"
            x="50"
            y="24"
            width="20"
            height="24"
            rx="6"
          />
          <g className="cb-break-tail">
            <line
              className="cb-break-line cb-break-line-2"
              x1="70"
              y1="36"
              x2="92"
              y2="36"
            />
            <rect
              className="cb-break-node cb-break-node-3"
              x="92"
              y="24"
              width="20"
              height="24"
              rx="6"
            />
          </g>
        </svg>
      );

    case "dwarf":
      return (
        <svg
          className="cb-sign-svg cb-sign-dwarf"
          viewBox="0 0 120 72"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="cb-dwarf-clip">
              <rect x="8" y="8" width="104" height="56" rx="10" />
            </clipPath>
          </defs>
          <rect
            className="cb-sign-frame"
            x="8"
            y="8"
            width="104"
            height="56"
            rx="10"
          />
          <g clipPath="url(#cb-dwarf-clip)">
            <rect
              className="cb-dwarf-title"
              x="16"
              y="18"
              width="32"
              height="1.4"
              rx="0.7"
            />
            <g className="cb-dwarf-content-group">
              <rect
                className="cb-dwarf-content cb-dwarf-content-1"
                x="16"
                y="29"
                width="86"
                height="2.4"
                rx="1.2"
              />
              <rect
                className="cb-dwarf-content cb-dwarf-content-2"
                x="16"
                y="35"
                width="86"
                height="2.4"
                rx="1.2"
              />
              <rect
                className="cb-dwarf-content cb-dwarf-content-3"
                x="16"
                y="41"
                width="72"
                height="2.4"
                rx="1.2"
              />
            </g>
          </g>
        </svg>
      );
  }
}

function SignGrid({
  block,
}: {
  block: Extract<SectionBlock, { kind: "signGrid" }>;
}) {
  const [ref, inView] = useInView<HTMLUListElement>();
  return (
    <ul ref={ref} className={`cb-signs${revealClass(inView)}`}>
      {block.items.map((item, i) => (
        <li
          key={i}
          className={`cb-sign cb-sign-${item.diagram}`}
          style={{ ["--i" as string]: String(i) }}
        >
          <div className="cb-sign-diagram">
            <SignDiagram kind={item.diagram} />
          </div>
          <span className="cb-sign-eyebrow">{item.eyebrow}</span>
          <h3 className="cb-sign-title-text">{item.title}</h3>
          <p className="cb-sign-text">
            <RichText text={item.text} />
          </p>
        </li>
      ))}
    </ul>
  );
}

function DriftMeter({
  block,
}: {
  block: Extract<SectionBlock, { kind: "driftMeter" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const total = block.zones.reduce((sum, z) => sum + z.weight, 0) || 1;

  return (
    <figure ref={ref} className={`cb-drift${revealClass(inView)}`}>
      <div
        className="cb-drift-track"
        role="img"
        aria-label={`Drift breakdown: ${block.zones
          .map(
            (z) =>
              `${z.title} ${Math.round((z.weight / total) * 100)} percent`,
          )
          .join(", ")}.`}
      >
        {block.zones.map((zone, i) => {
          const pct = (zone.weight / total) * 100;
          return (
            <span
              key={i}
              className={`cb-drift-segment cb-drift-segment-${zone.tone}`}
              style={{
                ["--target" as string]: `${pct}%`,
                ["--i" as string]: String(i),
              }}
            >
              {zone.hint && (
                <span className="cb-drift-segment-hint">{zone.hint}</span>
              )}
              <span className="cb-drift-segment-pct">
                {Math.round(pct)}
                <span className="cb-drift-segment-pct-unit">%</span>
              </span>
            </span>
          );
        })}
      </div>

      <div className="cb-drift-cards">
        {block.zones.map((zone, i) => (
          <article
            key={i}
            className={`cb-drift-card cb-drift-card-${zone.tone}`}
            style={{ ["--i" as string]: String(i) }}
          >
            <span className="cb-drift-card-marker" aria-hidden="true" />
            <span className="cb-drift-card-eyebrow">{zone.eyebrow}</span>
            <h3 className="cb-drift-card-title">{zone.title}</h3>
            <p className="cb-drift-card-text">
              <RichText text={zone.text} />
            </p>
          </article>
        ))}
      </div>

      {block.caption && (
        <figcaption className="cb-drift-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function TypeStack({
  block,
}: {
  block: Extract<SectionBlock, { kind: "typeStack" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <figure ref={ref} className={`cb-typestack${revealClass(inView)}`}>
      <div className="cb-typestack-grid">
        {block.ramps.map((ramp, i) => (
          <div
            key={i}
            className={`cb-typestack-col ${
              i === 0 ? "cb-typestack-col-muted" : "cb-typestack-col-active"
            }`}
            style={{ ["--i" as string]: String(i) }}
          >
            <header className="cb-typestack-header">
              <span className="cb-typestack-eyebrow">{ramp.label}</span>
              {ramp.range && (
                <span className="cb-typestack-range">{ramp.range}</span>
              )}
              {ramp.note && (
                <span className="cb-typestack-note">{ramp.note}</span>
              )}
            </header>
            <ul className="cb-typestack-tiers">
              {ramp.tiers.map((tier, j) => (
                <li key={j} className="cb-typestack-tier">
                  <span className="cb-typestack-meta">
                    <span className="cb-typestack-tag">{tier.tag}</span>
                    <span className="cb-typestack-size">
                      {tier.size}
                      <span className="cb-typestack-size-unit">px</span>
                    </span>
                    {tier.token && (
                      <span className="cb-typestack-token">{tier.token}</span>
                    )}
                  </span>
                  <span
                    className="cb-typestack-sample"
                    style={{
                      fontSize: `${tier.size}px`,
                      fontWeight: tier.weight ?? 500,
                      lineHeight: 1.1,
                    }}
                  >
                    {tier.sample}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {block.caption && (
        <figcaption className="cb-typestack-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function SwatchSet({
  block,
}: {
  block: Extract<SectionBlock, { kind: "swatchSet" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <figure ref={ref} className={`cb-swatch${revealClass(inView)}`}>
      <div className="cb-swatch-grid">
        {block.groups.map((group, i) => (
          <div
            key={i}
            className={`cb-swatch-col ${
              i === 0 ? "cb-swatch-col-muted" : "cb-swatch-col-active"
            }`}
            style={{ ["--i" as string]: String(i) }}
          >
            <header className="cb-swatch-header">
              <span className="cb-swatch-eyebrow">{group.label}</span>
              {group.note && (
                <span className="cb-swatch-note">{group.note}</span>
              )}
            </header>
            <ul className="cb-swatch-list">
              {group.swatches.map((s, j) => (
                <li
                  key={j}
                  className="cb-swatch-row"
                  style={{ ["--j" as string]: String(j) }}
                >
                  <span
                    className="cb-swatch-chip"
                    style={{ background: s.hex }}
                    aria-hidden="true"
                  />
                  <span className="cb-swatch-meta">
                    <span className="cb-swatch-role">{s.role}</span>
                    <span className="cb-swatch-usage">{s.usage}</span>
                    {s.token && (
                      <span className="cb-swatch-token">{s.token}</span>
                    )}
                  </span>
                  <span className="cb-swatch-hex">{s.hex}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {block.caption && (
        <figcaption className="cb-swatch-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function ThemeTokens({
  block,
}: {
  block: Extract<SectionBlock, { kind: "themeTokens" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <figure ref={ref} className={`cb-theme${revealClass(inView)}`}>
      <div className="cb-theme-legend" aria-hidden="true">
        <span className="cb-theme-legend-item">
          <span className="cb-theme-legend-dot cb-theme-legend-dot-light" />
          Light
        </span>
        <span className="cb-theme-legend-item">
          <span className="cb-theme-legend-dot cb-theme-legend-dot-dark" />
          Dark
        </span>
      </div>
      <ul className="cb-theme-grid">
        {block.tokens.map((t, i) => (
          <li
            key={i}
            className="cb-theme-card"
            style={{ ["--i" as string]: String(i) }}
          >
            <div
              className="cb-theme-chip"
              aria-hidden="true"
              style={{
                ["--theme-light" as string]: t.light,
                ["--theme-dark" as string]: t.dark,
              }}
            >
              <span className="cb-theme-chip-light" />
              <span className="cb-theme-chip-dark" />
              <span className="cb-theme-chip-divider" />
            </div>
            <div className="cb-theme-body">
              <span className="cb-theme-token">{t.name}</span>
              <span className="cb-theme-role">{t.role}</span>
              <p className="cb-theme-usage">{t.usage}</p>
              <div className="cb-theme-values">
                <span className="cb-theme-value">
                  <span className="cb-theme-value-label">Light</span>
                  <span className="cb-theme-value-hex">{t.light}</span>
                </span>
                <span className="cb-theme-value">
                  <span className="cb-theme-value-label">Dark</span>
                  <span className="cb-theme-value-hex">{t.dark}</span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {block.caption && (
        <figcaption className="cb-theme-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function ThemeLayers({
  block,
}: {
  block: Extract<SectionBlock, { kind: "themeLayers" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const get = (slot: string) => block.layers.find((l) => l.slot === slot);
  const renderScene = (scheme: "light" | "dark") => {
    const pasteboard = get("pasteboard");
    const base = get("base");
    const layer1 = get("layer-1");
    const layer2 = get("layer-2");
    const elevated = get("elevated");
    const sceneStyle = {
      ["--cb-pasteboard" as string]:
        scheme === "light" ? pasteboard?.light : pasteboard?.dark,
      ["--cb-base" as string]: scheme === "light" ? base?.light : base?.dark,
      ["--cb-layer-1" as string]:
        scheme === "light" ? layer1?.light : layer1?.dark,
      ["--cb-layer-2" as string]:
        scheme === "light" ? layer2?.light : layer2?.dark,
      ["--cb-elevated" as string]:
        scheme === "light" ? elevated?.light : elevated?.dark,
    } as React.CSSProperties;
    return (
      <div
        className={`cb-layers-scene cb-layers-scene-${scheme}`}
        style={sceneStyle}
      >
        <span className="cb-layers-scene-label">{scheme}</span>
        <div className="cb-layers-pasteboard">
          <span className="cb-layers-pin cb-layers-pin-pasteboard">
            pasteboard
          </span>
          <div className="cb-layers-base">
            <span className="cb-layers-pin cb-layers-pin-base">base</span>
            <div className="cb-layers-layer-1">
              <span className="cb-layers-pin cb-layers-pin-layer-1">
                layer-1
              </span>
              <div className="cb-layers-cards">
                <div className="cb-layers-layer-2">
                  <span className="cb-layers-pin cb-layers-pin-layer-2">
                    layer-2
                  </span>
                </div>
                <div className="cb-layers-layer-2" aria-hidden="true" />
              </div>
            </div>
            <div className="cb-layers-elevated">
              <span className="cb-layers-pin cb-layers-pin-elevated">
                elevated
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <figure ref={ref} className={`cb-layers${revealClass(inView)}`}>
      <div className="cb-layers-scenes">
        {renderScene("light")}
        {renderScene("dark")}
      </div>
      <ul className="cb-layers-list">
        {block.layers.map((layer, i) => (
          <li
            key={i}
            className="cb-layers-item"
            style={{ ["--i" as string]: String(i) }}
          >
            <div className="cb-layers-item-meta">
              <span className="cb-layers-item-token">{layer.name}</span>
              <span className="cb-layers-item-role">{layer.role}</span>
              {layer.note && (
                <span className="cb-layers-item-note">{layer.note}</span>
              )}
            </div>
            <div className="cb-layers-item-values">
              <span className="cb-layers-item-value">
                <span
                  className="cb-layers-item-chip"
                  style={{ background: layer.light }}
                  aria-hidden="true"
                />
                <span className="cb-layers-item-label">Light</span>
                <span className="cb-layers-item-hex">{layer.light}</span>
              </span>
              <span className="cb-layers-item-value">
                <span
                  className="cb-layers-item-chip"
                  style={{ background: layer.dark }}
                  aria-hidden="true"
                />
                <span className="cb-layers-item-label">Dark</span>
                <span className="cb-layers-item-hex">{layer.dark}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
      {block.caption && (
        <figcaption className="cb-layers-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function ColorRoles({
  block,
}: {
  block: Extract<SectionBlock, { kind: "colorRoles" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <figure ref={ref} className={`cb-roles${revealClass(inView)}`}>
      <div className="cb-roles-grid">
        {block.roles.map((role, i) => (
          <article
            key={i}
            className="cb-roles-card"
            style={{ ["--i" as string]: String(i) }}
          >
            <header className="cb-roles-head">
              <span className="cb-roles-name">{role.name}</span>
              <span className="cb-roles-purpose">{role.purpose}</span>
            </header>
            <div className="cb-roles-tier">
              <div className="cb-roles-tier-label">Strong</div>
              <div className="cb-roles-pair">
                <span
                  className="cb-roles-chip"
                  style={{ background: role.strong.light }}
                >
                  <span className="cb-roles-chip-mode">L</span>
                  <span className="cb-roles-chip-hex">
                    {role.strong.light}
                  </span>
                </span>
                <span
                  className="cb-roles-chip cb-roles-chip-dark"
                  style={{ background: role.strong.dark }}
                >
                  <span className="cb-roles-chip-mode">D</span>
                  <span className="cb-roles-chip-hex">
                    {role.strong.dark}
                  </span>
                </span>
              </div>
              <code className="cb-roles-token">{role.strong.token}</code>
            </div>
            <div className="cb-roles-tier">
              <div className="cb-roles-tier-label">Subtle bg</div>
              <div className="cb-roles-pair">
                <span
                  className="cb-roles-chip"
                  style={{ background: role.subtle.light }}
                >
                  <span className="cb-roles-chip-mode">L</span>
                  <span className="cb-roles-chip-hex">
                    {role.subtle.light}
                  </span>
                </span>
                <span
                  className="cb-roles-chip cb-roles-chip-dark"
                  style={{ background: role.subtle.dark }}
                >
                  <span className="cb-roles-chip-mode">D</span>
                  <span className="cb-roles-chip-hex">
                    {role.subtle.dark}
                  </span>
                </span>
              </div>
              <code className="cb-roles-token">{role.subtle.token}</code>
            </div>
          </article>
        ))}
      </div>
      {block.caption && (
        <figcaption className="cb-roles-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function DriftAudit({
  block,
}: {
  block: Extract<SectionBlock, { kind: "driftAudit" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <figure ref={ref} className={`cb-audit${revealClass(inView)}`}>
      <ol className="cb-audit-list">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="cb-audit-item"
            style={{ ["--i" as string]: String(i) }}
          >
            <header className="cb-audit-head">
              <span className="cb-audit-index">{item.index}</span>
              <span className="cb-audit-title">{item.title}</span>
            </header>
            <div className="cb-audit-diff">
              <pre className="cb-audit-code cb-audit-code-drift">
                <span className="cb-audit-tag">drift</span>
                <code>{item.drift}</code>
              </pre>
              <span className="cb-audit-arrow" aria-hidden="true">
                →
              </span>
              <pre className="cb-audit-code cb-audit-code-fix">
                <span className="cb-audit-tag">fix</span>
                <code>{item.fix}</code>
              </pre>
            </div>
            <p className="cb-audit-note">{item.note}</p>
          </li>
        ))}
      </ol>
      {block.caption && (
        <figcaption className="cb-audit-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function WeightMap({
  block,
}: {
  block: Extract<SectionBlock, { kind: "weightMap" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <figure ref={ref} className={`cb-weightmap${revealClass(inView)}`}>
      <div className="cb-weightmap-grid">
        {block.views.map((view, i) => (
          <div
            key={i}
            className={`cb-weightmap-view ${
              i === 0 ? "cb-weightmap-view-muted" : "cb-weightmap-view-active"
            }`}
            style={{ ["--i" as string]: String(i) }}
          >
            <header className="cb-weightmap-header">
              <span className="cb-weightmap-eyebrow">{view.label}</span>
              {view.note && (
                <span className="cb-weightmap-note">{view.note}</span>
              )}
            </header>
            <div className="cb-weightmap-page" aria-hidden="true">
              <div className="cb-weightmap-row cb-weightmap-row-header">
                <span
                  className={`cb-weightmap-block cb-weightmap-block-header cb-weightmap-tier-${view.tiers.header}`}
                >
                  Header
                </span>
              </div>
              <div className="cb-weightmap-row cb-weightmap-row-hero">
                <span
                  className={`cb-weightmap-block cb-weightmap-block-hero cb-weightmap-tier-${view.tiers.hero}`}
                >
                  Hero
                </span>
              </div>
              <div className="cb-weightmap-row cb-weightmap-row-cards">
                <span
                  className={`cb-weightmap-block cb-weightmap-block-card cb-weightmap-tier-${view.tiers.card1}`}
                >
                  Card
                </span>
                <span
                  className={`cb-weightmap-block cb-weightmap-block-card cb-weightmap-tier-${view.tiers.card2}`}
                >
                  Card
                </span>
                <span
                  className={`cb-weightmap-block cb-weightmap-block-card cb-weightmap-tier-${view.tiers.card3}`}
                >
                  Card
                </span>
              </div>
              <div className="cb-weightmap-row cb-weightmap-row-cta">
                <span
                  className={`cb-weightmap-block cb-weightmap-block-cta cb-weightmap-tier-${view.tiers.cta}`}
                >
                  CTA
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {block.caption && (
        <figcaption className="cb-weightmap-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function SpacingElement({
  type,
}: {
  type: "heading" | "body" | "button" | "card" | "section";
}) {
  switch (type) {
    case "heading":
      return (
        <div className="cb-spacing-el cb-spacing-el-heading" aria-hidden="true">
          <span className="cb-spacing-bar cb-spacing-bar-heading" />
        </div>
      );
    case "body":
      return (
        <div className="cb-spacing-el cb-spacing-el-body" aria-hidden="true">
          <span className="cb-spacing-line" />
          <span className="cb-spacing-line" />
          <span className="cb-spacing-line cb-spacing-line-short" />
        </div>
      );
    case "card":
      return (
        <div className="cb-spacing-el cb-spacing-el-card" aria-hidden="true">
          <span className="cb-spacing-card-title" />
          <span className="cb-spacing-card-line" />
          <span className="cb-spacing-card-line cb-spacing-card-line-short" />
        </div>
      );
    case "button":
      return (
        <div className="cb-spacing-el cb-spacing-el-button" aria-hidden="true">
          <span className="cb-spacing-pill" />
        </div>
      );
    case "section":
      return (
        <div className="cb-spacing-el cb-spacing-el-section" aria-hidden="true">
          <span className="cb-spacing-divider" />
        </div>
      );
  }
}

function SpacingRhythm({
  block,
}: {
  block: Extract<SectionBlock, { kind: "spacingRhythm" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <figure ref={ref} className={`cb-spacing${revealClass(inView)}`}>
      <div className="cb-spacing-grid">
        {block.layouts.map((layout, i) => (
          <div
            key={i}
            className={`cb-spacing-col ${
              i === 0 ? "cb-spacing-col-muted" : "cb-spacing-col-active"
            }`}
            style={{ ["--i" as string]: String(i) }}
          >
            <header className="cb-spacing-header">
              <span className="cb-spacing-eyebrow">{layout.label}</span>
              {layout.note && (
                <span className="cb-spacing-note">{layout.note}</span>
              )}
            </header>
            <div className="cb-spacing-stack">
              {layout.elements.map((el, j) => {
                const isLast = j === layout.elements.length - 1;
                const gap = layout.gaps[j];
                const token = layout.tokens?.[j];
                return (
                  <Fragment key={j}>
                    <SpacingElement type={el.type} />
                    {!isLast && gap !== undefined && (
                      <div
                        className="cb-spacing-gap"
                        style={{ ["--gap" as string]: `${gap}px` }}
                        aria-label={
                          token
                            ? `${gap} pixel gap, token ${token}`
                            : `${gap} pixel gap`
                        }
                      >
                        <span className="cb-spacing-gap-tick">
                          {gap}
                          <span className="cb-spacing-gap-unit">px</span>
                        </span>
                        {token && (
                          <span className="cb-spacing-gap-token">{token}</span>
                        )}
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {block.caption && (
        <figcaption className="cb-spacing-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function MotionTrace({
  block,
}: {
  block: Extract<SectionBlock, { kind: "motionTrace" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <figure ref={ref} className={`cb-motion${revealClass(inView)}`}>
      <div className="cb-motion-grid">
        {block.tracks.map((track, i) => (
          <div
            key={i}
            className={`cb-motion-col ${
              i === 0 ? "cb-motion-col-muted" : "cb-motion-col-active"
            }`}
            style={{ ["--i" as string]: String(i) }}
          >
            <header className="cb-motion-header">
              <span className="cb-motion-eyebrow">{track.label}</span>
              <span className="cb-motion-timing">{track.timing}</span>
              {track.note && (
                <span className="cb-motion-note">{track.note}</span>
              )}
            </header>
            <div className={`cb-motion-track cb-motion-track-${track.pattern}`}>
              <span className="cb-motion-rail" aria-hidden="true" />
              <span className="cb-motion-trail" aria-hidden="true" />
              <span className="cb-motion-puck" aria-hidden="true" />
            </div>
            <div className="cb-motion-stops" aria-hidden="true">
              <span className="cb-motion-stop">Start</span>
              <span className="cb-motion-stop">End</span>
            </div>
          </div>
        ))}
      </div>
      {block.caption && (
        <figcaption className="cb-motion-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

export default SectionBlocks;
