import React from 'react';
            import './coming_soon_page.scss';
            import Calendar from "../../components/calendar/calendar";
            import SectionHeading from "../../components/section_heading/section_heading";

            const ComingSoonPage = ({ films }) => {
                const today = new Date();
                const comingSoon = films
                    .filter(film => new Date(film.start) > today)
                    .sort((a, b) => new Date(a.start) - new Date(b.start))
                    .slice(0, 2);

                return (
                    <div className="coming-soon-page">
                        <SectionHeading heading_text="Coming Soon" />
                        <div className="youtube-embeds">
                            {comingSoon.map(link => (
                                <div key={link.youtube_id} className="youtube-embed">
                                    <h3>{link.title}</h3>
                                    <iframe
                                        width="360"
                                        height="203"
                                        src={`https://www.youtube.com/embed/${link.youtubeId}`}
                                        title={link.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ))}
                        </div>
                        <SectionHeading heading_text="For Kent Cinema Calendar" />
                        <Calendar films={films} />
                    </div>
                );
            };

            export default ComingSoonPage;