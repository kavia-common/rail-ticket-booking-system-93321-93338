import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";

// Dummy lookup for demo - usually you'd fetch via bookingId and API
const lookupBooking = (id) => ({
  bookingId: id,
  bookingRef: "#" + id,
  trainNumber: "RE456",
  price: 25.8,
  seats: 2,
  paid: false,
});

// PUBLIC_INTERFACE
function PaymentPage({ user }) {
  const { bookingId } = useParams();
  const booking = lookupBooking(bookingId);
  const [paid, setPaid] = useState(booking.paid);

  function handlePayment(form) {
    setTimeout(() => {
      setPaid(true);
    }, 900);
  }

  return (
    <div className="page-section">
      <h2>Payment – Booking Ref {booking.bookingRef}</h2>
      <div className="payment-summary">
        <div>Train: <b>{booking.trainNumber}</b></div>
        <div>Seats: <b>{booking.seats}</b></div>
        <div>Total: <b>€{booking.price.toFixed(2)}</b></div>
      </div>
      {paid ? (
        <div className="success-card">
          <h3>Payment Successful!</h3>
          <p>Your booking is now confirmed and paid. <span role="img" aria-label="ticket">🎟️</span></p>
        </div>
      ) : (
        <PaymentForm onPay={handlePayment} price={booking.price} user={user} />
      )}
    </div>
  );
}

export default PaymentPage;
