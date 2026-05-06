import type { SectionBlock } from "../data/playbook";
import Icon from "./Icon";
import LightboxThumbnail from "./LightboxThumbnail";

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

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
      return (
        <div className="cb-flow" aria-label={block.label}>
          {block.label && <span className="cb-flow-label">{block.label}</span>}
          <ol className="cb-flow-track">
            {block.steps.map((step, i) => (
              <li key={i} className="cb-flow-step">
                {step.meta && (
                  <span className="cb-flow-meta">{step.meta}</span>
                )}
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
          {block.items.map((item, i) => (
            <li
              key={i}
              className={`cb-check-item cb-check-${item.positive ? "yes" : "no"}`}
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
            </li>
          ))}
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
      return (
        <figure className={`cb-figure-grid cb-figure-grid-${columns}`}>
          <div className="cb-figure-grid-track">
            {block.items.map((item, i) => (
              <figure key={i} className="cb-figure-tile">
                <div className="cb-figure-frame">
                  <LightboxThumbnail
                    src={item.image.src}
                    alt={item.image.alt}
                  />
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

    case "anatomy":
      return <AnatomyDiagram block={block} />;

    case "balance":
      return <BalanceDiagram block={block} />;

    case "bento":
      return <BentoGrid block={block} />;
  }
}

function AnatomyDiagram({
  block,
}: {
  block: Extract<SectionBlock, { kind: "anatomy" }>;
}) {
  const orderedNotes = [...block.notes].sort((a, b) => a.mark - b.mark);
  return (
    <figure className="cb-anatomy">
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

function BalanceDiagram({
  block,
}: {
  block: Extract<SectionBlock, { kind: "balance" }>;
}) {
  const tilt = block.tilt ?? "even";
  const angle = tilt === "left" ? -8 : tilt === "right" ? 8 : 0;
  return (
    <figure className={`cb-balance cb-balance-tilt-${tilt}`}>
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
            transform: `rotate(${angle}deg)`,
            transformOrigin: "200px 60px",
            transition: "transform 800ms cubic-bezier(.2,.7,.2,1)",
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
  return (
    <figure className="cb-bento">
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
  return (
    <figure className="cb-room">
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

  /*
   * One shared coordinate system. viewBox 800×260, aspect-ratio applied
   * to the wrapping figure so SVG scales uniformly without distortion.
   */
  return (
    <figure className="cb-mirror">
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

export default SectionBlocks;
