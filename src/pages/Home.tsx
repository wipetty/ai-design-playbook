import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { playbook, getTotalChapters } from "../data/playbook";
import Seal from "../components/Seal";

const minutesFromReadTime = (s: string) => parseInt(s.replace(/[^\d]/g, ""), 10);

export function Home() {
  const [marqueePaused, setMarqueePaused] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    const target = state?.scrollTo;
    if (!target) return;
    const el = document.getElementById(target);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.state]);
  const totalChapters = getTotalChapters();
  const allChapters = playbook.flatMap((p) => p.chapters);
  const totalMinutes = allChapters.reduce(
    (sum, c) => sum + (minutesFromReadTime(c.readTime) || 0),
    0,
  );
  const featured = allChapters[0];
  const featuredPart = playbook[0];

  const marqueeItems = allChapters
    .map((c) => c.title)
    .concat(allChapters.map((c) => c.title));

  const comparison: Array<{ label: string; before: string; after: string }> = [
    {
      label: "Briefs",
      before: "Pages of words, vague constraints",
      after: "Clear roles, goals, examples",
    },
    {
      label: "Exploration",
      before: "Three options after a long week",
      after: "Twenty options before lunch",
    },
    {
      label: "Critique",
      before: "Wait for review on Friday",
      after: "Stress test the design at any hour",
    },
    {
      label: "Prototypes",
      before: "Click-throughs in slide tools",
      after: "Real working code in an afternoon",
    },
    {
      label: "Quality control",
      before: "Surface polish flags as done",
      after: "Substance becomes the bar",
    },
    {
      label: "Handoff",
      before: "Static screens, lost intent",
      after: "Designs ship with the brief attached",
    },
  ];

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="hero hero-grid">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-grid-lines" />
          <div className="hero-blur hero-blur-1" />
          <div className="hero-blur hero-blur-2" />
        </div>

        <div className="hero-inner hero-inner-grid">
          <a
            href="#contents-heading"
            className="hero-status"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contents-heading")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <span className="hero-status-dot" aria-hidden="true" />
            <span>{playbook.length} parts</span>
            <span className="hero-status-divider" aria-hidden="true" />
            <span>{totalChapters} chapters</span>
            <span className="hero-status-divider" aria-hidden="true" />
            <span>~{totalMinutes} min</span>
          </a>

          <h1 className="hero-title hero-title-xl">
            The AI design <em>playbook</em> for designers who <em>ship</em>.
          </h1>

          <div className="hero-bottom">
            <p className="hero-lede">
              A field guide to vibe coding, shipping, and everything between.
              For designers who want to stay opinionated.
            </p>
            <Link
              to={`/${featuredPart.id}/${featured.id}`}
              className="hero-cta"
            >
              <span className="hero-cta-label">Start reading</span>
              <span className="hero-cta-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <Seal />
        </div>
      </section>

      {/* MARQUEE */}
      <section className="marquee" aria-label="Chapter titles">
        <div
          className={`marquee-track${marqueePaused ? " is-paused" : ""}`}
          aria-hidden="true"
        >
          {marqueeItems.map((t, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-text">{t}</span>
              <span className="marquee-dot">●</span>
            </span>
          ))}
        </div>
        <button
          type="button"
          className="marquee-pause"
          aria-pressed={marqueePaused}
          aria-label={
            marqueePaused ? "Play scrolling chapters" : "Pause scrolling chapters"
          }
          onClick={() => setMarqueePaused((p) => !p)}
        >
          <span className="marquee-pause-icon" aria-hidden="true">
            {marqueePaused ? "▶" : "❚❚"}
          </span>
          <span className="marquee-pause-text">
            {marqueePaused ? "Play" : "Pause"}
          </span>
        </button>
      </section>

      {/* STATS / PROMISE */}
      <section className="promise">
        <div className="promise-inner">
          <div className="promise-header">
            <span className="section-eyebrow">By the numbers</span>
            <h2 className="section-title">
              Five parts. {totalChapters} chapters. <em>One craft.</em>
            </h2>
          </div>

          <ul className="stats">
            <li className="stat">
              <span className="stat-value">{playbook.length}</span>
              <span className="stat-label">Parts</span>
              <span className="stat-meta">Foundations to shipping</span>
            </li>
            <li className="stat">
              <span className="stat-value">{totalChapters}</span>
              <span className="stat-label">Chapters</span>
              <span className="stat-meta">Each one stands alone</span>
            </li>
            <li className="stat">
              <span className="stat-value">~{totalMinutes}</span>
              <span className="stat-label">Minutes</span>
              <span className="stat-meta">A weekend, not a year</span>
            </li>
            <li className="stat">
              <span className="stat-value">0</span>
              <span className="stat-label">Hype</span>
              <span className="stat-meta">Opinions only</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FEATURED — START HERE */}
      <section className="featured">
        <div className="featured-inner">
          <div className="featured-side">
            <span className="section-eyebrow">Start here</span>
            <p className="featured-quote">
              <span aria-hidden="true">“</span>AI compresses the distance
              between an idea and a working artifact. The valuable work moves up
              the stack&mdash;framing problems, judging quality, and
              editing.<span aria-hidden="true">”</span>
            </p>
            <p className="featured-attr">— Chapter 01</p>
          </div>
          <Link
            to={`/${featuredPart.id}/${featured.id}`}
            className="featured-card"
          >
            <span className="featured-number">01</span>
            <div className="featured-card-body">
              <span className="featured-card-eyebrow">
                Part 01 · Foundations
              </span>
              <h3 className="featured-card-title">{featured.title}</h3>
              <p className="featured-card-summary">{featured.summary}</p>
              <span className="featured-card-cta">Read chapter →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* CONTENTS */}
      <section className="contents" aria-labelledby="contents-heading">
        <div className="contents-inner">
          <div className="contents-header">
            <span className="section-eyebrow">Contents</span>
            <h2 id="contents-heading" className="section-title">
              What you'll <em>learn</em>.
            </h2>
          </div>

          <ol className="parts">
            {playbook.map((part) => (
              <li key={part.id} className="part">
                <div className="part-header">
                  <span className="part-number">Part {String(part.number).padStart(2, "0")}</span>
                  <h3 className="part-title">{part.title}</h3>
                  <p className="part-description">{part.description}</p>
                </div>
                <ol className="chapters">
                  {part.chapters.map((chapter) => (
                    <li key={chapter.id} className="chapter-card">
                      <Link
                        to={`/${part.id}/${chapter.id}`}
                        className="chapter-link"
                      >
                        <span className="chapter-number">
                          {String(chapter.number).padStart(2, "0")}
                        </span>
                        <div className="chapter-main">
                          <h4 className="chapter-title">{chapter.title}</h4>
                          <p className="chapter-summary">{chapter.summary}</p>
                        </div>
                        <span className="chapter-readtime">
                          {chapter.readTime}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="compare">
        <div className="compare-inner">
          <div className="compare-header">
            <span className="section-eyebrow">Before / With</span>
            <h2 className="section-title">
              Same craft. <em>Different pace.</em>
            </h2>
          </div>

          <div className="compare-grid">
            <div className="compare-row compare-row-head">
              <span className="compare-cell compare-label" />
              <span className="compare-cell compare-before-head">
                Before AI
              </span>
              <span className="compare-cell compare-after-head">With AI</span>
            </div>
            {comparison.map((row) => (
              <div key={row.label} className="compare-row">
                <span className="compare-cell compare-label">{row.label}</span>
                <span className="compare-cell compare-before">
                  {row.before}
                </span>
                <span className="compare-cell compare-after">{row.after}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-inner">
          <span className="section-eyebrow">Begin</span>
          <h2 className="cta-title">
            Read it on a quiet <em>Sunday</em>.
            <br /> Use it on <em>Monday</em>.
          </h2>
          <div className="cta-actions">
            <Link
              to={`/${featuredPart.id}/${featured.id}`}
              className="cta-button cta-button-primary"
            >
              Start with Chapter 01
            </Link>
            <a
              href="#contents-heading"
              className="cta-button cta-button-ghost"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contents-heading")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Skim the contents
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about" aria-labelledby="about-heading">
        <div className="about-inner">
          <span className="section-eyebrow">About</span>
          <h2 id="about-heading" className="about-title">
            Why this <em>exists</em>.
          </h2>
          <p className="about-body">
            This is a small set of notes from a working designer trying to make
            sense of AI without losing the craft. It's written in the open, in
            case any of it is useful to designers who'd rather spend a quiet
            afternoon learning the new instrument than another week arguing
            about it.
          </p>

          <div className="about-author" aria-labelledby="about-author-heading">
            <h3 id="about-author-heading" className="about-author-name">
              <em>Veronica</em>
            </h3>
            <p className="about-author-body">
              Her practice has been tangled up with AI for a long time &mdash;
              back when getting a model to do anything useful meant training
              it yourself, wiring up your own agents, and coaxing pictures out
              of small, stubborn networks. That work, alongside years spent in
              code, parametric design, and design technology, is what made the
              question of how AI and design fit together feel personal. This
              playbook is a quiet attempt to think it through in public.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
