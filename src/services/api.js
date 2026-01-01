/**
 * Data Service Layer
 *
 * This service abstracts data fetching to make it easy to swap
 * between local JSON files and a remote API in the future.
 *
 * To migrate to an API:
 * 1. Set USE_API to true
 * 2. Update API_BASE_URL to your API endpoint
 * 3. Adjust the fetch calls as needed for your API structure
 */

// Configuration - flip this to true when ready to use a real API
const USE_API = false;
const API_BASE_URL = 'https://api.fortkentcinema.com';

// Import local JSON data
import nowShowingData from '../data/nowShowing.json';
import comingSoonData from '../data/comingSoon.json';
import membershipData from '../data/membership.json';
import siteConfigData from '../data/siteConfig.json';

/**
 * Simulate network delay for development
 * Remove this when using a real API
 */
const simulateDelay = (ms = 100) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Fetch now showing movies
 * @returns {Promise<Array>} Array of currently showing movies
 */
export async function getNowShowing() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/movies/now-showing`);
    if (!response.ok) throw new Error('Failed to fetch now showing movies');
    return response.json();
  }

  await simulateDelay();
  return nowShowingData.movies;
}

/**
 * Fetch coming soon movies
 * @returns {Promise<Array>} Array of upcoming movies
 */
export async function getComingSoon() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/movies/coming-soon`);
    if (!response.ok) throw new Error('Failed to fetch coming soon movies');
    return response.json();
  }

  await simulateDelay();
  return comingSoonData.movies;
}

/**
 * Fetch membership information
 * @returns {Promise<Object>} Membership plans and perks
 */
export async function getMembership() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/membership`);
    if (!response.ok) throw new Error('Failed to fetch membership info');
    return response.json();
  }

  await simulateDelay();
  return membershipData;
}

/**
 * Fetch site configuration
 * @returns {Promise<Object>} Site configuration data
 */
export async function getSiteConfig() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/config`);
    if (!response.ok) throw new Error('Failed to fetch site config');
    return response.json();
  }

  await simulateDelay();
  return siteConfigData;
}

/**
 * Fetch a single movie by ID
 * @param {string} id - Movie ID
 * @returns {Promise<Object|null>} Movie object or null if not found
 */
export async function getMovieById(id) {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  await simulateDelay();
  const allMovies = [...nowShowingData.movies, ...comingSoonData.movies];
  return allMovies.find(movie => movie.id === id) || null;
}

/**
 * Fetch showtimes for a specific movie
 * @param {string} movieId - Movie ID
 * @returns {Promise<Array>} Array of showtime strings
 */
export async function getShowtimes(movieId) {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/movies/${movieId}/showtimes`);
    if (!response.ok) throw new Error('Failed to fetch showtimes');
    return response.json();
  }

  await simulateDelay();
  const movie = nowShowingData.movies.find(m => m.id === movieId);
  return movie?.showtimes || [];
}

// Export all functions as a single object for convenience
export default {
  getNowShowing,
  getComingSoon,
  getMembership,
  getSiteConfig,
  getMovieById,
  getShowtimes,
};
