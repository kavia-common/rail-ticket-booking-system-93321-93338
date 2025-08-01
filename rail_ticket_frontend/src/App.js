import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import SearchPage from "./pages/SearchPage";
import BookingPage from "./pages/BookingPage";
import DashboardPage from "./pages/DashboardPage";
import PaymentPage from "./pages/PaymentPage";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  // Auth state (would use context/provider for real app)
  const [user, setUser] = useState(null);

  // Simple theme toggle for demo
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  function handleLogin(userData) {
    setUser(userData);
  }

  // PUBLIC_INTERFACE
  function handleLogout() {
    setUser(null);
  }

  // PUBLIC_INTERFACE
  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <Router>
      <div className="App">
        <Navbar
          user={user}
          onLogout={handleLogout}
          onThemeToggle={toggleTheme}
          theme={theme}
        />
        <div className="main-container">
          <Routes>
            <Route
              path="/"
              element={<SearchPage user={user} />}
            />
            <Route
              path="/login"
              element={
                user ? <Navigate to="/" /> : <AuthPage onLogin={handleLogin} />
              }
            />
            <Route
              path="/book/:trainId"
              element={user ? <BookingPage user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard"
              element={user ? <DashboardPage user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/payment/:bookingId"
              element={user ? <PaymentPage user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
