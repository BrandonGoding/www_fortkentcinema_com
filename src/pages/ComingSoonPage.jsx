import React from "react";
import Calendar from "../components/calendar";
import { useTitle } from "../hooks/useTitle";
import Footer from "../components/footer";
import Header from "../components/header";

const ComingSoonPage = ({ films }) => {
  useTitle("Films Coming to Fort Kent Cinema");
  const today = new Date();

  // Flatten all bookings with film info
  const allBookings = films.flatMap((film) =>
    film.bookings.map((booking) => ({
      ...booking,
      film,
    })),
  );

  // Filter and sort upcoming bookings
  const upcomingBookings = allBookings
    .filter((booking) => new Date(booking.booking_start_date) > today)
    .sort(
      (a, b) => new Date(a.booking_start_date) - new Date(b.booking_start_date),
    )
    .slice(0, 3); // Limit to 3 upcoming bookings

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center m-2 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingBookings.map((booking) => (
            <div
              key={booking.film.id + booking.booking_start_date}
              className="max-w-full sm:max-w-[400px] flex flex-col items-center justify-center p-5 m-2 rounded-lg shadow-md bg-white"
            >
              <div className="border-b border-gray-200 mb-5">
                <h3 className="text-base font-semibold text-gray-900 text-center">
                  {booking.film.title}
                </h3>
              </div>
              <div className="w-full aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${booking.film.youtube_id}`}
                  title={booking.film.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-center mt-4">
                Booking: {booking.booking_start_date} to{" "}
                {booking.booking_end_date}
              </p>
            </div>
          ))}
        </div>
        <Calendar films={films} />
      </div>
      <Footer />
    </>
  );
};

export default ComingSoonPage;
