/**
 * Weather Service
 * Service to fetch weather data from the weather API
 */

import axios from 'axios';
import { WeatherData, SearchResult, WeatherError } from '../types/weather';

// Weather API configuration
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.weatherapi.com/v1';

/**
 * Get current weather data for the specified location
 * @param query - City name, zip code, or coordinates
 * @returns Weather data for the location
 */
export const getCurrentWeather = async (query: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: query,
        aqi: 'no'
      }
    });

    return {
      location: response.data.location,
      current: response.data.current
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMsg = error.response.data.error?.message || 'Failed to fetch weather data';
      throw new Error(errorMsg);
    }
    throw new Error('Failed to fetch weather data');
  }
};

/**
 * Get current weather based on user's geolocation
 * @returns Weather data for the user's location
 */
export const getWeatherByGeolocation = async (): Promise<WeatherData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weather = await getCurrentWeather(`${latitude},${longitude}`);
          resolve(weather);
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        let errorMessage = 'Failed to get your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        
        reject(new Error(errorMessage));
      }
    );
  });
};

/**
 * Search for locations by query string
 * @param query - Search term (city name)
 * @returns Array of matching locations
 */
export const searchLocations = async (query: string): Promise<SearchResult[]> => {
  try {
    if (!query || query.trim().length < 3) {
      return [];
    }

    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: query
      }
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMsg = error.response.data.error?.message || 'Failed to search locations';
      throw new Error(errorMsg);
    }
    throw new Error('Failed to search locations');
  }
};
