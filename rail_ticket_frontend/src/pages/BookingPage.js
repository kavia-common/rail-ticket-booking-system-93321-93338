import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";

// Dummy function to get a train by id (normally this would be via API)
const dummyTrainData = [
  {
    id: 1,
    trainNumber: "IC123",
    name: "InterCity Sunrise",
    departure: "08:00",
    arrival: "12:30",
    from: "Berlin",
    to: "Munich",
    availableSeats: 18,
    price: 36.5,
  },
  {
    id: 2,
    trainNumber: "RE456",
    name: "Regional Star",
    departure: "09:45",
    arrival: "14:10",
    from: "Berlin",
    to: "Munich",
    availableSeats: 7,
    price: 25.8,
  },
];

// PUBLIC_INTERFACE
function BookingPage({ user }) {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const train = dummyTrainData.find((t) => String(t.id) === String(trainId));

  const [done, setDone] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  function handleBooking(details) {
    // Simulate booking (API)
    const newBookingId = Math.floor(Math.random() * 100000) + 1000;
    setTimeout(() => {
      setBookingId(newBookingId);
      setDone(true);
    }, 900);
  }

  if (!train) return <div className="page-section">No train data found.</div>;

  if (done && bookingId) {
    // Show confirmation & payment CTA
    return (
      <div className="page-section">
        <div className="success-card">
          <h2>Booking Confirmed!</h2>
          <p>
            Your seat on <strong>{train.trainNumber} ({train.name})</strong> is reserved.
          </p>
          <p>
            Please proceed to payment to complete your booking.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/payment/${bookingId}`)}
          >
            Go to Payment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section">
      <h2>
        Booking: {train.trainNumber} ({train.name})
      </h2>
      <div className="booking-meta">
        {train.from} → {train.to} | Departure: {train.departure}, Arrival: {train.arrival}
      </div>
      <BookingForm onSubmit={handleBooking} maxSeats={train.availableSeats} price={train.price} user={user} />
    </div>
  );
}

export default BookingPage;
