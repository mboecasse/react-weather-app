/**
 * WeatherCard Component
 * Displays weather information in a card format
 */

import { WeatherData } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import { formatTemperature, formatDateTime } from '../utils/formatters';
import './WeatherCard.css';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  const { location, current } = weather;

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <div className="location-info">
          <h2>{location.name}</h2>
          <p>{location.country}</p>
          <p className="date-time">{formatDateTime(new Date())}</p>
        </div>
        <div className="temperature-display">
          <span className="temperature">{formatTemperature(current.temp_c)}</span>
          <span className="unit">°C</span>
        </div>
      </div>

      <div className="weather-card-body">
        <div className="condition">
          <WeatherIcon condition={current.condition.text} iconUrl={current.condition.icon} />
          <span>{current.condition.text}</span>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">{formatTemperature(current.feelslike_c)}°C</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{current.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{current.wind_kph} km/h</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">UV Index</span>
            <span className="detail-value">{current.uv}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
