import { create } from "zustand";

interface WeatherState {
  weather: any | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (lat: number, lon: number) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  loading: false,
  error: null,
  fetchWeather: async (lat, lon) => {
    set({ loading: true, error: null });
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; 
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (res.ok) {
        set({ weather: data, loading: false });
      } else {
        set({ error: data.message, loading: false });
      }
    } catch (err) {
      set({ error: "Failed to fetch weather", loading: false });
    }
  },
}));
