import { useEffect } from "react";
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ChapterPage from "./pages/ChapterPage";
import { ThemeProvider } from "./contexts/ThemeProvider";

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) return;
    window.scrollTo(0, 0);
  }, [location.pathname, location.state]);
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:partId/:chapterId" element={<ChapterPage />} />
          </Routes>
        </Layout>
      </HashRouter>
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}

export default App;
