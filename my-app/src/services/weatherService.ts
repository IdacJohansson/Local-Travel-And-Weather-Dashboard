const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


export const fetchWeather = async (lat: number, lon: number) => {
  const response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};
