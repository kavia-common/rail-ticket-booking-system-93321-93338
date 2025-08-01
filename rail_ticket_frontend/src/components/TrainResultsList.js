import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function TrainResultsList({ trains, searchParams, user }) {
  if (!searchParams)
    return <div className="results-placeholder">Fill the search form above to see results.</div>;
  if (!trains || trains.length === 0)
    return <div className="results-placeholder">No trains found for given route or time.</div>;

  return (
    <div className="results-section">
      <h3>Available Trains</h3>
      <table className="results-table">
        <thead>
          <tr>
            <th>Train</th>
            <th>From</th>
            <th>To</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Seats</th>
            <th>Price (€)</th>
            <th>Book</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((t) => (
            <tr key={t.id}>
              <td>
                <span title={t.name}>
                  {t.trainNumber}
                </span>
              </td>
              <td>{t.from}</td>
              <td>{t.to}</td>
              <td>{t.departure}</td>
              <td>{t.arrival}</td>
              <td>{t.availableSeats}</td>
              <td>{t.price.toFixed(2)}</td>
              <td>
                {user ? (
                  <Link to={`/book/${t.id}`} className="btn btn-accent btn-small">
                    Book
                  </Link>
                ) : (
                  <span className="hint-text">Login to Book</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainResultsList;
