import type { SectionBlock } from "../data/playbook";
import Icon from "./Icon";

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
      return <p className="cb-paragraph">{block.text}</p>;

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
            <p className="cb-callout-text">{block.text}</p>
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
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    loading="lazy"
                    decoding="async"
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
                <p className="cb-card-text">{item.text}</p>
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
          <span className="cb-wink-text">{block.text}</span>
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
                <span className="cb-check-text">{item.text}</span>
              </div>
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="cb-steps">
          {block.items.map((item, i) => (
            <li key={i} className="cb-step">
              <span className="cb-step-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="cb-step-body">
                <h3 className="cb-step-title">{item.title}</h3>
                <p className="cb-step-text">{item.text}</p>
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
                    <td key={j}>{cell}</td>
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
  }
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
