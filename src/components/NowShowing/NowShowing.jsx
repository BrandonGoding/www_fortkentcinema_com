import MovieCard from '../MovieCard';
import './NowShowing.css';

function NowShowing({ movies, onShowtimeClick }) {
  return (
    <section className="now-showing" id="now-showing">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">NOW SHOWING</h2>
          <p className="section-subtitle">Currently playing at Fort Kent Cinema</p>
        </div>

        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onShowtimeClick={onShowtimeClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NowShowing;
