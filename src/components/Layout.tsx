import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="site-brand" aria-label="AI Design Playbook home">
            <span className="site-brand-mark" aria-hidden="true" />
            <span className="site-brand-text">AI Design Playbook</span>
          </Link>
          <div className="site-header-right">
            <nav className="site-nav" aria-label="Primary">
              <Link to="/">Contents</Link>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                About
              </a>
            </nav>
            <span className="site-byline">
              <span className="site-byline-label">By</span>
              <span className="site-byline-name">@peitongc</span>
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <span>© 2026 · AI Design Playbook</span>
          <span className="site-footer-credit">
            Made by{" "}
            <span className="site-footer-credit-name">
              Veronica Peitong Chen
            </span>
          </span>
          <span>A field guide for designers</span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
