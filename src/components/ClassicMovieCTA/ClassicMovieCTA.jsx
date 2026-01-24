import { Link } from 'react-router-dom';
import './ClassicMovieCTA.css';

function ClassicMovieCTA() {
  return (
    <section className="classic-movie-cta">
      <div className="classic-movie-cta__content">
        <h2 className="classic-movie-cta__title">PRIVATE RENTALS</h2>
        <p className="classic-movie-cta__details">
          Birthday parties, private screenings, gaming events &amp; more
        </p>
        <Link to="/rentals" className="btn btn-secondary classic-movie-cta__btn">
          Learn More
        </Link>
      </div>
    </section>
  );
}

export default ClassicMovieCTA;
