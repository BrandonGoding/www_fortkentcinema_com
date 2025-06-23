import './now_playing.scss';
        import {FaImdb, FaYoutube} from "react-icons/fa";
        import SectionHeading from "../section_heading/section_heading";
        import RedCard from "../red_card/red_card";

        const NowPlaying = ({films}) => {
            const today = new Date();

            // Find films with a current booking
            const nowPlaying = films
                .map(film => {
                    const currentBooking = film.bookings.find(booking => {
                        const start = new Date(booking.booking_start_date);
                        const end = new Date(booking.booking_end_date);
                        return start <= today && end >= today && booking.confirmed;
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

            const filmWithDetails = (movie) => {
                return (
                    <div className="movie-info">
                        <h3>{movie.title}</h3>
                        {/*<p>Rating: {movie?.rating}</p>*/}
                        {/*<p>Running Time: {movie?.length}</p>*/}
                        <div className="movie-links">
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
                    </div>
                );
            };

            return (
                <section className="now-playing">
                    <SectionHeading heading_text="Now Playing"/>
                    <div className="movies-list">
                        {nowPlaying.length === 0 ? (
                            <p>No films currently playing.</p>
                        ) : (
                            nowPlaying.map((movie, idx) => (
                                <RedCard block_content={filmWithDetails(movie)} key={idx}/>
                            ))
                        )}
                    </div>
                </section>
            );
        };

        export default NowPlaying;