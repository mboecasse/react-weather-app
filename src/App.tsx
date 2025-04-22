/**
 * Main App Component
 */

import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for user preference in local storage or system preference
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference !== null) {
      return savedPreference === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
  };

  // Set theme attribute on document when component mounts or darkMode changes
  useState(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  });

  return (
    <div className="app-container">
      <button 
        onClick={toggleDarkMode} 
        className="theme-toggle-button"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
      <main>
        <CurrentWeather />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Weather App - Created with React & TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
