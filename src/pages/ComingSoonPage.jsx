import React from "react";
import Calendar from "../components/calendar";
import Footer from "../components/footer";
import Header from "../components/header";
import { useComingSoonFilms } from "../hooks/useComingSoonFilms";
import LoadingSpinner from "../components/LoadingSpinner";
import ApiErrorMsg from "../components/ApiErrorMsg";

function formatDateWithOrdinal(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });

  // Helper for ordinal suffix
  function ordinal(n) {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return `${month} ${day}${ordinal(day)}`;
}

const ComingSoonPage = ({ films }) => {
  const { data = [], isLoading, error } = useComingSoonFilms();
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center m-2 ">
        {isLoading && <LoadingSpinner />}
        {error && (
          <ApiErrorMsg error={"Error loading films, please check back later"} />
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((film) => (
              <div
                key={film?.id}
                className="max-w-full sm:max-w-[400px] flex flex-col items-center justify-center p-5 m-2 rounded-lg shadow-md bg-white"
              >
                <div className="border-b border-gray-200 mb-5">
                  <h3 className="text-base font-semibold text-gray-900 text-center">
                    {film?.title}
                  </h3>
                </div>
                <div className="w-full aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${film?.youtube_id}`}
                    title={film?.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="text-center mt-4">
                  {(() => {
                    const now = new Date();
                    const futureBookings = (film.bookings ?? []).filter(
                      (b) => new Date(b.booking_end_date) > now,
                    );
                    const firstBooking = futureBookings[0];
                    return firstBooking
                      ? `Booking: ${formatDateWithOrdinal(firstBooking.booking_start_date)} to ${formatDateWithOrdinal(firstBooking.booking_end_date)}`
                      : "No upcoming bookings";
                  })()}
                </p>
              </div>
            ))}
          </div>
        )}
        <Calendar />
      </div>
      <Footer />
    </>
  );
};

export default ComingSoonPage;
