import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function BookingList({ bookings }) {
  if (!bookings)
    return <div className="results-placeholder">Loading bookings...</div>;
  if (bookings.length === 0)
    return <div className="results-placeholder">You have no bookings yet.</div>;

  return (
    <table className="bookings-table">
      <thead>
        <tr>
          <th>Train</th>
          <th>From</th>
          <th>To</th>
          <th>Date</th>
          <th>Time</th>
          <th>Seats</th>
          <th>Status</th>
          <th>Paid</th>
          <th>Price (€)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          <tr key={b.bookingId}>
            <td>{b.trainNumber}</td>
            <td>{b.from}</td>
            <td>{b.to}</td>
            <td>{b.date}</td>
            <td>{b.time}</td>
            <td>{b.seats}</td>
            <td>
              {b.status === "Confirmed" ? (
                <span className="label-success">{b.status}</span>
              ) : (
                <span className="label-pending">{b.status}</span>
              )}
            </td>
            <td>
              {b.paid ? (
                <span className="label-success">Yes</span>
              ) : (
                <span className="label-danger">No</span>
              )}
            </td>
            <td>{b.price.toFixed(2)}</td>
            <td>
              {!b.paid && (
                <Link to={`/payment/${b.bookingId}`} className="btn btn-accent btn-small">
                  Pay Now
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookingList;
