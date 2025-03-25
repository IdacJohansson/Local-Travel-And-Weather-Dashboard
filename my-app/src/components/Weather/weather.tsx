import React, { useEffect } from "react";
import { useWeatherStore } from "./weatherStore";
import styles from "./weather.module.css";

console.log("API Key:", process.env.REACT_APP_WEATHER_API_KEY);

interface WeatherProps {
  lat?: number;
  lon?: number;
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
    <div className="bg-black text-black rounded-2xl p-4 flex gap-4 w-[500px] h-[200px]">
      {weather ? (
        <div className="flex w-full">
          <div className="text-center bg-white flex justify-between items-center h-8 px-4  h-[170px] ">
            <h3>Weather in {weather.name}</h3>
            <p>🌡️ Temperature: {weather.main.temp}°C</p>
            <p>🌤 Condition: {weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

{
  
}

export default Weather;
