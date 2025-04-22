import { useState, useEffect } from 'react';
import { fetchWeatherByLocation, fetchWeatherByCity } from './services/weatherService';
import { WeatherData } from './types/weather';
import CurrentWeather from './components/CurrentWeather';
import SearchBar from './components/SearchBar';
import './styles/App.css';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get user's location weather on initial load
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await fetchWeatherByLocation(
            position.coords.latitude,
            position.coords.longitude
          );
          setWeather(data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch weather data. Please try searching for a city.');
          setLoading(false);
        }
      },
      () => {
        // If user denies location permission
        setError('Location access denied. Please search for a city to see weather data.');
        setLoading(false);
      }
    );
  }, []);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(`Could not find weather for "${city}". Please try another location.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      
      {loading && <div className="loading">Loading weather data...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && weather && (
        <CurrentWeather weather={weather} />
      )}
    </div>
  );
}

export default App;