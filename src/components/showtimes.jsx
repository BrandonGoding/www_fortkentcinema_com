import React, { useState } from "react";

const DAYS = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_ABBR = ["Wed", "Thu", "Fri", "Sat", "Sun"];
const SHOWTIMES = {
    Wednesday: ["7:30 PM"],
  Thursday: ["7:30 PM"],
  Friday: ["7:30 PM"],
  Saturday: ["3:00 PM", "6:00 PM"],
    Sunday: ["5:00 PM"]
};

const getTodayIndex = () => {
  const jsDay = new Date().getDay();
  if (jsDay === 3) return 0;
  if (jsDay === 4) return 1;
  if (jsDay === 5) return 2;
  if (jsDay === 6) return 3;
  if (jsDay === 0) return 4;
  return null;
};

const Showtimes = () => {
  const todayIndex = getTodayIndex();
  const [selectedDay, setSelectedDay] = useState(
    todayIndex !== null ? DAYS[todayIndex] : null,
  );

  const showTimesContent = () => (
    <div className="">
      <div className="text-center text-sm text-gray-500 mb-2">
        Select a day to view showtimes.
      </div>
      <div className="flex space-x-2 mb-4 justify-center">
        {DAYS.map((day, i) => (
          <button
            key={day}
            className={`px-4 py-2 rounded transition-colors duration-200 text-white
                        ${
                          selectedDay === day &&
                          "!shadow !shadow-black bg-blue-600"
                        }
                          }
                      `}
            onClick={() => setSelectedDay(day)}
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{DAY_ABBR[i]}</span>
          </button>
        ))}
      </div>
      <div>
        {selectedDay === null ? (
          <div className="text-center text-gray-500 font-semibold py-6">
            CLOSED Monday & Tuesday
          </div>
        ) : (
          <ul className="space-y-2 flex flex-col items-center">
            <li className="text-2xl font-extrabold">
              Showtimes for {selectedDay}s
            </li>
            {SHOWTIMES[selectedDay].map((time, index) => (
              <li
                key={index}
                className={`text-lg ${time === "3:00 PM" || time === "2:00 PM" ? "text-blue-600 font-semibold" : ""}`}
              >
                {time}{" "}
                {(time === "3:00 PM" || time === "2:00 PM") && (
                  <span className="text-sm text-gray-500">( matinee )</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedDay !== null && (
        <div className="mt-4 text-center text-xs text-gray-400">
          Closed Monday & Tuesday
        </div>
      )}
    </div>
  );

  return (
    <section className="py-8 flex justify-center flex-col items-center">
      {showTimesContent()}
    </section>
  );
};

export default Showtimes;
