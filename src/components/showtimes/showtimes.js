import React, { useState } from 'react';
  import './showtimes.scss';
import SectionHeading from "../section_heading/section_heading";
import RedCard from "../red_card/red_card";

  const DAYS = ['Thursday', 'Friday', 'Saturday', 'Sunday'];
  const DAY_ABBR = ['Thu', 'Fri', 'Sat', 'Sun'];
  const SHOWTIMES = {
    Thursday: ['6:00 PM'],
    Friday: ['6:00 PM'],
    Saturday: ['3:00 PM', '6:00 PM'],
    Sunday: ['5:00 PM'],
  };

  const getTodayIndex = () => {
    const jsDay = new Date().getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    if (jsDay === 4) return 0; // Thursday
    if (jsDay === 5) return 1; // Friday
    if (jsDay === 6) return 2; // Saturday
    if (jsDay === 0) return 3; // Sunday
    return null; // Mon-Wed
  };

  const Showtimes = () => {
    const todayIndex = getTodayIndex();
    const [selectedDay, setSelectedDay] = useState(todayIndex !== null ? DAYS[todayIndex] : null);

    const showTimesContent = () => {
      return (
          <>
          <div className="showtimes-tabs">
            {DAYS.map((day, i) => (
              <button
                key={day}
                className={selectedDay === day ? 'active' : ''}
                onClick={() => setSelectedDay(day)}
              >
                <span className="showtimes-tab-full">{day}</span>
                <span className="showtimes-tab-abbr">{DAY_ABBR[i]}</span>
              </button>
            ))}
          </div>
          <div className="showtimes-movie">
            {selectedDay === null ? (
              <div className="closed-today">CLOSED MONDAY - WEDNESDAY</div>
            ) : (
              <ul>
                {SHOWTIMES[selectedDay].map((time, index) => (
                  <li key={index} className={time === '3:00 PM' ? 'matinee' : ''}>
                    {time} {time === '3:00 PM' && '( matinee )'}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {selectedDay !== null && (
          <div>Closed Monday - Wednesday</div>
          )}
        </>
      )
    }

    return (
      <section className="showtimes">
        <SectionHeading heading_text="Showtimes" />
        <RedCard block_content={showTimesContent()} />
      </section>
    );
  };

  export default Showtimes;