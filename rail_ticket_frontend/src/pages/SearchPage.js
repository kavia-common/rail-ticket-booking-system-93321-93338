import React, { useState } from "react";
import TrainSearchForm from "../components/TrainSearchForm";
import TrainResultsList from "../components/TrainResultsList";

// Dummy search and schedule data
const dummyResults = [
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
function SearchPage({ user }) {
  const [searchParams, setSearchParams] = useState(null);
  const [results, setResults] = useState([]);

  // Simulate async API
  function handleSearch(params) {
    setSearchParams(params);
    setResults([]);
    setTimeout(() => {
      // Would perform real API call and filter by params
      setResults(dummyResults.filter((r) =>
        (!params.from || r.from.toLowerCase().includes(params.from.toLowerCase())) &&
        (!params.to || r.to.toLowerCase().includes(params.to.toLowerCase()))
      ));
    }, 600);
  }

  return (
    <div className="page-section">
      <h1>Find Your Train</h1>
      <TrainSearchForm onSearch={handleSearch} defaultParams={searchParams} />
      <TrainResultsList trains={results} searchParams={searchParams} user={user} />
    </div>
  );
}

export default SearchPage;
