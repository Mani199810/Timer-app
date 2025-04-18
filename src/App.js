import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';

export default function App() {
  const [theme, setTheme] = useState('light');

  // Apply theme to body tag
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">⏱️ Timer App</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/history">History</Link>
              </li>
            </ul>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`btn btn-sm ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
            >
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="container-fluid px-4 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </Router>
  );
}
