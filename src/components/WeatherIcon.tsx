/**
 * WeatherIcon Component
 * Displays an icon representing the current weather condition
 */

import './WeatherIcon.css';

interface WeatherIconProps {
  condition: string;
  iconUrl: string;
}

const WeatherIcon = ({ condition, iconUrl }: WeatherIconProps) => {
  // Use the API-provided icon if available
  if (iconUrl && iconUrl.startsWith('http')) {
    return (
      <div className="weather-icon">
        <img 
          src={iconUrl} 
          alt={condition} 
          className="condition-icon" 
        />
      </div>
    );
  }

  // Fallback to a simple icon based on weather condition
  const getIconClass = () => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower')) {
      return 'icon-rainy';
    } else if (conditionLower.includes('snow') || conditionLower.includes('sleet') || conditionLower.includes('ice')) {
      return 'icon-snowy';
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return 'icon-cloudy';
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      return 'icon-stormy';
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      return 'icon-foggy';
    } else if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return 'icon-sunny';
    } else {
      return 'icon-default';
    }
  };

  return (
    <div className={`weather-icon ${getIconClass()}`}>
      <div className="icon"></div>
    </div>
  );
};

export default WeatherIcon;
