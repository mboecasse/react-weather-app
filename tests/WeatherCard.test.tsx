import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import WeatherCard from '../src/components/WeatherCard';
import { WeatherData } from '../src/types/weather';

// Mock the formatters module
vi.mock('../src/utils/formatters', () => ({
  formatTemperature: vi.fn((temp) => `${temp}`),
  formatDateTime: vi.fn(() => 'Monday, January 1, 2024, 12:00 PM')
}));

describe('WeatherCard Component', () => {
  const mockWeatherData: WeatherData = {
    location: {
      name: 'London',
      country: 'United Kingdom',
      lat: 51.52,
      lon: -0.11
    },
    current: {
      temp_c: 15,
      temp_f: 59,
      condition: {
        text: 'Partly cloudy',
        icon: 'https://example.com/weather-icon.png',
        code: 1003
      },
      wind_mph: 5,
      wind_kph: 8,
      humidity: 72,
      feelslike_c: 14,
      feelslike_f: 57,
      uv: 4
    }
  };

  it('renders weather card with correct data', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    // Check location information
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('United Kingdom')).toBeInTheDocument();
    
    // Check temperature
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('°C')).toBeInTheDocument();
    
    // Check condition
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
    expect(screen.getByAltText('Partly cloudy')).toBeInTheDocument();
    
    // Check weather details
    expect(screen.getByText('Feels Like')).toBeInTheDocument();
    expect(screen.getByText('14°C')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('72%')).toBeInTheDocument();
    expect(screen.getByText('Wind')).toBeInTheDocument();
    expect(screen.getByText('8 km/h')).toBeInTheDocument();
    expect(screen.getByText('UV Index')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
