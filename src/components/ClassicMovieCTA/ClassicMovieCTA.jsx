import './ClassicMovieCTA.css';

function ClassicMovieCTA() {
  return (
    <section className="classic-movie-cta">
      <div className="classic-movie-cta__content">
        <h2 className="classic-movie-cta__title">CLASSIC MOVIE NIGHT</h2>
        <p className="classic-movie-cta__details">
          <span className="classic-movie-cta__day">Every Tuesday</span>
          <span className="classic-movie-cta__separator">•</span>
          <span className="classic-movie-cta__time">6:30 PM</span>
        </p>
        <p className="classic-movie-cta__pricing">Admission is only $5, Free for Members</p>
      </div>
    </section>
  );
}

export default ClassicMovieCTA;