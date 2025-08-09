import {FaAmazon, FaImdb, FaYoutube} from "react-icons/fa";
import { useNowPlayingFilms } from "../hooks/useNowPlayingFilms";
import LoadingSpinner from "./LoadingSpinner";
import ApiErrorMsg from "./ApiErrorMsg";

const NowPlaying = () => {
  const { data = [], isLoading, error } = useNowPlayingFilms();

  const errorMessage = () => {
    return (
      <>
        <span className="font-medium">Unable to retrieve Films</span> We are
        experiencing issues retrieving the films currently playing. Please check
        back later.
      </>
    );
  };

  return (
    <div className="bg-gray-900 py-24 sm:py-32" id="now-playing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
              Now Playing at Fort Kent Cinema
            </h2>
            <p className="mt-4 text-lg/8 text-gray-300">
              Fort Kent Cinema is a cozy, two-screen theater nestled in the
              heart of downtown Fort Kent. Each auditorium offers comfortable
              seating for up to 100 guests, creating an intimate and inviting
              moviegoing experience. Whether you're here for the latest
              blockbuster or a family-friendly adventure, our modern projection
              and sound systems ensure you enjoy every moment. Locally owned and
              operated, we take pride in providing a friendly, welcoming
              environment for our community to relax, snack, and escape into the
              world of film.
            </p>
          </div>

          {isLoading && <LoadingSpinner />}

          {Array.isArray(data) && data.length === 0 && !isLoading && (
            <ApiErrorMsg error={errorMessage()} />
          )}

          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-2">
            {data.map((movie, idx) => (
              <div key={idx} className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm/6 font-semibold text-gray-300">
                  <img
                    src={movie?.omdb_json?.Poster}
                    alt={`${movie?.title} Poster`}
                    className="mx-auto mb-4 rounded-lg max-h-75"
                  />
                  <>
                    <p>Rating: {movie?.omdb_json?.Rated}</p>
                    <p>Running Time: {movie?.omdb_json?.Runtime}</p>
                    <p>Genre: {movie?.omdb_json?.Genre}</p>
                  </>
                  <div className="flex justify-center items-center space-x-4 mt-4">
                    {movie?.youtube_id && (
                      <a
                        href={`https://www.youtube.com/watch?v=${movie?.youtube_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Watch trailer on YouTube"
                      >
                        <FaYoutube size={28} color="#FF0000" />
                      </a>
                    )}
                    {movie?.imdb_id && (
                      <a
                        href={`https://www.imdb.com/title/${movie?.imdb_id}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View on IMDb"
                      >
                        <FaImdb size={28} color="#FFD700" />
                      </a>
                    )}
                    {movie?.prime_link && (
                      <a
                        href={`${movie?.prime_link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Preorder on Prime"
                      >
                        <FaAmazon size={28} color="#FFD700" />
                      </a>
                    )}
                  </div>
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white mb-5">
                  {movie?.title}
                  <br />
                  <small>
                    {new Date(movie?.bookings[0].booking_start_date).toLocaleDateString(
                      "en-US",
                      {
                        month: "numeric",
                        day: "numeric",
                      },
                    )}{" "}
                    -
                    {new Date(movie?.bookings[0].booking_end_date).toLocaleDateString(
                      "en-US",
                      {
                        month: "numeric",
                        day: "numeric",
                      },
                    )}
                  </small>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
