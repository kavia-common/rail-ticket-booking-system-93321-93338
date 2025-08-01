import React, { useState } from "react";

// PUBLIC_INTERFACE
function BookingForm({ onSubmit, maxSeats, price, user }) {
  const [form, setForm] = useState({
    seats: 1,
    passengerName: user?.name || "",
    info: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.type === "number"
        ? Math.max(1, Math.min(Number(e.target.value), maxSeats))
        : e.target.value,
    }));
  }

  function handleBooking(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSubmit && onSubmit(form);
    }, 600);
  }

  return (
    <form className="booking-form" onSubmit={handleBooking}>
      <div className="form-group">
        <label>Passenger Name</label>
        <input
          type="text"
          name="passengerName"
          value={form.passengerName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Number of Seats</label>
        <input
          type="number"
          name="seats"
          value={form.seats}
          min={1}
          max={maxSeats}
          onChange={handleChange}
          required
        />
        <span className="seat-note">({maxSeats} seats available)</span>
      </div>
      <div className="form-group">
        <label>Notes (optional)</label>
        <input
          type="text"
          name="info"
          value={form.info}
          onChange={handleChange}
          placeholder="Special requests, etc."
        />
      </div>
      <div className="booking-summary">
        <span>
          Total Price: <strong>€{(price * form.seats).toFixed(2)}</strong>
        </span>
      </div>
      <button className="btn btn-accent btn-block" type="submit" disabled={loading}>
        {loading ? "Booking..." : "Book Now"}
      </button>
    </form>
  );
}

export default BookingForm;
