/**
 * Formatters
 * Utility functions for formatting data
 */

/**
 * Format temperature value by rounding to nearest integer
 * @param temp Temperature value
 * @returns Formatted temperature string
 */
export const formatTemperature = (temp: number): string => {
  return Math.round(temp).toString();
};

/**
 * Format a date to a readable string
 * @param date Date to format
 * @returns Formatted date string
 */
export const formatDateTime = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format wind direction from degrees to cardinal direction
 * @param degrees Wind direction in degrees
 * @returns Cardinal direction (N, NE, E, etc.)
 */
export const formatWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * Format UV index with a description
 * @param uv UV index value
 * @returns Formatted UV index with description
 */
export const formatUVIndex = (uv: number): string => {
  let description = 'Low';
  
  if (uv >= 11) {
    description = 'Extreme';
  } else if (uv >= 8) {
    description = 'Very High';
  } else if (uv >= 6) {
    description = 'High';
  } else if (uv >= 3) {
    description = 'Moderate';
  }
  
  return `${uv} (${description})`;
};
