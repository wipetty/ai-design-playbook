import { Link, useParams, Navigate } from "react-router-dom";
import { getChapter } from "../data/playbook";
import SectionBlocks from "../components/SectionBlocks";
import ReadingProgress from "../components/ReadingProgress";
import ChapterToc from "../components/ChapterToc";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function ChapterPage() {
  const { partId, chapterId } = useParams();

  if (!partId || !chapterId) {
    return <Navigate to="/" replace />;
  }

  const data = getChapter(partId, chapterId);

  if (!data) {
    return (
      <section className="chapter-not-found">
        <div className="chapter-inner">
          <h1 className="chapter-page-title">Chapter not found.</h1>
          <p>That chapter doesn't exist.</p>
          <Link to="/" className="back-link">
            ← Back to contents
          </Link>
        </div>
      </section>
    );
  }

  const { part, chapter, prev, next } = data;

  const sectionIds = chapter.sections.map(
    (section, idx) => `section-${idx}-${slugify(section.heading)}`,
  );

  return (
    <>
      <ReadingProgress />
      <article
        className="chapter-article page-enter"
        key={`${partId}-${chapterId}`}
      >
        <div className="chapter-inner">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Contents</Link>
            <span aria-hidden="true">/</span>
            <span>
              Part {part.number} · {part.title}
            </span>
          </nav>

          <header className="chapter-header">
            <span className="chapter-eyebrow">
              Chapter {String(chapter.number).padStart(2, "0")} ·{" "}
              {chapter.readTime}
            </span>
            <h1 className="chapter-page-title">{chapter.title}.</h1>
            <p className="chapter-page-summary">{chapter.summary}</p>
          </header>

          <div className="chapter-body">
            {chapter.sections.map((section, idx) => (
              <section
                key={idx}
                id={sectionIds[idx]}
                className="chapter-section"
                data-section-index={idx}
              >
                <h2 className="chapter-section-heading">{section.heading}.</h2>
                {section.body && <p>{section.body}</p>}
                {section.blocks && <SectionBlocks blocks={section.blocks} />}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <nav className="chapter-pager" aria-label="Chapter navigation">
            {prev ? (
              <Link
                to={`/${prev.partId}/${prev.chapterId}`}
                className="pager-link pager-prev"
              >
                <span className="pager-direction">← Previous</span>
                <span className="pager-title">
                  {getChapter(prev.partId, prev.chapterId)?.chapter.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            <div className="pager-toc">
              <ChapterToc />
            </div>
            {next ? (
              <Link
                to={`/${next.partId}/${next.chapterId}`}
                className="pager-link pager-next"
              >
                <span className="pager-direction">Next →</span>
                <span className="pager-title">
                  {getChapter(next.partId, next.chapterId)?.chapter.title}
                </span>
              </Link>
            ) : (
              <Link to="/" className="pager-link pager-next">
                <span className="pager-direction">Back →</span>
                <span className="pager-title">Contents</span>
              </Link>
            )}
          </nav>
        </div>
      </article>
    </>
  );
}

export default ChapterPage;
