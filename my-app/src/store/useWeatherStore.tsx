import { create } from "zustand";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: { description: string; icon: string }[];
}

interface WeatherState {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (lat: number, lon: number) => Promise<void>;  
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  loading: false,
  error: null,

  fetchWeather: async (lat: number, lon: number) => {  
    set({ loading: true, error: null });

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    // console.log("🔑 Loaded API Key:", API_KEY);

    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_URL = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    // console.log("Fetching from:", API_URL);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      // console.log("Weather API Response:", data);

      set({ weather: data, loading: false });
    } catch (error: any) {
      console.error("Fetch error:", error);
      set({ error: error.message, loading: false });
    }
  },
}));
