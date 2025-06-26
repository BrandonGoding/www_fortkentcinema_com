import {FaImdb, FaYoutube} from "react-icons/fa";

const NowPlaying = ({films}) => {

    const today = new Date();
    // Find films with a current booking
    const nowPlaying = films
        .map(film => {
            const currentBooking = film.bookings.find(booking => {
                const start = new Date(booking.booking_start_date);
                const end = new Date(booking.booking_end_date);
                return start <= today && end >= today && booking.is_confirmed;
            });
            if (currentBooking) {
                return {
                    ...film,
                    currentBooking
                };
            }
            return null;
        })
        .filter(Boolean);


    return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
              Now Playing at Fort Kent Cinema
            </h2>
            <p className="mt-4 text-lg/8 text-gray-300">Lorem ipsum dolor sit amet consect adipisicing possimus.</p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-2">
            {nowPlaying.map((movie, idx)  => (
              <div key={idx} className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm/6 font-semibold text-gray-300">
                    <img src={movie?.omdb_json?.Poster} alt={`${movie.title} Poster`} className="mx-auto mb-4 rounded-lg max-h-75" />
                    <>
                        <p>Rating: {movie?.omdb_json?.Rated}</p>
                        <p>Running Time: {movie?.omdb_json?.Runtime}</p>
                        <p>Genre: {movie?.omdb_json?.Genre}</p>
                    </>
                <div className="flex justify-center items-center space-x-4 mt-4">
                    {movie.youtube_id && (
                        <a
                            href={`https://www.youtube.com/watch?v=${movie.youtube_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Watch trailer on YouTube"
                        >
                            <FaYoutube size={28} color="#FF0000"/>
                        </a>
                    )}
                    {movie.imdb_id && (
                        <a
                            href={`https://www.imdb.com/title/${movie.imdb_id}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View on IMDb"
                        >
                            <FaImdb size={28} color="#FFD700"/>
                        </a>
                    )}
                </div>


                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white mb-5">
                    {movie.title}
                    <br/>
<small>
  {new Date(movie.currentBooking.booking_start_date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric'  })} -
   {new Date(movie.currentBooking.booking_end_date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', })}
</small>                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
    );
};

export default NowPlaying;