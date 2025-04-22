# Weather App

A simple weather application that displays current temperature and conditions for a user's location. Users can also search for weather in other cities.

## Features

- Display current weather conditions for user's location
- Search for weather in any city
- Show temperature, humidity, wind speed, and other conditions
- Responsive design for mobile and desktop
- TypeScript for type safety

## Getting Started

1. Clone this repository
2. Run `npm install` to install dependencies
3. Create a free account at [OpenWeatherMap](https://openweathermap.org/) and get an API key
4. Create a `.env` file in the root directory with your API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
5. Run `npm run dev` to start the development server
6. Open your browser to http://localhost:5173

## Technologies Used

- React 18
- TypeScript
- Vite
- CSS Modules
- OpenWeatherMap API

## Project Structure

- `/src/components` - React components
- `/src/services` - API integration
- `/src/types` - TypeScript interfaces
- `/src/utils` - Utility functions
- `/tests` - Test files
