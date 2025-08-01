import React, { useState } from "react";

// Dummy API simulation
function fakeAuthApi(type, { email, password, name }) {
  // "register" always succeeds, "login" fails if "user@fail.com"
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (type === "login" && email === "user@fail.com") {
        reject({ message: "Invalid credentials" });
      } else {
        resolve({ name: name || "User", email });
      }
    }, 600);
  });
}

// PUBLIC_INTERFACE
function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSwitch = () => {
    setForm({ email: "", password: "", name: "" });
    setMode((m) => (m === "login" ? "register" : "login"));
    setError("");
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await fakeAuthApi(mode, form);
      onLogin(user);
    } catch (err) {
      setError(err.message || "Authentication error.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        <h2>{mode === "login" ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
            />
          </div>
          {error && <div className="form-error">{error}</div>}
          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
          </button>
        </form>
        <button className="btn btn-link form-switch" onClick={handleSwitch} type="button">
          {mode === "login"
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
