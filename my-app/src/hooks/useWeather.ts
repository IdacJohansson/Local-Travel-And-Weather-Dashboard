import { useState } from 'react';
import { getWeather } from "../services/weatherService";

console.log("API Key:", process.env.REACT_APP_WEATHER_API_KEY);

export function useWeather() {
  const [weather, setWeather] = useState(null);
  return weather;
}

