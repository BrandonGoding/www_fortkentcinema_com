import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ComingSoonPage from "./pages/ComingSoonPage";
import BlogRollPage from "./pages/BlogRollPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import { useEffect } from "react";
import { initGA, trackPageview } from "./analytics";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Archive from "./pages/FilmArchivePage";
import FilmDetailPage from "./pages/FilmDetailPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <LocationTracker />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="archive" element={<Archive />} />
          <Route path="archive/:slug" element={<FilmDetailPage />} />
          <Route path="fort-kent-cinema-blog" element={<BlogRollPage />} />
          <Route
            path="fort-kent-cinema-blog/:slug"
            element={<BlogDetailPage />}
          />
          <Route path="coming-soon" element={<ComingSoonPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function LocationTracker() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageview(location.pathname + location.search);
  }, [location]);

  return null;
}

export default App;
