import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Nav.css';

function Nav({ config }) {
  const { cinema, navigation } = config;
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleNavClick = (e, item) => {
    // For hash links, handle based on current page
    if (!isHomePage && item.href.startsWith('#')) {
      e.preventDefault();
      navigate('/' + item.href);
    }
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">{cinema.name.toUpperCase()}</Link>
        <ul className="nav-links">
          {navigation.map((item) => (
            <li key={item.label}>
              {item.href.startsWith('/') ? (
                <Link to={item.href} className="nav-link">
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
