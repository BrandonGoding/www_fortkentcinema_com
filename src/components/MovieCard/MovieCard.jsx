import './MovieCard.css';

function MovieCard({ movie, onShowtimeClick }) {
  const handleShowtimeClick = (showtime) => {
    if (onShowtimeClick) {
      onShowtimeClick(movie, showtime);
    }
  };

  return (
    <article className="movie-card">
      <div className="movie-poster">
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
          <div className="poster-placeholder-icon">🎬</div>
          <div className="poster-placeholder-text">Movie Poster</div>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-rating">{movie.rating}</span>
          <span className="movie-runtime">{movie.runtime}</span>
        </div>
        <p className="movie-genre">{movie.genre}</p>
        {movie.showtimes && movie.showtimes.length > 0 && (
          <div className="movie-showtimes">
            {movie.showtimes.map((time) => (
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
