import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Nav.css';

function Nav({ config }) {
  const { cinema, navigation } = config;
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e, item) => {
    // For hash links, handle based on current page
    if (!isHomePage && item.href.startsWith('#')) {
      e.preventDefault();
      navigate('/' + item.href);
    }
    setMenuOpen(false);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Close menu on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen, handleKeyDown]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">{cinema.name.toUpperCase()}</Link>
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="nav-hamburger-line" />
          <span className="nav-hamburger-line" />
          <span className="nav-hamburger-line" />
        </button>
        <ul className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}>
          {navigation.map((item) => (
            <li key={item.label}>
              {item.href.startsWith('/') ? (
                <Link to={item.href} className="nav-link" onClick={handleLinkClick}>
                  {item.label}
                </Link>
              ) : (
                <a
                  href={isHomePage ? item.href : '/' + item.href}
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
