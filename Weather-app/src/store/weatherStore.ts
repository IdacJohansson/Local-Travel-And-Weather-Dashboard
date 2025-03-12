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
    try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (response.ok) {
        set({ weather: data, loading: false });
      } else {
        set({ error: data.message, loading: false });
      }
    } catch (err) {
      set({ error: "Failed to fetch weather", loading: false });
    }
  },
}));
