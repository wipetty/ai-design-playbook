import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

export function RichText({
  text,
  disableLinks = false,
}: {
  text: string;
  disableLinks?: boolean;
}) {
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
        if (disableLinks) return <span key={i}>{part.label}</span>;
        const isExternal = /^https?:\/\//.test(part.href);
        const isInternal = part.href.startsWith("/");
        if (isInternal) {
          return (
            <Link
              key={i}
              className="cb-link"
              to={part.href}
              viewTransition
            >
              {part.label}
            </Link>
          );
        }
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
      const variantClass = block.variant ? ` cb-cards-${block.variant}` : "";
      return (
        <div
          className={`cb-cards cb-cards-${columns}${variantClass}`}
          role="list"
        >
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
                {item.logo ? (
                  <span className="cb-card-icon cb-card-logo" aria-hidden="true">
                    <img src={item.logo.src} alt={item.logo.alt} loading="lazy" />
                  </span>
                ) : item.icon ? (
                  <span className="cb-card-icon" aria-hidden="true">
                    <Icon name={item.icon} size={22} />
                  </span>
                ) : null}
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

    case "podOrbit":
      return <PodOrbit block={block} />;

    case "queueRelay":
      return <QueueRelay block={block} />;

    case "invisibleStack":
      return <InvisibleStack block={block} />;

    case "partnerTriage":
      return <PartnerTriage block={block} />;

    case "flipDeck":
      return <FlipDeck block={block} />;

    case "dragSpectrum":
      return <DragSpectrum block={block} />;

    case "tapTrace":
      return <TapTrace block={block} />;

    case "decisionTree":
      return <DecisionTree block={block} />;

    case "promptScope":
      return <PromptScope block={block} />;

    case "podRhythm":
      return <PodRhythm block={block} />;

    case "severitySort":
      return <SeveritySort block={block} />;
  }
}

function Flow({
  block,
}: {
  block: Extract<SectionBlock, { kind: "flow" }>;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const hasImages = block.steps.some((s) => !!s.image);
  return (
    <div
      ref={ref}
      className={`cb-flow${hasImages ? " cb-flow-illustrated" : ""}${revealClass(inView)}`}
      aria-label={block.label}
    >
      {block.label && <span className="cb-flow-label">{block.label}</span>}
      <ol className="cb-flow-track">
        {block.steps.map((step, i) => (
          <li key={i} className="cb-flow-step">
            {step.image && (
              <span className="cb-flow-image" aria-hidden="true">
                <img src={step.image.src} alt={step.image.alt} loading="lazy" />
              </span>
            )}
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
  const attentionLabel = block.attentionLabel;
  const showHighlight = !!attentionLabel;

  return (
    <figure className="cb-stack-diagram">
      <ol className="cb-stack-layers" role="list">
        {stages.map((s, i) => {
          const isTop = i === 0;
          return (
            <li
              key={s.number}
              className={`cb-stack-layer${isTop && showHighlight ? " cb-stack-layer-top" : ""}`}
            >
              <div className="cb-stack-layer-row">
                <span className="cb-stack-layer-num">{s.number}</span>
                <div className="cb-stack-layer-body">
                  <p className="cb-stack-layer-name">{s.name}</p>
                  <p className="cb-stack-layer-verb">{s.verb}</p>
                </div>
                {isTop && top && showHighlight && (
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

/*
 * PodOrbit: 8 partner chips arranged in a ring around the core pod.
 * Each chip is draggable (pointer-based, with a visible tether back to
 * its anchor) and click-to-expand for detail. Tether is the visceral
 * point: you can pull a partner away, but they snap back into the orbit.
 */
function PodOrbit({
  block,
}: {
  block: Extract<SectionBlock, { kind: "podOrbit" }>;
}) {
  const partners = block.partners.slice(0, 8);
  const [ref, inView] = useInView<HTMLElement>();
  const stageRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<{
    id: string;
    dx: number;
    dy: number;
  } | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);

  const cx = 280;
  const cy = 240;
  const radius = 180;
  const vbW = 560;
  const vbH = 480;

  const anchors = partners.map((_, i) => {
    const angle = (i / partners.length) * Math.PI * 2 - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return {
      x,
      y,
      leftPct: `${(x / vbW) * 100}%`,
      topPct: `${(y / vbH) * 100}%`,
    };
  });

  function onPointerDown(
    e: React.PointerEvent<HTMLDivElement>,
    id: string,
  ) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerStart.current = { x: e.clientX, y: e.clientY };
    suppressClick.current = false;
    setDrag({ id, dx: 0, dy: 0 });
    try {
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    } catch {
      // some environments don't support pointer capture; safe to ignore
    }
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag || !pointerStart.current) return;
    const dx = e.clientX - pointerStart.current.x;
    const dy = e.clientY - pointerStart.current.y;
    if (Math.hypot(dx, dy) > 4) suppressClick.current = true;
    setDrag({ id: drag.id, dx, dy });
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag) return;
    try {
      if ((e.currentTarget as Element).hasPointerCapture(e.pointerId)) {
        (e.currentTarget as Element).releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
    setDrag(null);
    pointerStart.current = null;
  }

  function onClickChip(id: string) {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    setExpanded((cur) => (cur === id ? null : id));
  }

  const expandedPartner = partners.find((p) => p.id === expanded);

  return (
    <figure ref={ref} className={`cb-pod${revealClass(inView)}`}>
      <div className="cb-pod-stage" ref={stageRef}>
        <svg
          className="cb-pod-svg"
          viewBox="0 0 560 480"
          aria-hidden="true"
        >
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            className="cb-pod-ring"
          />
          {partners.map((p, i) => {
            const a = anchors[i];
            const isDragged = drag?.id === p.id;
            const stageW = stageRef.current?.clientWidth || vbW;
            const scale = vbW / stageW;
            const tx = isDragged ? drag.dx * scale : 0;
            const ty = isDragged ? drag.dy * scale : 0;
            const stretch = isDragged ? Math.hypot(drag.dx, drag.dy) : 0;
            const opacity = Math.min(1, 0.35 + stretch / 240);
            return (
              <line
                key={p.id}
                x1={cx}
                y1={cy}
                x2={a.x + tx}
                y2={a.y + ty}
                className={`cb-pod-tether${isDragged ? " is-dragged" : ""}`}
                style={{ opacity }}
              />
            );
          })}
        </svg>

        <div
          className="cb-pod-core"
          style={{
            left: `${(cx / vbW) * 100}%`,
            top: `${(cy / vbH) * 100}%`,
          }}
        >
          <span className="cb-pod-core-pulse" aria-hidden="true" />
          <span className="cb-pod-core-disc">
            <span className="cb-pod-core-label">{block.center.label}</span>
            {block.center.sublabel && (
              <span className="cb-pod-core-sub">{block.center.sublabel}</span>
            )}
            <span className="cb-pod-core-dots" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </span>
          </span>
        </div>

        {partners.map((p, i) => {
          const a = anchors[i];
          const isDragged = drag?.id === p.id;
          const tx = isDragged ? drag.dx : 0;
          const ty = isDragged ? drag.dy : 0;
          const isExpanded = expanded === p.id;
          return (
            <div
              key={p.id}
              className={`cb-pod-chip${isDragged ? " is-dragged" : ""}${
                isExpanded ? " is-expanded" : ""
              }`}
              style={{
                left: a.leftPct,
                top: a.topPct,
                transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px)`,
                ["--i" as string]: String(i),
              }}
              onPointerDown={(e) => onPointerDown(e, p.id)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onClick={() => onClickChip(p.id)}
              role="button"
              tabIndex={0}
              aria-pressed={isExpanded}
              aria-label={`${p.label} — drag to test the tether, click to read more`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpanded((cur) => (cur === p.id ? null : p.id));
                }
              }}
            >
              <span className="cb-pod-chip-glyph" aria-hidden="true">
                {p.glyph}
              </span>
              <span className="cb-pod-chip-label">{p.label}</span>
            </div>
          );
        })}
      </div>

      <div className="cb-pod-detail" aria-live="polite">
        {expandedPartner ? (
          <div className="cb-pod-detail-card">
            <div className="cb-pod-detail-head">
              <span className="cb-pod-detail-glyph" aria-hidden="true">
                {expandedPartner.glyph}
              </span>
              <h3 className="cb-pod-detail-title">{expandedPartner.label}</h3>
              <button
                type="button"
                className="cb-pod-detail-close"
                onClick={() => setExpanded(null)}
                aria-label="Close detail"
              >
                ×
              </button>
            </div>
            <dl className="cb-pod-detail-grid">
              <div>
                <dt>Owns</dt>
                <dd>{expandedPartner.owns}</dd>
              </div>
              <div>
                <dt>Needs from the pod</dt>
                <dd>{expandedPartner.needs}</dd>
              </div>
              <div>
                <dt>Without them</dt>
                <dd>{expandedPartner.without}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <p className="cb-pod-hint">
            {block.hint ??
              "Drag any partner to feel the tether stretch. Click to read what they own."}
          </p>
        )}
      </div>

      {block.caption && (
        <figcaption className="cb-pod-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

/*
 * QueueRelay: side-by-side animated comparison.
 * Left lane: tickets queue at intake, drip slowly through five gates.
 * Right lane: ticket goes pod → named contact → back, single hop.
 * "Send a request" button drops a synchronized ticket into both lanes
 * so the timing difference is felt, not just labeled.
 */
function QueueRelay({
  block,
}: {
  block: Extract<SectionBlock, { kind: "queueRelay" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const [pulses, setPulses] = useState<number[]>([]);
  const counter = useRef(0);

  function fire() {
    const id = ++counter.current;
    setPulses((p) => [...p, id]);
    window.setTimeout(() => {
      setPulses((p) => p.filter((x) => x !== id));
    }, 6200);
  }

  return (
    <figure ref={ref} className={`cb-relay${revealClass(inView)}`}>
      <div className="cb-relay-controls">
        <button type="button" className="cb-relay-fire" onClick={fire}>
          <span aria-hidden="true">▷</span> Send a request
        </button>
        <span className="cb-relay-counter">
          {counter.current} sent
        </span>
      </div>

      <div className="cb-relay-stage">
        <div className="cb-relay-lane cb-relay-lane-queue">
          <header className="cb-relay-head">
            <span className="cb-relay-tag">Queue</span>
            <h3 className="cb-relay-label">{block.queue.label}</h3>
            {block.queue.subtitle && (
              <p className="cb-relay-sub">{block.queue.subtitle}</p>
            )}
          </header>
          <div className="cb-relay-track cb-relay-track-queue">
            <span className="cb-relay-node cb-relay-node-pod">Pod</span>
            <span className="cb-relay-pipe" aria-hidden="true" />
            <span className="cb-relay-gates" aria-hidden="true">
              <span className="cb-relay-gate" />
              <span className="cb-relay-gate" />
              <span className="cb-relay-gate" />
              <span className="cb-relay-gate" />
              <span className="cb-relay-gate" />
            </span>
            <span className="cb-relay-pipe" aria-hidden="true" />
            <span className="cb-relay-node cb-relay-node-target">Function</span>
            {pulses.map((id) => (
              <span
                key={id}
                className="cb-relay-ticket cb-relay-ticket-queue"
                style={{ ["--start" as string]: "0s" }}
              />
            ))}
            <span className="cb-relay-ambient cb-relay-ambient-1" />
            <span className="cb-relay-ambient cb-relay-ambient-2" />
            <span className="cb-relay-ambient cb-relay-ambient-3" />
          </div>
          <ul className="cb-relay-notes">
            {block.queue.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>

        <div className="cb-relay-lane cb-relay-lane-relay">
          <header className="cb-relay-head">
            <span className="cb-relay-tag cb-relay-tag-accent">Relay</span>
            <h3 className="cb-relay-label">{block.relay.label}</h3>
            {block.relay.subtitle && (
              <p className="cb-relay-sub">{block.relay.subtitle}</p>
            )}
          </header>
          <div className="cb-relay-track cb-relay-track-relay">
            <span className="cb-relay-node cb-relay-node-pod">Pod</span>
            <span className="cb-relay-direct" aria-hidden="true" />
            <span className="cb-relay-node cb-relay-node-named">
              Named contact
            </span>
            {pulses.map((id) => (
              <span
                key={id}
                className="cb-relay-ticket cb-relay-ticket-relay"
              />
            ))}
          </div>
          <ul className="cb-relay-notes">
            {block.relay.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      </div>

      {block.caption && (
        <figcaption className="cb-relay-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

/*
 * InvisibleStack: a list of cards. Each card collapsed to a one-line
 * "what's visible on the burndown". Click expands to reveal the
 * invisible work and the failure mode if the function isn't engaged.
 * Several can be open simultaneously.
 */
function InvisibleStack({
  block,
}: {
  block: Extract<SectionBlock, { kind: "invisibleStack" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  function toggle(i: number) {
    setOpen((cur) => {
      const next = new Set(cur);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function expandAll() {
    setOpen(new Set(block.items.map((_, i) => i)));
  }
  function collapseAll() {
    setOpen(new Set());
  }

  const allOpen = open.size === block.items.length;

  return (
    <figure ref={ref} className={`cb-invis${revealClass(inView)}`}>
      <div className="cb-invis-controls">
        <p className="cb-invis-hint">
          {block.hint ??
            "Click any function to surface the invisible work behind it."}
        </p>
        <button
          type="button"
          className="cb-invis-toggle-all"
          onClick={allOpen ? collapseAll : expandAll}
        >
          {allOpen ? "Collapse all" : "Reveal all"}
        </button>
      </div>
      <ul className="cb-invis-list">
        {block.items.map((item, i) => {
          const isOpen = open.has(i);
          return (
            <li
              key={i}
              className={`cb-invis-item${isOpen ? " is-open" : ""}`}
              style={{ ["--i" as string]: String(i) }}
            >
              <button
                type="button"
                className="cb-invis-row"
                aria-expanded={isOpen}
                onClick={() => toggle(i)}
              >
                <span className="cb-invis-eyebrow">{item.eyebrow}</span>
                <span className="cb-invis-title">{item.title}</span>
                <span className="cb-invis-visible">
                  <span className="cb-invis-visible-tag">On the burndown</span>
                  <span className="cb-invis-visible-text">{item.visible}</span>
                </span>
                <span
                  className="cb-invis-caret"
                  aria-hidden="true"
                  data-open={isOpen}
                >
                  ▾
                </span>
              </button>
              <div
                className="cb-invis-reveal"
                aria-hidden={!isOpen}
              >
                <div className="cb-invis-reveal-inner">
                  <div className="cb-invis-reveal-block">
                    <span className="cb-invis-reveal-tag cb-invis-reveal-tag-work">
                      Invisible work
                    </span>
                    <p className="cb-invis-reveal-text">
                      <RichText text={item.invisible} />
                    </p>
                  </div>
                  <div className="cb-invis-reveal-block">
                    <span className="cb-invis-reveal-tag cb-invis-reveal-tag-risk">
                      Without it
                    </span>
                    <p className="cb-invis-reveal-text">
                      <RichText text={item.blocks} />
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {block.caption && (
        <figcaption className="cb-invis-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

/*
 * PartnerTriage: a click-to-sort interactive that asks the reader to
 * place each partner into one of three categories — co-owner, consumer
 * with gating power, or parallel track. Click a category pill on a
 * chip to assign it; click the × in a bin to send it back to the tray.
 * Once placed, "Reveal" highlights correct vs incorrect placements and
 * exposes the reasoning. Reset clears the board.
 */
function PartnerTriage({
  block,
}: {
  block: Extract<SectionBlock, { kind: "partnerTriage" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const [placements, setPlacements] = useState<Record<string, number | null>>(
    () => {
      const init: Record<string, number | null> = {};
      block.partners.forEach((p) => {
        init[p.id] = null;
      });
      return init;
    },
  );
  const [revealed, setRevealed] = useState(false);

  function assign(id: string, binIdx: number) {
    setPlacements((cur) => ({ ...cur, [id]: binIdx }));
    setRevealed(false);
  }

  function unassign(id: string) {
    setPlacements((cur) => ({ ...cur, [id]: null }));
    setRevealed(false);
  }

  function reset() {
    setPlacements(
      Object.fromEntries(block.partners.map((p) => [p.id, null])),
    );
    setRevealed(false);
  }

  const placedCount = Object.values(placements).filter(
    (v) => v !== null,
  ).length;
  const total = block.partners.length;
  const allPlaced = placedCount === total;

  const correctCount = block.partners.filter(
    (p) => placements[p.id] === p.correctBin,
  ).length;

  function chipsInBin(binIdx: number) {
    return block.partners.filter((p) => placements[p.id] === binIdx);
  }
  const trayChips = block.partners.filter(
    (p) => placements[p.id] === null,
  );

  return (
    <figure ref={ref} className={`cb-triage${revealClass(inView)}`}>
      <div className="cb-triage-controls">
        <p className="cb-triage-hint">
          {block.hint ??
            "Click a category on each chip to place it. Reveal when you're done to see the answers."}
        </p>
        <div className="cb-triage-buttons">
          <span className="cb-triage-progress">
            {placedCount} of {total}
            {revealed && allPlaced ? ` · ${correctCount} correct` : ""}
          </span>
          <button
            type="button"
            className="cb-triage-btn"
            onClick={reset}
            disabled={placedCount === 0}
          >
            Reset
          </button>
          <button
            type="button"
            className="cb-triage-btn cb-triage-btn-primary"
            onClick={() => setRevealed(true)}
            disabled={!allPlaced}
          >
            {revealed ? "Revealed" : "Reveal"}
          </button>
        </div>
      </div>

      <div className="cb-triage-bins">
        {block.bins.map((bin, binIdx) => {
          const chips = chipsInBin(binIdx);
          return (
            <div
              key={binIdx}
              className={`cb-triage-bin cb-triage-bin-${bin.tone}`}
            >
              <header className="cb-triage-bin-head">
                <span className="cb-triage-bin-label">{bin.label}</span>
                {bin.sublabel && (
                  <span className="cb-triage-bin-sub">{bin.sublabel}</span>
                )}
              </header>
              <ul className="cb-triage-bin-list">
                {chips.length === 0 ? (
                  <li className="cb-triage-bin-empty">empty</li>
                ) : (
                  chips.map((p) => {
                    const isCorrect = p.correctBin === binIdx;
                    return (
                      <li
                        key={p.id}
                        className={`cb-triage-placed${
                          revealed
                            ? isCorrect
                              ? " is-correct"
                              : " is-wrong"
                            : ""
                        }`}
                      >
                        <span
                          className="cb-triage-placed-glyph"
                          aria-hidden="true"
                        >
                          {p.glyph}
                        </span>
                        <span className="cb-triage-placed-label">
                          {p.label}
                        </span>
                        {revealed && (
                          <span
                            className={`cb-triage-placed-mark ${
                              isCorrect
                                ? "cb-triage-mark-ok"
                                : "cb-triage-mark-no"
                            }`}
                            aria-label={
                              isCorrect ? "Correct" : "Wrong category"
                            }
                          >
                            {isCorrect ? "✓" : "✗"}
                          </span>
                        )}
                        {!revealed && (
                          <button
                            type="button"
                            className="cb-triage-placed-undo"
                            onClick={() => unassign(p.id)}
                            aria-label={`Remove ${p.label} from ${bin.label}`}
                          >
                            ×
                          </button>
                        )}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="cb-triage-tray">
        <div className="cb-triage-tray-head">
          <span className="cb-triage-tray-label">Functions</span>
          <span className="cb-triage-tray-sub">
            {trayChips.length === 0
              ? "All assigned. Reveal to check."
              : "Pick a category for each one."}
          </span>
        </div>
        <ul className="cb-triage-tray-list">
          {trayChips.map((p) => (
            <li key={p.id} className="cb-triage-chip">
              <span className="cb-triage-chip-glyph" aria-hidden="true">
                {p.glyph}
              </span>
              <span className="cb-triage-chip-label">{p.label}</span>
              <span className="cb-triage-chip-actions">
                {block.bins.map((bin, binIdx) => (
                  <button
                    key={binIdx}
                    type="button"
                    className={`cb-triage-chip-btn cb-triage-chip-btn-${bin.tone}`}
                    onClick={() => assign(p.id, binIdx)}
                    title={`Assign to ${bin.label}`}
                    aria-label={`Place ${p.label} as ${bin.label}`}
                  >
                    {bin.tone === "owner"
                      ? "Co"
                      : bin.tone === "consumer"
                        ? "Cn"
                        : "Pa"}
                  </button>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {revealed && (
        <div className="cb-triage-reasons" aria-live="polite">
          <p className="cb-triage-reasons-head">
            {correctCount === total
              ? "All eight in the right shape. You're reading the partnerships the way the chapter argues for."
              : `${correctCount} of ${total} in the right shape. Here's the reasoning behind each placement — disagreement is allowed; the placements are defaults, not laws.`}
          </p>
          <ul className="cb-triage-reasons-list">
            {block.partners.map((p) => {
              const placedBin = placements[p.id];
              const correctBin = block.bins[p.correctBin];
              const isCorrect = placedBin === p.correctBin;
              return (
                <li
                  key={p.id}
                  className={`cb-triage-reason${
                    isCorrect ? " is-correct" : " is-wrong"
                  }`}
                >
                  <span
                    className="cb-triage-reason-glyph"
                    aria-hidden="true"
                  >
                    {p.glyph}
                  </span>
                  <div className="cb-triage-reason-body">
                    <p className="cb-triage-reason-title">
                      <span className="cb-triage-reason-name">{p.label}</span>
                      <span className="cb-triage-reason-arrow">→</span>
                      <span className="cb-triage-reason-bin">
                        {correctBin.label}
                      </span>
                    </p>
                    <p className="cb-triage-reason-text">
                      <RichText text={p.reason} />
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {block.caption && (
        <figcaption className="cb-triage-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

/*
 * FlipDeck: a small grid of cards. Each card shows a question /
 * common-trap on the front; click flips it to reveal the answer or
 * insight. Multiple can be flipped at once. Useful for sections that
 * read as "here are five things you should ask yourself" — the front
 * becomes the prompt, the back the payoff.
 */
function FlipDeck({
  block,
}: {
  block: Extract<SectionBlock, { kind: "flipDeck" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const [flipped, setFlipped] = useState<Set<number>>(() => new Set());
  const cols = block.columns ?? 2;

  function toggle(i: number) {
    setFlipped((cur) => {
      const next = new Set(cur);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  const allFlipped = flipped.size === block.items.length;

  return (
    <figure
      ref={ref}
      className={`cb-flip cb-flip-cols-${cols}${revealClass(inView)}`}
    >
      <div className="cb-flip-controls">
        <p className="cb-flip-hint">
          {block.hint ?? "Tap any card to flip it over."}
        </p>
        <button
          type="button"
          className="cb-flip-toggle-all"
          onClick={() =>
            setFlipped(
              allFlipped
                ? new Set()
                : new Set(block.items.map((_, i) => i)),
            )
          }
        >
          {allFlipped ? "Reset all" : "Flip all"}
        </button>
      </div>
      <ul className="cb-flip-list">
        {block.items.map((item, i) => {
          const isFlipped = flipped.has(i);
          return (
            <li
              key={i}
              className={`cb-flip-item${isFlipped ? " is-flipped" : ""}`}
              style={{ ["--i" as string]: String(i) }}
            >
              <button
                type="button"
                className="cb-flip-card"
                aria-pressed={isFlipped}
                onClick={() => toggle(i)}
              >
                <span className="cb-flip-face cb-flip-face-front">
                  {item.eyebrow && (
                    <span className="cb-flip-eyebrow">{item.eyebrow}</span>
                  )}
                  <span className="cb-flip-front-text">
                    <RichText text={item.front} />
                  </span>
                  <span className="cb-flip-cue" aria-hidden="true">
                    Tap to flip ▸
                  </span>
                </span>
                <span className="cb-flip-face cb-flip-face-back">
                  <span className="cb-flip-back-label">
                    {item.backLabel ?? "Behind it"}
                  </span>
                  <span className="cb-flip-back-text">
                    <RichText text={item.back} />
                  </span>
                  <span className="cb-flip-cue" aria-hidden="true">
                    ◂ Tap to flip back
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {block.caption && (
        <figcaption className="cb-flip-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

/*
 * DragSpectrum: a horizontal track with N labelled stops. The reader
 * drags a handle (or clicks a stop) and a panel below updates with
 * the content for that stop. Use it for tradeoff content — anything
 * a paragraph would have framed as "as you move from X to Y, things
 * change."
 */
function DragSpectrum({
  block,
}: {
  block: Extract<SectionBlock, { kind: "dragSpectrum" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const trackRef = useRef<HTMLDivElement>(null);
  const stops = block.stops;
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);

  function setFromClientX(clientX: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const clamped = Math.max(0, Math.min(1, ratio));
    const idx = Math.round(clamped * (stops.length - 1));
    setActive(idx);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    setDragging(true);
    try {
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setFromClientX(e.clientX);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    setFromClientX(e.clientX);
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setDragging(false);
    try {
      if ((e.currentTarget as Element).hasPointerCapture(e.pointerId)) {
        (e.currentTarget as Element).releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.min(stops.length - 1, i + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(stops.length - 1);
    }
  }

  const pct = stops.length === 1 ? 50 : (active / (stops.length - 1)) * 100;
  const current = stops[active];

  return (
    <figure ref={ref} className={`cb-spec${revealClass(inView)}`}>
      <p className="cb-spec-hint">
        {block.hint ?? "Drag the handle, or click a stop, to move along the spectrum."}
      </p>
      <div className="cb-spec-axis">
        {block.axis && (
          <>
            <span className="cb-spec-axis-end cb-spec-axis-left">
              {block.axis.left}
            </span>
            <span className="cb-spec-axis-end cb-spec-axis-right">
              {block.axis.right}
            </span>
          </>
        )}
      </div>
      <div
        className={`cb-spec-track${dragging ? " is-dragging" : ""}`}
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={stops.length - 1}
        aria-valuenow={active}
        aria-valuetext={current.label}
        onKeyDown={onKeyDown}
      >
        <span className="cb-spec-rail" aria-hidden="true" />
        <span
          className="cb-spec-fill"
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
        {stops.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className={`cb-spec-stop${i === active ? " is-active" : ""}`}
            style={{
              left: `${stops.length === 1 ? 50 : (i / (stops.length - 1)) * 100}%`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setActive(i);
            }}
            aria-label={`Jump to ${s.label}`}
          >
            <span className="cb-spec-stop-dot" aria-hidden="true" />
            <span className="cb-spec-stop-label">{s.label}</span>
          </button>
        ))}
        <span
          className={`cb-spec-handle${dragging ? " is-dragging" : ""}`}
          style={{ left: `${pct}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="cb-spec-panel" aria-live="polite">
        <div key={current.key} className="cb-spec-card">
          {current.eyebrow && (
            <span className="cb-spec-eyebrow">{current.eyebrow}</span>
          )}
          <h3 className="cb-spec-title">{current.title}</h3>
          <p className="cb-spec-body">
            <RichText text={current.body} />
          </p>
          {current.meta && (
            <span className="cb-spec-meta">{current.meta}</span>
          )}
        </div>
      </div>
      {block.caption && (
        <figcaption className="cb-spec-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

/*
 * TapTrace: a sentence or short passage with marked-up spans. Click
 * a marked span and a side note slides in with commentary on that
 * piece of the sentence. Lets a paragraph operate as a click-through
 * map of itself.
 */
function TapTrace({
  block,
}: {
  block: Extract<SectionBlock, { kind: "tapTrace" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const marked = block.segments
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => !!s.mark);
  const [active, setActive] = useState<number | null>(
    marked.length > 0 ? marked[0].i : null,
  );

  const activeSeg = active !== null ? block.segments[active] : null;

  return (
    <figure ref={ref} className={`cb-trace${revealClass(inView)}`}>
      <p className="cb-trace-hint">
        {block.hint ?? "Tap any highlighted phrase to read what it carries."}
      </p>
      {block.lead && (
        <p className="cb-trace-lead">
          <RichText text={block.lead} />
        </p>
      )}
      <p className="cb-trace-passage">
        {block.segments.map((seg, i) => {
          if (!seg.mark) {
            return <Fragment key={i}>{seg.text}</Fragment>;
          }
          const isActive = i === active;
          return (
            <button
              key={i}
              type="button"
              className={`cb-trace-mark${isActive ? " is-active" : ""}`}
              onClick={() => setActive(isActive ? null : i)}
              aria-pressed={isActive}
              aria-label={`${seg.text}: ${seg.mark.label}`}
            >
              <span className="cb-trace-mark-text">{seg.text}</span>
              <span className="cb-trace-mark-dot" aria-hidden="true" />
            </button>
          );
        })}
      </p>
      <div className="cb-trace-panel" aria-live="polite">
        {activeSeg && activeSeg.mark ? (
          <div className="cb-trace-note">
            {activeSeg.mark.eyebrow && (
              <span className="cb-trace-note-eyebrow">
                {activeSeg.mark.eyebrow}
              </span>
            )}
            <p className="cb-trace-note-label">{activeSeg.mark.label}</p>
            <p className="cb-trace-note-text">
              <RichText text={activeSeg.mark.note} />
            </p>
          </div>
        ) : (
          <p className="cb-trace-empty">Pick any highlighted phrase.</p>
        )}
      </div>
      {block.caption && (
        <figcaption className="cb-trace-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

/*
 * DecisionTree: a small click-through diagnostic. The reader is shown
 * a question; their choice walks them down a branch until they hit
 * an outcome. Reset to start over. Useful for "how to tell which X
 * you're in" sections.
 */
type DTreeNode = {
  prompt?: string;
  question?: string;
  outcome?: { eyebrow?: string; title: string; body: string };
  options?: { label: string; next: DTreeNode }[];
};

function DecisionTree({
  block,
}: {
  block: Extract<SectionBlock, { kind: "decisionTree" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const [path, setPath] = useState<{ label: string; node: DTreeNode }[]>([]);

  const current: DTreeNode =
    path.length === 0 ? (block.root as DTreeNode) : path[path.length - 1].node;

  function choose(label: string, next: DTreeNode) {
    setPath((p) => [...p, { label, node: next }]);
  }

  function reset() {
    setPath([]);
  }

  function back() {
    setPath((p) => p.slice(0, -1));
  }

  return (
    <figure ref={ref} className={`cb-tree${revealClass(inView)}`}>
      <div className="cb-tree-controls">
        <p className="cb-tree-hint">
          {block.hint ?? "Walk the questions. The path you take is the answer."}
        </p>
        <div className="cb-tree-buttons">
          <button
            type="button"
            className="cb-tree-btn"
            onClick={back}
            disabled={path.length === 0}
          >
            ◂ Back
          </button>
          <button
            type="button"
            className="cb-tree-btn"
            onClick={reset}
            disabled={path.length === 0}
          >
            Reset
          </button>
        </div>
      </div>

      {path.length > 0 && (
        <ol className="cb-tree-trail">
          {path.map((step, i) => (
            <li key={i} className="cb-tree-trail-step">
              <span className="cb-tree-trail-num">{i + 1}</span>
              <span className="cb-tree-trail-label">{step.label}</span>
            </li>
          ))}
        </ol>
      )}

      {current.outcome ? (
        <div className="cb-tree-outcome">
          {current.outcome.eyebrow && (
            <span className="cb-tree-outcome-eyebrow">
              {current.outcome.eyebrow}
            </span>
          )}
          <h3 className="cb-tree-outcome-title">{current.outcome.title}</h3>
          <p className="cb-tree-outcome-body">
            <RichText text={current.outcome.body} />
          </p>
        </div>
      ) : (
        <div className="cb-tree-question">
          {current.prompt && (
            <span className="cb-tree-prompt">{current.prompt}</span>
          )}
          {current.question && (
            <h3 className="cb-tree-q">{current.question}</h3>
          )}
          <ul className="cb-tree-options">
            {(current.options ?? []).map((opt, i) => (
              <li key={i}>
                <button
                  type="button"
                  className="cb-tree-option"
                  onClick={() => choose(opt.label, opt.next as DTreeNode)}
                >
                  {opt.label}
                  <span className="cb-tree-option-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {block.caption && (
        <figcaption className="cb-tree-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

/*
 * PromptScope: a vague prompt at the top with N "specificity layers"
 * the reader can toggle on. Each enabled layer adds a sentence to
 * the prompt in place. Teaches that specificity is layered — a
 * component reference, then visual tokens, then behavior, etc. —
 * not a single adjective.
 */
function PromptScope({
  block,
}: {
  block: Extract<SectionBlock, { kind: "promptScope" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const [enabled, setEnabled] = useState<Set<string>>(() => new Set());

  function toggle(key: string) {
    setEnabled((cur) => {
      const next = new Set(cur);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function reset() {
    setEnabled(new Set());
  }

  function addAll() {
    setEnabled(new Set(block.layers.map((l) => l.key)));
  }

  const allOn = enabled.size === block.layers.length;
  const activeLayers = block.layers.filter((l) => enabled.has(l.key));

  return (
    <figure ref={ref} className={`cb-scope${revealClass(inView)}`}>
      <div className="cb-scope-controls">
        <p className="cb-scope-hint">
          {block.hint ??
            "Toggle each layer on. Watch the prompt grow from vague to specific."}
        </p>
        <button
          type="button"
          className="cb-scope-reset"
          onClick={allOn ? reset : addAll}
        >
          {allOn ? "Reset" : "Add all"}
        </button>
      </div>
      <div className="cb-scope-prompt" aria-live="polite">
        <span className="cb-scope-prompt-eyebrow">The prompt, right now</span>
        <p className="cb-scope-prompt-body">
          <span className="cb-scope-prompt-vague">{block.vague}</span>
          {activeLayers.map((layer) => (
            <span key={layer.key} className="cb-scope-prompt-addition">
              {" "}
              {layer.addition}
            </span>
          ))}
        </p>
        <span className="cb-scope-meter" aria-hidden="true">
          <span
            className="cb-scope-meter-fill"
            style={{
              width: `${(enabled.size / block.layers.length) * 100}%`,
            }}
          />
        </span>
        <span className="cb-scope-meter-label">
          {enabled.size === 0
            ? "Vague"
            : enabled.size === block.layers.length
              ? "Specific enough to ship"
              : `${enabled.size} of ${block.layers.length} layers added`}
        </span>
      </div>
      <ul className="cb-scope-layers">
        {block.layers.map((layer) => {
          const isOn = enabled.has(layer.key);
          return (
            <li key={layer.key} className="cb-scope-layer-item">
              <button
                type="button"
                className={`cb-scope-layer${isOn ? " is-on" : ""}`}
                onClick={() => toggle(layer.key)}
                aria-pressed={isOn}
              >
                <span className="cb-scope-layer-toggle" aria-hidden="true">
                  <span className="cb-scope-layer-toggle-dot" />
                </span>
                <span className="cb-scope-layer-text">
                  {layer.eyebrow && (
                    <span className="cb-scope-layer-eyebrow">
                      {layer.eyebrow}
                    </span>
                  )}
                  <span className="cb-scope-layer-label">{layer.label}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {block.caption && (
        <figcaption className="cb-scope-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

/*
 * PodRhythm: an interactive walk-through of a workflow image. The
 * reader clicks a step chip, the matching column of the image lights
 * up while the rest dims, and a detail panel below describes the
 * phase. Region coordinates are percentages of the image.
 */
function PodRhythm({
  block,
}: {
  block: Extract<SectionBlock, { kind: "podRhythm" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const [active, setActive] = useState<string>(
    block.defaultActive ?? block.steps[0]?.key ?? "",
  );
  const current = block.steps.find((s) => s.key === active) ?? block.steps[0];

  return (
    <figure ref={ref} className={`cb-rhythm${revealClass(inView)}`}>
      <p className="cb-rhythm-hint">
        {block.hint ?? "Click a phase to see where the pod's energy is."}
      </p>
      <div className="cb-rhythm-stage">
        <LightboxThumbnail
          className="cb-rhythm-image"
          src={block.image.src}
          alt={block.image.alt}
        />
        {current && (
          <span
            className="cb-rhythm-spotlight"
            style={{
              left: `${current.region.x}%`,
              top: `${current.region.y}%`,
              width: `${current.region.width}%`,
              height: `${current.region.height}%`,
            }}
            aria-hidden="true"
          />
        )}
      </div>
      <ul className="cb-rhythm-steps">
        {block.steps.map((s, i) => {
          const isActive = s.key === active;
          return (
            <li key={s.key} className="cb-rhythm-step-item">
              <button
                type="button"
                className={`cb-rhythm-step${isActive ? " is-active" : ""}`}
                onClick={() => setActive(s.key)}
                aria-pressed={isActive}
              >
                <span className="cb-rhythm-step-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="cb-rhythm-step-label">{s.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {current && (
        <div
          key={current.key}
          className="cb-rhythm-panel"
          aria-live="polite"
        >
          {current.eyebrow && (
            <span className="cb-rhythm-panel-eyebrow">{current.eyebrow}</span>
          )}
          <h3 className="cb-rhythm-panel-title">{current.title}</h3>
          <p className="cb-rhythm-panel-body">
            <RichText text={current.body} />
          </p>
        </div>
      )}
      {block.caption && (
        <figcaption className="cb-rhythm-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

const SEVERITY_ORDER = ["nit", "minor", "major", "blocker"] as const;
type Severity = (typeof SEVERITY_ORDER)[number];

const SEVERITY_LABEL: Record<Severity, string> = {
  blocker: "Blocker",
  major: "Major",
  minor: "Minor",
  nit: "Nit",
};

const SEVERITY_HELP: Record<Severity, string> = {
  blocker: "Must fix before merge",
  major: "Should fix before merge if at all possible",
  minor: "Fix soon, can be deferred",
  nit: "Preference-level, fix if convenient",
};

const severityRank = (s: Severity) => SEVERITY_ORDER.indexOf(s);

/**
 * SeveritySort lets the reader practice the BLOCKER / MAJOR / MINOR / NIT
 * severity model used inside engineering review. They tag a small batch of
 * realistic issues, reveal calibration, and get a diagnosis of which way
 * they're tilted (over-rating, under-rating, balanced, or perfect).
 */
function SeveritySort({
  block,
}: {
  block: Extract<SectionBlock, { kind: "severitySort" }>;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const [picks, setPicks] = useState<Record<string, Severity>>({});
  const [revealed, setRevealed] = useState(false);

  const allPicked = block.issues.every((i) => Boolean(picks[i.id]));

  const setPick = (id: string, severity: Severity) => {
    if (revealed) return;
    setPicks((prev) => ({ ...prev, [id]: severity }));
  };

  const reveal = () => {
    if (allPicked) setRevealed(true);
  };

  const reset = () => {
    setPicks({});
    setRevealed(false);
  };

  const score = block.issues.reduce(
    (acc, issue) => {
      const pick = picks[issue.id];
      if (!pick) return acc;
      if (pick === issue.correct) acc.correct += 1;
      else if (severityRank(pick) > severityRank(issue.correct)) acc.over += 1;
      else acc.under += 1;
      return acc;
    },
    { correct: 0, over: 0, under: 0 },
  );

  const total = block.issues.length;
  const diag = block.diagnoses ?? {};

  let diagnosis = "";
  if (revealed) {
    if (score.correct === total) {
      diagnosis = diag.perfect ?? "Perfect calibration.";
    } else if (score.over > score.under) {
      diagnosis = diag.overRated ?? "You're tagging up.";
    } else if (score.under > score.over) {
      diagnosis = diag.underRated ?? "You're tagging down.";
    } else {
      diagnosis = diag.balanced ?? "Mixed.";
    }
  }

  return (
    <figure ref={ref} className={`cb-sev${revealClass(inView)}`}>
      {block.hint && <p className="cb-sev-hint">{block.hint}</p>}

      <ol className="cb-sev-list">
        {block.issues.map((issue, i) => {
          const pick = picks[issue.id];
          const isCorrect = revealed && pick === issue.correct;
          return (
            <li
              key={issue.id}
              className={`cb-sev-item${
                revealed
                  ? isCorrect
                    ? " is-correct"
                    : " is-wrong"
                  : ""
              }`}
            >
              <div className="cb-sev-issue">
                <span className="cb-sev-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="cb-sev-issue-text">
                  <p className="cb-sev-text">{issue.text}</p>
                  {issue.context && (
                    <p className="cb-sev-context">
                      <RichText text={issue.context} />
                    </p>
                  )}
                </div>
              </div>

              <div
                className="cb-sev-chips"
                role="radiogroup"
                aria-label={`Severity for issue ${i + 1}`}
              >
                {SEVERITY_ORDER.slice()
                  .reverse()
                  .map((sev) => {
                    const isPicked = pick === sev;
                    const isAnswer = revealed && sev === issue.correct;
                    const isWrongPick = revealed && isPicked && !isCorrect;
                    return (
                      <button
                        key={sev}
                        type="button"
                        role="radio"
                        aria-checked={isPicked}
                        disabled={revealed}
                        className={`cb-sev-chip cb-sev-chip-${sev}${
                          isPicked ? " is-picked" : ""
                        }${isAnswer ? " is-answer" : ""}${
                          isWrongPick ? " is-wrong-pick" : ""
                        }`}
                        onClick={() => setPick(issue.id, sev)}
                        title={SEVERITY_HELP[sev]}
                      >
                        {SEVERITY_LABEL[sev]}
                      </button>
                    );
                  })}
              </div>

              {revealed && (
                <div className="cb-sev-explain">
                  <p className="cb-sev-verdict">
                    {isCorrect ? (
                      <>
                        <span className="cb-sev-mark cb-sev-mark-ok">
                          Calibrated
                        </span>{" "}
                        — {SEVERITY_LABEL[issue.correct]} matches the rev.
                      </>
                    ) : (
                      <>
                        <span className="cb-sev-mark cb-sev-mark-bad">
                          Off
                        </span>{" "}
                        — engineering rev would call this{" "}
                        <strong>{SEVERITY_LABEL[issue.correct]}</strong>.
                      </>
                    )}
                  </p>
                  <p className="cb-sev-reasoning">
                    <RichText text={issue.reasoning} />
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="cb-sev-footer">
        {!revealed ? (
          <button
            type="button"
            className="cb-sev-action"
            disabled={!allPicked}
            onClick={reveal}
          >
            {block.revealLabel ?? "Reveal calibration"}
          </button>
        ) : (
          <>
            <div className="cb-sev-summary" aria-live="polite">
              <span className="cb-sev-score">
                <strong>{score.correct}</strong>
                <span className="cb-sev-score-of">/{total}</span> on the rev
              </span>
              <p className="cb-sev-diagnosis">{diagnosis}</p>
            </div>
            <button
              type="button"
              className="cb-sev-action cb-sev-action-ghost"
              onClick={reset}
            >
              {block.resetLabel ?? "Try again"}
            </button>
          </>
        )}
      </div>

      {block.caption && (
        <figcaption className="cb-sev-caption">
          <RichText text={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}

export default SectionBlocks;
