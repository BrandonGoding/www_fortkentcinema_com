import { useState, useMemo } from 'react';
import MovieCard from '../MovieCard';
import './NowShowing.css';

// Cinema timezone for date comparisons
const CINEMA_TIMEZONE = 'America/New_York';

function getTodayInEastern() {
  return new Date().toLocaleDateString('en-CA', { timeZone: CINEMA_TIMEZONE });
}

function NowShowing({ movies, onShowtimeClick }) {
  const [selectedDate, setSelectedDate] = useState(() => {
    return getTodayInEastern();
  });

  // Get all available dates from all movies (today or later only)
  const availableDates = useMemo(() => {
    const today = getTodayInEastern();
    const datesSet = new Set();

    movies.forEach((movie) => {
      if (movie.showtimes && typeof movie.showtimes === 'object') {
        Object.keys(movie.showtimes).forEach((date) => {
          if (date >= today) {
            datesSet.add(date);
          }
        });
      }
    });

    return Array.from(datesSet).sort();
  }, [movies]);

  // Get movies with showtimes for the selected date
  const moviesForDate = useMemo(() => {
    return movies
      .map((movie) => {
        const showtimesForDate =
          movie.showtimes && typeof movie.showtimes === 'object'
            ? movie.showtimes[selectedDate] || []
            : [];
        return {
          ...movie,
          showtimesForDate,
        };
      })
      .filter((movie) => movie.showtimesForDate.length > 0);
  }, [movies, selectedDate]);

  const currentDateIndex = availableDates.indexOf(selectedDate);
  const canGoPrev = currentDateIndex > 0;
  const canGoNext = currentDateIndex < availableDates.length - 1;

  const handlePrevDate = () => {
    if (canGoPrev) {
      setSelectedDate(availableDates[currentDateIndex - 1]);
    }
  };

  const handleNextDate = () => {
    if (canGoNext) {
      setSelectedDate(availableDates[currentDateIndex + 1]);
    }
  };

  const formatDate = (dateString) => {
    const todayStr = getTodayInEastern();

    if (dateString === todayStr) {
      return 'Today';
    } else {
      const date = new Date(dateString + 'T12:00:00');
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        timeZone: CINEMA_TIMEZONE,
      });
    }
  };

  return (
    <section className="now-showing" id="now-showing">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">NOW SHOWING</h2>
          <p className="section-subtitle">Currently playing at Fort Kent Cinema</p>
        </div>

        <div className="date-nav">
          <button
            className="date-nav__arrow"
            onClick={handlePrevDate}
            disabled={!canGoPrev}
            aria-label="Previous day"
          >
            <span aria-hidden="true">&#8249;</span>
          </button>
          <span className="date-nav__current">{formatDate(selectedDate)}</span>
          <button
            className="date-nav__arrow"
            onClick={handleNextDate}
            disabled={!canGoNext}
            aria-label="Next day"
          >
            <span aria-hidden="true">&#8250;</span>
          </button>
        </div>

        {moviesForDate.length > 0 ? (
          <div className="movies-grid">
            {moviesForDate.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showtimes={movie.showtimesForDate}
                onShowtimeClick={onShowtimeClick}
              />
            ))}
          </div>
        ) : (
          <div className="no-showtimes">
            <p>No showtimes available for this date.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default NowShowing;
