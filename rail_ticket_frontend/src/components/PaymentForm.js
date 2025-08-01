import React, { useState } from "react";

// PUBLIC_INTERFACE
function PaymentForm({ onPay, price, user }) {
  const [form, setForm] = useState({
    card: "",
    name: user?.name || "",
    expiry: "",
    cvc: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onPay && onPay(form);
    }, 900);
  }

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Card number</label>
        <input
          type="text"
          name="card"
          inputMode="numeric"
          maxLength={19}
          value={form.card}
          onChange={handleChange}
          required
          placeholder="1234 5678 9012 3456"
          pattern="\d{4} \d{4} \d{4} \d{4}"
        />
      </div>
      <div className="form-row">
        <div className="form-group half">
          <label>Name on Card</label>
          <input
            type="text"
            name="name"
            value={form.name}
            autoComplete="cc-name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group quarter">
          <label>Expiry</label>
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            maxLength={5}
            autoComplete="cc-exp"
            value={form.expiry}
            onChange={handleChange}
            required
            pattern="\d{2}/\d{2}"
          />
        </div>
        <div className="form-group quarter">
          <label>CVC</label>
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            maxLength={4}
            autoComplete="cc-csc"
            value={form.cvc}
            onChange={handleChange}
            required
            pattern="\d{3,4}"
          />
        </div>
      </div>
      <div className="payment-summary">
        Amount to pay: <strong>€{price.toFixed(2)}</strong>
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default PaymentForm;
