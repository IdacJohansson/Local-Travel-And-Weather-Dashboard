import { useState } from 'react';

export function useWeather() {
  const [weather, setWeather] = useState(null);
  return weather;
}

