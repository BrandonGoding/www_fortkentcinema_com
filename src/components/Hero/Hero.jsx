import './Hero.css';

function Hero({ config }) {
  const { cinema } = config;

  // Generate bulbs for the marquee
  const topBulbs = Array.from({ length: 17 }, (_, i) => i);
  const sideBulbs = Array.from({ length: 5 }, (_, i) => i);

  return (
    <section className="hero">
      <div className="hero-background" />
      <div className="hero-stars" />
      <div className="hero-pines" />
      <div className="hero-snow" />
      <div className="light-spill" />

      {/* Main Marquee Sign */}
      <div className="marquee-container">
        <div className="marquee-outer">
          {/* Bulbs - Top */}
          <div className="marquee-bulbs-top">
            {topBulbs.map((i) => (
              <span key={`top-${i}`} className="bulb" />
            ))}
          </div>

          {/* Bulbs - Bottom */}
          <div className="marquee-bulbs-bottom">
            {topBulbs.map((i) => (
              <span key={`bottom-${i}`} className="bulb" />
            ))}
          </div>

          {/* Bulbs - Left */}
          <div className="marquee-bulbs-left">
            {sideBulbs.map((i) => (
              <span key={`left-${i}`} className="bulb" />
            ))}
          </div>

          {/* Bulbs - Right */}
          <div className="marquee-bulbs-right">
            {sideBulbs.map((i) => (
              <span key={`right-${i}`} className="bulb" />
            ))}
          </div>

          <div className="marquee-inner">
            <h1 className="marquee-title">{cinema.name.toUpperCase()}</h1>
            <p className="marquee-subtitle">★ {cinema.tagline.toUpperCase()} ★</p>
          </div>
        </div>
      </div>

      <div className="hero-tagline">
        <p>"{cinema.heroQuote}"</p>
      </div>

      <div className="hero-cta">
        <a href="#now-showing" className="btn btn-ticket">View Showtimes</a>
        <a href="#membership" className="btn btn-secondary">Join Membership</a>
      </div>
    </section>
  );
}

export default Hero;
