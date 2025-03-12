import React, { useEffect } from "react";
import { useWeatherStore } from "../store/weatherStore";

interface WeatherProps {
  lat: number;
  lon: number;
}

const Weather: React.FC<WeatherProps> = ({ lat, lon }) => {
  const { weather, loading, error, fetchWeather } = useWeatherStore();

  useEffect(() => {
    if (lat && lon) {
      fetchWeather(lat, lon);
    }
  }, [lat, lon, fetchWeather]);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {weather ? (
        <div>
          <h3>Weather in {weather.name}</h3>
          <p>🌡️ Temperature: {weather.main.temp}°C</p>
          <p>🌤 Condition: {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="weather icon"
          />
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default Weather;
