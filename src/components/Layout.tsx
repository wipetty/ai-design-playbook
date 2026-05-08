import { Link, useLocation, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";
import BackToTop from "./BackToTop";
import CoffeeButton from "./CoffeeModal";

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToId = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleHashLink = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/", { state: { scrollTo: id }, viewTransition: true });
    }
  };

  return (
    <div className="layout">
      <header className="site-header">
        <div className="site-header-inner">
          <Link
            to="/"
            className="site-brand"
            aria-label="AI Design Playbook home"
            viewTransition
          >
            <span className="site-brand-mark" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                role="presentation"
              >
                <path
                  className="site-brand-spark"
                  d="M12 2C12 9 15 12 22 12C15 12 12 15 12 22C12 15 9 12 2 12C9 12 12 9 12 2Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="site-brand-text">AI Design Playbook</span>
          </Link>
          <div className="site-header-right">
            <nav className="site-nav" aria-label="Primary">
              <a href="#contents-heading" onClick={handleHashLink("contents-heading")}>
                Contents
              </a>
              <a href="#about" onClick={handleHashLink("about")}>
                About
              </a>
            </nav>
            <CoffeeButton
              className="site-byline"
              ariaLabel="Buy me a coffee, by @peitongc"
            >
              <span className="site-byline-label">By</span>
              <span className="site-byline-name">@peitongc</span>
            </CoffeeButton>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <span>© 2026 · AI Design Playbook</span>
          <span className="site-footer-credit">
            Made with AI by{" "}
            <span className="site-footer-credit-name">
              Veronica Peitong Chen
            </span>
          </span>
          <CoffeeButton className="site-footer-coffee">
            <span className="site-footer-coffee-icon" aria-hidden="true">
              ☕
            </span>
            Buy me a coffee
          </CoffeeButton>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}

export default Layout;
