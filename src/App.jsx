import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
import PrivateRentalsPage from './pages/PrivateRentalsPage';
import {
  getNowShowing,
  getComingSoon,
  getMembership,
  getSiteConfig,
} from './services/api';
import './styles/global.css';

function OrnamentDivider() {
  return (
    <div className="ornament-divider" aria-hidden="true">
      <div className="ornament-line" />
      <div className="ornament-diamond" />
      <span className="ornament-star">{'\u2726'}</span>
      <div className="ornament-diamond" />
      <div className="ornament-line" />
    </div>
  );
}

function HomePage({ nowShowing, comingSoon, membership, siteConfig, onShowtimeClick }) {
  return (
    <>
      <Helmet>
        <title>Fort Kent Cinema | Movies in the St. John Valley</title>
        <meta name="description" content="Fort Kent Cinema - Your local movie theater in Fort Kent, Maine. Check showtimes, coming soon, and join our membership program." />
        <meta property="og:title" content="Fort Kent Cinema | Movies in the St. John Valley" />
        <meta property="og:description" content="Your local movie theater in Fort Kent, Maine. Check showtimes, coming soon, and join our membership program." />
        <meta property="og:url" content="https://www.fortkentcinema.com/" />
        <link rel="canonical" href="https://www.fortkentcinema.com/" />
      </Helmet>
      <Hero config={siteConfig} />
      <OrnamentDivider />
      <ClassicMovieCTA />
      <OrnamentDivider />
      <NowShowing movies={nowShowing} onShowtimeClick={onShowtimeClick} />
      <OrnamentDivider />
      <OpenMicCTA />
      <OrnamentDivider />
      <ComingSoon movies={comingSoon} />
      <OrnamentDivider />
      <Blog />
      <OrnamentDivider />
      <GiftCardCTA />
      <OrnamentDivider />
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
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
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
      setLoading(false);
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

  return (
    <>
      <div className="vignette" />
      <div className="curtain-left" />
      <div className="curtain-right" />
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
          <Route path="/rentals" element={<PrivateRentalsPage />} />
        </Routes>
      </main>
      <Footer config={siteConfig} />
    </>
  );
}

export default App;
