import React from "react";
import { Link, useLocation } from "react-router-dom";

// PUBLIC_INTERFACE
function Navbar({ user, onLogout, onThemeToggle, theme }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-title">
          🚄 RailTicket
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Search
          </Link>
        </li>
        {user && (
          <li>
            <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
              Dashboard
            </Link>
          </li>
        )}
      </ul>
      <div className="navbar-actions">
        <button
          className="theme-toggle-btn"
          onClick={onThemeToggle}
          aria-label={`Switch theme ${theme === "light" ? "dark" : "light"}`}>
          {theme === "light" ? <span>🌙</span> : <span>☀️</span>}
        </button>
        {user ? (
          <>
            <span className="navbar-user">Hi, {user.name || user.email}</span>
            <button className="btn btn-accent" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login/Register
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
