import './Footer.css';

function Footer({ config }) {
  const { cinema, hours, social } = config;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-logo">{cinema.name.toUpperCase()}</h3>
            <p className="footer-tagline">"{cinema.tagline}"</p>
            <address className="footer-address">
              {cinema.address.street}<br />
              {cinema.address.city}, {cinema.address.state} {cinema.address.zip}<br />
              <a href={`tel:${cinema.phone.replace(/[^0-9]/g, '')}`} className="footer-phone">
                {cinema.phone}
              </a>
            </address>
          </div>

          {/*<div className="footer-column">*/}
          {/*  <h4 className="footer-heading">QUICK LINKS</h4>*/}
          {/*  <ul className="footer-links">*/}
          {/*    <li><a href="#now-showing">Now Showing</a></li>*/}
          {/*    <li><a href="#coming-soon">Coming Soon</a></li>*/}
          {/*    <li><a href="#tickets">Buy Tickets</a></li>*/}
          {/*    <li><a href="#gift-cards">Gift Cards</a></li>*/}
          {/*  </ul>*/}
          {/*</div>*/}

          {/*<div className="footer-column">*/}
          {/*  <h4 className="footer-heading">ABOUT US</h4>*/}
          {/*  <ul className="footer-links">*/}
          {/*    <li><a href="#about">Our Story</a></li>*/}
          {/*    <li><a href="#membership">Membership</a></li>*/}
          {/*    <li><a href="/blog">Blog</a></li>*/}
          {/*    <li><a href="#contact">Contact</a></li>*/}
          {/*  </ul>*/}
          {/*</div>*/}

          {/*<div className="footer-column">*/}
          {/*  <h4 className="footer-heading">BOX OFFICE HOURS</h4>*/}
          {/*  <p className="footer-hours">*/}
          {/*    {hours.weekday.days}<br />*/}
          {/*    {hours.weekday.open} - {hours.weekday.close}<br /><br />*/}
          {/*    {hours.weekend.days}<br />*/}
          {/*    {hours.weekend.open} - {hours.weekend.close}*/}
          {/*  </p>*/}
          {/*</div>*/}
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} {cinema.name}. All rights reserved. Made with ❤️ in Maine.
          </p>
          <div className="footer-social">
            {social.facebook && (
              <a href={social.facebook} className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                f
              </a>
            )}
            {social.instagram && (
              <a href={social.instagram} className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                ig
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                x
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
