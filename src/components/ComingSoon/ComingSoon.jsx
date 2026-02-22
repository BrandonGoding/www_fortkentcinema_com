import { useState, useEffect, useMemo } from 'react';
import './ComingSoon.css';

function getInitialMonth(movies) {
  if (!movies || !movies.length) return new Date();
  const withDates = movies.filter((m) => m.startDate);
  if (!withDates.length) return new Date();
  const earliest = withDates.reduce((min, m) =>
    m.startDate < min.startDate ? m : min
  );
  const parts = earliest.startDate.split('-').map(Number);
  if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) return new Date();
  return new Date(parts[0], parts[1] - 1, 1);
}

function ComingSoon({ movies = [] }) {
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [calendarMonth, setCalendarMonth] = useState(() => getInitialMonth(movies));

  useEffect(() => {
    if (activeTrailer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeTrailer]);

  // Build a map of day → movies for the current calendar month
  const moviesByDay = useMemo(() => {
    if (!calendarMonth) return {};
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const map = {};
    movies.forEach((movie) => {
      if (!movie.startDate) return;
      const [y, m, d] = movie.startDate.split('-').map(Number);
      if (y === year && m - 1 === month) {
        const day = d;
        if (!map[day]) map[day] = [];
        map[day].push(movie);
      }
    });
    return map;
  }, [movies, calendarMonth]);

  // Calendar grid helpers
  const calendarDays = useMemo(() => {
    if (!calendarMonth) return [];
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    // Leading empty cells
    for (let i = 0; i < firstDay; i++) {
      cells.push({ day: null, key: `empty-${i}` });
    }
    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, key: `day-${d}` });
    }
    return cells;
  }, [calendarMonth]);

  const monthLabel = calendarMonth
    ? calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '';

  const navigateMonth = (delta) => {
    setCalendarMonth((prev) => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() + delta);
      return next;
    });
  };

  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const DAY_NAMES_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <section className="coming-soon" id="coming-soon">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title section-title--red">COMING SOON</h2>
          <p className="section-subtitle">Get excited for these upcoming releases</p>
          <div className="coming-view-toggle">
            <button
              className={`coming-view-btn${viewMode === 'grid' ? ' coming-view-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              title="Grid view"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" />
                <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" />
                <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" />
                <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" />
              </svg>
            </button>
            <button
              className={`coming-view-btn${viewMode === 'calendar' ? ' coming-view-btn--active' : ''}`}
              onClick={() => setViewMode('calendar')}
              aria-label="Calendar view"
              title="Calendar view"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <rect x="3" y="4" width="18" height="17" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {viewMode === 'grid' && (
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
                  <p className="coming-movie-date">{(movie.releaseDate || '').toUpperCase()}</p>
                  <h3 className="coming-movie-title">{movie.title}</h3>
                  <p className="coming-movie-genre">{movie.genre}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        {viewMode === 'calendar' && (
          <div className="coming-calendar">
            <div className="coming-calendar-nav">
              <button
                className="coming-calendar-nav__arrow"
                onClick={() => navigateMonth(-1)}
                aria-label="Previous month"
              >
                &#8249;
              </button>
              <span className="coming-calendar-nav__label">{monthLabel.toUpperCase()}</span>
              <button
                className="coming-calendar-nav__arrow"
                onClick={() => navigateMonth(1)}
                aria-label="Next month"
              >
                &#8250;
              </button>
            </div>

            <div className="coming-calendar-grid">
              {DAY_NAMES.map((name, i) => (
                <div key={name} className="coming-calendar-dayheader">
                  <span className="coming-calendar-dayheader--full">{name}</span>
                  <span className="coming-calendar-dayheader--short">{DAY_NAMES_SHORT[i]}</span>
                </div>
              ))}

              {calendarDays.map((cell) => (
                <div
                  key={cell.key}
                  className={`coming-calendar-cell${cell.day === null ? ' coming-calendar-cell--empty' : ''}${moviesByDay[cell.day] ? ' coming-calendar-cell--has-movie' : ''}`}
                >
                  {cell.day !== null && (
                    <>
                      <span className="coming-calendar-cell__day">{cell.day}</span>
                      {moviesByDay[cell.day] && (
                        <div className="coming-calendar-cell__movies">
                          {moviesByDay[cell.day].map((movie) => (
                            <div
                              key={movie.id}
                              className={`coming-calendar-cell__poster${movie.youtube_id ? ' coming-calendar-cell__poster--playable' : ''}`}
                              title={movie.title}
                              onClick={movie.youtube_id ? () => setActiveTrailer(movie) : undefined}
                              role={movie.youtube_id ? 'button' : undefined}
                              tabIndex={movie.youtube_id ? 0 : undefined}
                              aria-label={movie.youtube_id ? `Watch ${movie.title} trailer` : movie.title}
                              onKeyDown={movie.youtube_id ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTrailer(movie); } } : undefined}
                            >
                              {movie.poster ? (
                                <img src={movie.poster} alt={movie.title} className="coming-calendar-cell__img" />
                              ) : (
                                <div className="coming-calendar-cell__placeholder">🎬</div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
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
