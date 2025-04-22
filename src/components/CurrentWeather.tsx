/**
 * CurrentWeather Component
 * Displays current weather information for a location
 */

import { useState, useEffect } from 'react';
import { WeatherData, WeatherError } from '../types/weather';
import { getCurrentWeather, getWeatherByGeolocation } from '../services/weatherService';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';
import './CurrentWeather.css';

const CurrentWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<WeatherError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [useGeolocation, setUseGeolocation] = useState<boolean>(true);

  const fetchWeatherData = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCurrentWeather(query);
      setWeather(data);
    } catch (err) {
      setError({ message: err instanceof Error ? err.message : 'Failed to fetch weather data' });
    } finally {
      setLoading(false);
    }
  };

  const fetchGeolocationWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherByGeolocation();
      setWeather(data);
    } catch (err) {
      setError({ message: err instanceof Error ? err.message : 'Failed to get location weather' });
      // Fall back to default location
      fetchWeatherData('London');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (useGeolocation) {
      fetchGeolocationWeather();
    }
  }, [useGeolocation]);

  const handleLocationSelect = (location: string) => {
    setUseGeolocation(false);
    fetchWeatherData(location);
  };

  const handleRefresh = () => {
    if (useGeolocation) {
      fetchGeolocationWeather();
    } else if (weather?.location) {
      fetchWeatherData(`${weather.location.name}`);
    }
  };

  const handleUseMyLocation = () => {
    setUseGeolocation(true);
  };

  return (
    <div className="current-weather-container">
      <div className="weather-header">
        <h1>Weather App</h1>
        <SearchBar onLocationSelect={handleLocationSelect} />
      </div>

      {loading ? (
        <div className="weather-loading">
          <div className="loading-spinner"></div>
          <p>Loading weather data...</p>
        </div>
      ) : error ? (
        <div className="weather-error">
          <p>{error.message}</p>
          <button onClick={handleUseMyLocation} className="location-button">
            Try using my location
          </button>
        </div>
      ) : weather ? (
        <>
          <WeatherCard weather={weather} />
          <div className="weather-actions">
            <button onClick={handleRefresh} className="refresh-button">
              Refresh
            </button>
            {!useGeolocation && (
              <button onClick={handleUseMyLocation} className="location-button">
                Use my location
              </button>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CurrentWeather;
