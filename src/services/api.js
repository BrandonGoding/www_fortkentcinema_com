/**
 * Data Service Layer
 *
 * Fetches movie data from the cinema_sass API (engagements + showtimes endpoints)
 * and transforms responses to match frontend component expectations.
 *
 * To switch back to local JSON data, set USE_API to false.
 */

// Configuration
const USE_API = true;
const API_BASE_URL = 'https://www.leprinceos.com/api/v1';

// Cinema timezone for converting UTC showtimes to local display times
const CINEMA_TIMEZONE = 'America/New_York';

// Import local JSON data (fallback when USE_API is false)
import nowShowingData from '../data/nowShowing.json';
import comingSoonData from '../data/comingSoon.json';
import membershipData from '../data/membership.json';
import siteConfigData from '../data/siteConfig.json';

/**
 * Helper to fetch from the API and unwrap paginated responses
 */
async function apiFetch(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) throw new Error(`API error ${response.status}: ${path}`);
  const data = await response.json();
  // Handle DRF paginated responses (have a "results" key)
  if (data && typeof data === 'object' && Array.isArray(data.results)) {
    return data.results;
  }
  return data;
}

/**
 * Format a UTC datetime string to a local time string (e.g. "6:00 PM")
 */
function formatShowtime(utcDatetime) {
  return new Date(utcDatetime).toLocaleTimeString('en-US', {
    timeZone: CINEMA_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Get the local date string (YYYY-MM-DD) for a UTC datetime in the cinema's timezone
 */
function getLocalDate(utcDatetime) {
  return new Date(utcDatetime).toLocaleDateString('en-CA', {
    timeZone: CINEMA_TIMEZONE,
  });
}

/**
 * Format runtime minutes to a display string (e.g. "2h 16min")
 */
function formatRuntime(minutes) {
  if (!minutes) return '';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}

/**
 * Fetch now showing movies from the engagements + showtimes endpoints.
 * Returns data shaped to match what NowShowing/MovieCard components expect.
 */
export async function getNowShowing() {
  if (!USE_API) {
    return nowShowingData.movies;
  }

  try {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: CINEMA_TIMEZONE });

    // Calculate 7 days from now for the "now showing" window
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const sevenDaysStr = sevenDaysFromNow.toLocaleDateString('en-CA', { timeZone: CINEMA_TIMEZONE });

    // Fetch confirmed engagements active within the next 7 days
    const engagements = await apiFetch(
      `/engagements/?status=CONFIRMED&start_date_before=${sevenDaysStr}&end_date_after=${today}`
    );

    if (!engagements.length) return [];

    // For each engagement, fetch its showtimes (and optionally film details)
    const movies = await Promise.all(
      engagements.map(async (engagement) => {
        // Fetch showtimes — this is the critical data
        let showtimes = [];
        try {
          showtimes = await apiFetch(`/showtimes/?engagement=${engagement.id}&is_cancelled=false`);
        } catch {
          // If showtimes fetch fails, movie will be filtered out below
        }

        // Fetch film details separately — optional, for rating/runtime
        let film = null;
        try {
          film = await apiFetch(`/films/${engagement.film}/`);
        } catch {
          // Film details are optional; engagement already has title and poster
        }

        // Group showtimes by local date
        const showtimesByDate = {};
        showtimes.forEach((st) => {
          const localDate = getLocalDate(st.starts_at);
          const localTime = formatShowtime(st.starts_at);
          if (!showtimesByDate[localDate]) {
            showtimesByDate[localDate] = [];
          }
          showtimesByDate[localDate].push(localTime);
        });

        return {
          id: String(engagement.id),
          title: engagement.film_title,
          rating: film?.rating || '',
          runtime: formatRuntime(film?.runtime_minutes),
          genre: '',
          poster: engagement.film_poster_url || film?.poster_url || '',
          showtimes: showtimesByDate,
          youtube_id: film?.youtube_id || '',
        };
      })
    );

    // Filter out engagements that have no upcoming showtimes
    return movies.filter((m) => Object.keys(m.showtimes).length > 0);
  } catch (err) {
    console.error('Failed to fetch now showing from API, using local data:', err);
    return nowShowingData.movies;
  }
}

/**
 * Fetch coming soon movies from the engagements endpoint.
 * Returns data shaped to match what ComingSoon component expects.
 */
export async function getComingSoon() {
  if (!USE_API) {
    return comingSoonData.movies.map((movie) => {
      if (!movie.releaseDate) return { ...movie, startDate: '' };
      try {
        const now = new Date();
        const parsed = new Date(`${movie.releaseDate} ${now.getFullYear()}`);
        if (isNaN(parsed.getTime())) return { ...movie, startDate: '' };
        // If the month has already passed, assume next year
        if (parsed < new Date(now.getFullYear(), now.getMonth(), 1)) {
          parsed.setFullYear(now.getFullYear() + 1);
        }
        const startDate = parsed.toLocaleDateString('en-CA');
        return { ...movie, startDate };
      } catch {
        return { ...movie, startDate: '' };
      }
    });
  }

  try {
    // Use tomorrow's date for coming soon
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toLocaleDateString('en-CA', { timeZone: CINEMA_TIMEZONE });

    // Fetch confirmed engagements that start tomorrow or later
    const engagements = await apiFetch(
      `/engagements/?status=CONFIRMED&start_date_after=${tomorrowStr}`
    );

    if (!engagements.length) return [];

    // Deduplicate by film (same film might have multiple future engagements)
    const seenFilms = new Set();
    const uniqueEngagements = engagements.filter((e) => {
      if (seenFilms.has(e.film)) return false;
      seenFilms.add(e.film);
      return true;
    });

    // Fetch film details for extra metadata
    const movies = await Promise.all(
      uniqueEngagements.map(async (engagement) => {
        let film = null;
        try {
          film = await apiFetch(`/films/${engagement.film}/`);
        } catch {
          // Use engagement data if film fetch fails
        }

        const releaseDate = new Date(engagement.start_date + 'T12:00:00');
        const formattedDate = releaseDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
        });

        return {
          id: String(engagement.id),
          title: engagement.film_title,
          startDate: engagement.start_date,
          releaseDate: formattedDate,
          genre: '',
          poster: engagement.film_poster_url || film?.poster_url || '',
          description: film?.synopsis || '',
          youtube_id: film?.youtube_id || '',
        };
      })
    );

    return movies;
  } catch (err) {
    console.error('Failed to fetch coming soon from API, using local data:', err);
    return comingSoonData.movies;
  }
}

/**
 * Fetch membership information
 */
export async function getMembership() {
  // Membership data is local-only for now
  return membershipData;
}

/**
 * Fetch site configuration
 */
export async function getSiteConfig() {
  // Site config is local-only for now
  return siteConfigData;
}

/**
 * Fetch a single movie by ID (engagement ID)
 */
export async function getMovieById(id) {
  if (!USE_API) {
    const allMovies = [...nowShowingData.movies, ...comingSoonData.movies];
    return allMovies.find((movie) => movie.id === id) || null;
  }

  try {
    const engagement = await apiFetch(`/engagements/${id}/`);
    const film = await apiFetch(`/films/${engagement.film}/`);
    return {
      id: String(engagement.id),
      title: engagement.film_title,
      rating: film?.rating || '',
      runtime: formatRuntime(film?.runtime_minutes),
      genre: '',
      poster: engagement.film_poster_url || film?.poster_url || '',
    };
  } catch {
    return null;
  }
}

/**
 * Fetch showtimes for a specific engagement
 */
export async function getShowtimes(engagementId) {
  if (!USE_API) {
    const movie = nowShowingData.movies.find((m) => m.id === engagementId);
    return movie?.showtimes || [];
  }

  try {
    const showtimes = await apiFetch(
      `/showtimes/?engagement=${engagementId}&is_cancelled=false`
    );
    // Group by date, same as getNowShowing
    const showtimesByDate = {};
    showtimes.forEach((st) => {
      const localDate = getLocalDate(st.starts_at);
      const localTime = formatShowtime(st.starts_at);
      if (!showtimesByDate[localDate]) {
        showtimesByDate[localDate] = [];
      }
      showtimesByDate[localDate].push(localTime);
    });
    return showtimesByDate;
  } catch {
    return {};
  }
}

/**
 * Fetch showtimes for a calendar month, grouped by day with movie info.
 * Returns { [day: number]: [{ id, title, poster, youtube_id }] }
 */
export async function getCalendarMonth(year, month) {
  if (!USE_API) {
    // For local fallback, place movies on their startDate within this month
    const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
    const map = {};
    const movies = await getComingSoon();
    movies.forEach((movie) => {
      if (!movie.startDate || !movie.startDate.startsWith(monthStr)) return;
      const day = parseInt(movie.startDate.split('-')[2], 10);
      if (isNaN(day)) return;
      if (!map[day]) map[day] = [];
      map[day].push(movie);
    });
    return map;
  }

  try {
    // Build date range for the month (in cinema timezone)
    const startOfMonth = `${year}-${String(month + 1).padStart(2, '0')}-01T00:00:00`;
    const lastDay = new Date(year, month + 1, 0).getDate();
    const endOfMonth = `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}T23:59:59`;

    const showtimes = await apiFetch(
      `/showtimes/?is_cancelled=false&starts_at_after=${startOfMonth}&starts_at_before=${endOfMonth}`
    );

    if (!showtimes.length) return {};

    // Group by day, dedup movies per day
    const map = {};
    showtimes.forEach((st) => {
      if (!st.starts_at) return;
      const localDate = getLocalDate(st.starts_at);
      const day = parseInt(localDate.split('-')[2], 10);
      if (isNaN(day)) return;
      if (!map[day]) map[day] = [];
      const title = st.film_title || '';
      if (!map[day].some((m) => m.title === title)) {
        map[day].push({
          id: `${st.id}`,
          title,
          poster: st.film_poster_url || '',
          youtube_id: st.youtube_id || '',
        });
      }
    });

    return map;
  } catch (err) {
    console.error('Failed to fetch calendar month data:', err);
    return {};
  }
}

export default {
  getNowShowing,
  getComingSoon,
  getCalendarMonth,
  getMembership,
  getSiteConfig,
  getMovieById,
  getShowtimes,
};
