import './header.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-content">
                <h1>
                    <Link to="/" className="header-title-link">
                        Fort Kent Cinema
                    </Link>
                </h1>
                <button
                    className="hamburger"
                    aria-label="Toggle menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                <FaBars />
                </button>
                <nav className={`navigation${menuOpen ? ' open' : ''}`}>
                    <Link to="/fort-kent-cinema-blog" className="nav-link" onClick={() => setMenuOpen(false)}>
                        Blog
                    </Link>
                    <Link to="/coming-soon" className="nav-link" onClick={() => setMenuOpen(false)}>
                        Coming Soon
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;