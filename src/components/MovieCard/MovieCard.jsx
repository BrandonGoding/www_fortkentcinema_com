import './MovieCard.css';

function MovieCard({ movie, showtimes, onShowtimeClick, onTrailerClick }) {
  // Use passed showtimes prop, or fall back to movie.showtimes for backward compatibility
  const displayShowtimes = showtimes || (Array.isArray(movie.showtimes) ? movie.showtimes : []);

  const handleShowtimeClick = (showtime) => {
    if (onShowtimeClick) {
      onShowtimeClick(movie, showtime);
    }
  };

  const hasTrailer = !!movie.youtube_id;

  const handlePosterClick = () => {
    if (hasTrailer && onTrailerClick) {
      onTrailerClick(movie);
    }
  };

  const handlePosterKeyDown = (e) => {
    if (hasTrailer && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handlePosterClick();
    }
  };

  return (
    <article className="movie-card">
      <div
        className={`movie-poster${hasTrailer ? ' movie-poster--playable' : ''}`}
        onClick={hasTrailer ? handlePosterClick : undefined}
        role={hasTrailer ? 'button' : undefined}
        tabIndex={hasTrailer ? 0 : undefined}
        aria-label={hasTrailer ? `Watch ${movie.title} trailer` : undefined}
        onKeyDown={hasTrailer ? handlePosterKeyDown : undefined}
      >
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            className="movie-poster-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="poster-placeholder" style={{ display: movie.poster ? 'none' : 'flex' }}>
          <div className="poster-placeholder-icon" role="img" aria-label="Movie poster placeholder">🎬</div>
          <div className="poster-placeholder-text">Movie Poster</div>
        </div>
        {hasTrailer && (
          <div className="movie-poster-play-overlay">
            <svg className="movie-poster-play-icon" viewBox="0 0 48 48" aria-hidden="true">
              <circle cx="24" cy="24" r="23" fill="rgba(0,0,0,0.6)" stroke="white" strokeWidth="2" />
              <polygon points="19,14 19,34 35,24" fill="white" />
            </svg>
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-rating">{movie.rating}</span>
          <span className="movie-runtime">{movie.runtime}</span>
        </div>
        <p className="movie-genre">{movie.genre}</p>
        {displayShowtimes.length > 0 && (
          <div className="movie-showtimes">
            {displayShowtimes.map((time) => (
              <button
                key={time}
                className="showtime"
                onClick={() => handleShowtimeClick(time)}
              >
                {time}
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default MovieCard;