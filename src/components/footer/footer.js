import './footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Fort Kent Cinema</p>
                <div className="social-links">
                    <a href="https://www.facebook.com/FortKentCinema/" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.instagram.com/fortkentcinema/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://github.com/BrandonGoding/fortkent_cinema" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.youtube.com/@FortKentCinema" target="_blank" rel="noopener noreferrer">YouTube</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;