import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Hero from './components/Hero';
import NowShowing from './components/NowShowing';
import ComingSoon from './components/ComingSoon';
import Blog from './components/Blog';
import Membership from './components/Membership';
import GiftCardCTA from './components/GiftCardCTA';
import OpenMicCTA from './components/OpenMicCTA';
import ClassicMovieCTA from './components/ClassicMovieCTA';
import Footer from './components/Footer';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import {
  getNowShowing,
  getComingSoon,
  getMembership,
  getSiteConfig,
} from './services/api';
import './styles/global.css';

function HomePage({ nowShowing, comingSoon, membership, siteConfig, onShowtimeClick }) {
  return (
    <>
      <Hero config={siteConfig} />
      <ClassicMovieCTA />
      <NowShowing movies={nowShowing} onShowtimeClick={onShowtimeClick} />
      <OpenMicCTA />
      <ComingSoon movies={comingSoon} />
      <Blog />
      <GiftCardCTA />
      {membership && <Membership data={membership} />}
    </>
  );
}

function App() {
  const [nowShowing, setNowShowing] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [membership, setMembership] = useState(null);
  const [siteConfig, setSiteConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        const [nowShowingData, comingSoonData, membershipData, configData] = await Promise.all([
          getNowShowing(),
          getComingSoon(),
          getMembership(),
          getSiteConfig(),
        ]);

        setNowShowing(nowShowingData);
        setComingSoon(comingSoonData);
        setMembership(membershipData);
        setSiteConfig(configData);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleShowtimeClick = (movie, showtime) => {
    console.log(`Buying ticket for ${movie.title} at ${showtime}`);
    alert(`Ticket purchase for "${movie.title}" at ${showtime} - Coming soon!`);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <h1>FORT KENT CINEMA</h1>
          <p>Loading...</p>
        </div>
        <style>{`
          .loading-screen {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-bg-dark);
          }
          .loading-content {
            text-align: center;
          }
          .loading-content h1 {
            font-family: var(--font-display);
            font-size: 3rem;
            letter-spacing: 6px;
            color: var(--color-gold);
            text-shadow: 0 0 15px var(--color-gold-glow);
            margin-bottom: 1rem;
          }
          .loading-content p {
            color: var(--color-cream-muted);
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h1>Something went wrong</h1>
        <p>{error}</p>
        <style>{`
          .error-screen {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: var(--color-bg-dark);
            color: var(--color-cream);
            text-align: center;
            padding: 2rem;
          }
          .error-screen h1 {
            color: var(--color-neon-red);
            margin-bottom: 1rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Nav config={siteConfig} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                nowShowing={nowShowing}
                comingSoon={comingSoon}
                membership={membership}
                siteConfig={siteConfig}
                onShowtimeClick={handleShowtimeClick}
              />
            }
          />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
        </Routes>
      </main>
      <Footer config={siteConfig} />
    </>
  );
}

export default App;
