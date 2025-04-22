/**
 * Weather data interfaces
 */

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
}

export interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  humidity: number;
  feelslike_c: number;
  feelslike_f: number;
  uv: number;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherError {
  message: string;
  code?: number;
}

export interface SearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}
