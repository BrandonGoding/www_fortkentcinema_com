import React from 'react';
                import './coming_soon_page.scss';
                import Calendar from "../../components/calendar/calendar";
                import SectionHeading from "../../components/section_heading/section_heading";

                const ComingSoonPage = ({ films }) => {
                    const today = new Date();

                    // Flatten all bookings with film info
                    const allBookings = films.flatMap(film =>
                        film.bookings.map(booking => ({
                            ...booking,
                            film
                        }))
                    );

                    // Filter and sort upcoming bookings
                    const upcomingBookings = allBookings
                        .filter(booking => new Date(booking.booking_start_date) > today)
                        .sort((a, b) => new Date(a.booking_start_date) - new Date(b.booking_start_date))
                    .slice(0, 3); // Limit to 5 upcoming bookings

                    return (
                        <div className="coming-soon-page">
                            <SectionHeading heading_text="Coming Soon" />
                            <div className="youtube-embeds">
                                {upcomingBookings.map(booking => (
                                    <div key={booking.film.id + booking.booking_start_date} className="youtube-embed">
                                        <h3>{booking.film.title}</h3>
                                        <iframe
                                            width="360"
                                            height="203"
                                            src={`https://www.youtube.com/embed/${booking.film.youtube_id}`}
                                            title={booking.film.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                        <p>
                                            Booking: {booking.booking_start_date} to {booking.booking_end_date}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <SectionHeading heading_text="For Kent Cinema Calendar" />
                            <Calendar films={films} />
                        </div>
                    );
                };

                export default ComingSoonPage;