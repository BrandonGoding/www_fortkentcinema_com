import React from 'react';
    import FullCalendar from '@fullcalendar/react';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import './calendar.scss';
    import '../../styles/variables.scss';

    const isNowPlaying = (start, end) => {
        const today = new Date();
        const startDate = new Date(start);
        const endDate = new Date(end);
        return today >= startDate && today < endDate;
    };

    const renderEventContent = (eventInfo) => {
        const isPlaying = isNowPlaying(eventInfo.event.start, eventInfo.event.end);
        const title = isPlaying ? `${eventInfo.event.title} (Now Playing)` : eventInfo.event.title;
        return (
            <div>
                <b>{title}</b>
            </div>
        );
    };

    const addOneDay = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
};

const getCalendarEvents = (films) => {
    return films.flatMap(film =>
        film.bookings
            .filter(booking => booking.is_confirmed)
            .map(booking => ({
                title: film.title,
                start: booking.booking_start_date,
                end: addOneDay(booking.booking_end_date),
                allDay: true,
                filmId: film.id,
                bookingId: booking.id,
            }))
    );
};

    const Calendar = ({ films }) => (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={getCalendarEvents(films)}
                height="auto"
                eventContent={renderEventContent}
                eventClassNames="fc-event"
            />
        </div>
    );

    export default Calendar;