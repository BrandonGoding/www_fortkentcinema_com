const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.fortkentcinema.com";
const BLOGROLL_URL = `${API_BASE_URL}/api/v1/blog/`;
const BLOG_BY_SLUG_URL = `${API_BASE_URL}/api/v1/blog/`;
const NOW_PLAYING_URL = `${API_BASE_URL}/api/v1/films/now-playing/`;
const ALL_FILMS_URL = `${API_BASE_URL}/api/v1/films/`;
const COMING_SOON_URL = `${API_BASE_URL}/api/v1/films/coming-soon/`;

const COMING_SOON_CALENDAR_URL = `${API_BASE_URL}/api/v1/films/coming-soon/calendar/`;

export {BLOG_BY_SLUG_URL, BLOGROLL_URL, NOW_PLAYING_URL, ALL_FILMS_URL, COMING_SOON_URL, COMING_SOON_CALENDAR_URL}