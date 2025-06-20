import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.scss';
import '../../styles/variables.scss'


const isNowPlaying = (start, end) => {
    const today = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);
    return today >= startDate && today < endDate; // Check if today is within the range
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


const Calendar = ({ films }) => (
  <div className="calendar-container">
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={films}
      height="auto"
      eventContent={renderEventContent}
      eventClassNames="fc-event"
    />
  </div>
);

export default Calendar;