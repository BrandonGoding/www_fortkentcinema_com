import { useState, useEffect } from 'react';
import './ComingSoon.css';

function ComingSoon({ movies }) {
  const [activeTrailer, setActiveTrailer] = useState(null);

  useEffect(() => {
    if (activeTrailer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeTrailer]);

  return (
    <section className="coming-soon" id="coming-soon">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title section-title--red">COMING SOON</h2>
          <p className="section-subtitle">Get excited for these upcoming releases</p>
        </div>

        <div className="coming-movies-grid">
          {movies.map((movie) => (
            <article key={movie.id} className="coming-movie-card">
              <div
                className={`coming-movie-poster${movie.youtube_id ? ' coming-movie-poster--playable' : ''}`}
                onClick={movie.youtube_id ? () => setActiveTrailer(movie) : undefined}
                role={movie.youtube_id ? 'button' : undefined}
                tabIndex={movie.youtube_id ? 0 : undefined}
                aria-label={movie.youtube_id ? `Watch ${movie.title} trailer` : undefined}
                onKeyDown={movie.youtube_id ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTrailer(movie); } } : undefined}
              >
                {movie.poster ? (
                  <img
                    src={movie.poster}
                    alt={`${movie.title} poster`}
                    className="coming-poster-img"
                  />
                ) : (
                  <div className="coming-poster-placeholder">
                    <span className="coming-poster-icon" role="img" aria-label="Movie poster placeholder">🎬</span>
                  </div>
                )}
                {movie.youtube_id && (
                  <div className="coming-poster-play-overlay">
                    <svg className="coming-poster-play-icon" viewBox="0 0 48 48" aria-hidden="true">
                      <circle cx="24" cy="24" r="23" fill="rgba(0,0,0,0.6)" stroke="white" strokeWidth="2" />
                      <polygon points="19,14 19,34 35,24" fill="white" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="coming-movie-info">
                <p className="coming-movie-date">{movie.releaseDate.toUpperCase()}</p>
                <h3 className="coming-movie-title">{movie.title}</h3>
                <p className="coming-movie-genre">{movie.genre}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeTrailer && (
        <div className="coming-trailer-overlay" role="dialog" aria-label={`${activeTrailer.title} trailer`}>
          <div className="coming-trailer-content">
            <button
              className="coming-trailer-close"
              onClick={() => setActiveTrailer(null)}
              aria-label="Close trailer"
            >
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                <line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="20" y1="4" x2="4" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className="coming-trailer-player">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeTrailer.youtube_id}?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
                title={`${activeTrailer.title} trailer`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ComingSoon;