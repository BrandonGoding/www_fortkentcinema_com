import './ComingSoon.css';

function ComingSoon({ movies }) {
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
              <div className="coming-movie-poster">
                {movie.poster ? (
                  <img
                    src={movie.poster}
                    alt={`${movie.title} poster`}
                    className="coming-poster-img"
                  />
                ) : (
                  <div className="coming-poster-placeholder">
                    <span className="coming-poster-icon">🎬</span>
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
    </section>
  );
}

export default ComingSoon;
