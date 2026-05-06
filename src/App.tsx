import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:partId/:chapterId" element={<ChapterPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
