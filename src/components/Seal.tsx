export function Seal() {
  const text =
    "  AI · DESIGN · PLAYBOOK · A FIELD GUIDE · 2026 · FIVE PARTS · SIXTEEN CHAPTERS  ";
  return (
    <div className="seal" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="seal-svg">
        <defs>
          <path
            id="seal-circle"
            d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
          />
        </defs>
        <text className="seal-text">
          <textPath href="#seal-circle" startOffset="0">
            {text}
            {text}
          </textPath>
        </text>
      </svg>
      <span className="seal-mark" aria-hidden="true" />
    </div>
  );
}

export default Seal;
