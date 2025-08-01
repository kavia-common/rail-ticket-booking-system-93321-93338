import React, { useState } from "react";

// PUBLIC_INTERFACE
function TrainSearchForm({ onSearch, defaultParams = null }) {
  const [form, setForm] = useState(
    defaultParams || { from: "", to: "", date: "", time: "" }
  );

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSearch) {
      onSearch(form);
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        name="from"
        type="text"
        placeholder="From: Station"
        value={form.from}
        onChange={handleChange}
        required
      />
      <input
        name="to"
        type="text"
        placeholder="To: Station"
        value={form.to}
        onChange={handleChange}
        required
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        name="time"
        type="time"
        value={form.time}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
}

export default TrainSearchForm;
