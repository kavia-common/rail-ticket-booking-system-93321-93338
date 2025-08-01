import React, { useEffect, useState } from "react";
import BookingList from "../components/BookingList";

// Dummy user bookings
const dummyBookings = [
  {
    bookingId: 10001,
    trainNumber: "IC123",
    from: "Berlin",
    to: "Munich",
    date: "2024-06-23",
    time: "08:00",
    seats: 1,
    status: "Confirmed",
    paid: true,
    price: 36.5,
  },
  {
    bookingId: 10044,
    trainNumber: "RE456",
    from: "Berlin",
    to: "Munich",
    date: "2024-06-28",
    time: "09:45",
    seats: 2,
    status: "Pending",
    paid: false,
    price: 51.6,
  },
];

// PUBLIC_INTERFACE
function DashboardPage({ user }) {
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    // Simulate fetching bookings for this user from backend
    setTimeout(() => setBookings(dummyBookings), 600);
  }, [user]);

  return (
    <div className="page-section">
      <h1>My Bookings</h1>
      <BookingList bookings={bookings} />
    </div>
  );
}

export default DashboardPage;
