import React, { useEffect } from "react";
import { useWeatherStore } from "./weatherStore";
import WeatherImage from "../../assets/white-lightning.png";

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
    <div className="bg-raisinBlack text-black rounded-2xl p-4 flex gap-4 w-[510px] h-[300px]">
      {weather ? (
        <div className="flex w-full">
          <div className="text-white flex-col justify-between items-center h-8 px-4 h-[170px] ">
            <h2 className="text-xl">
              <span className="font-bold text-left">WEATHER IN:</span>{" "}
              {weather.name}
            </h2>

            <div className="flex justify-center text-center gap-4 mt-4">
              <div className="bg-onyx rounded-2xl flex flex-col gap-2 items-center justify-center w-[220px] h-[200px]">
                <div className="text-5xl">🌡️ </div>

                <div className="mt-3">
                  <p>
                    <span className="font-bold">Temperature:</span>{" "}
                    {weather.main.temp}°C
                  </p>
                </div>
              </div>

              <div className="bg-onyx rounded-2xl flex flex-col gap-2 items-center justify-center w-[220px] h-[200px]">
                <div className="flex-col items-center justify-center">
                  <p>
                    <span className="font-bold"> Condition:</span>{" "}
                    {weather.weather[0].description}
                  </p>
                  <div className="flex items-center justify-center">
                    <img
                      className="w-[90px] h-[90px]"
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                      alt="weather icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-raisinBlack text-white rounded-2xl flex gap-4 w-[510px] h-[170px]">
          <div className="flex-1 bg-onyx flex justify-center items-center h-[250px] rounded-2xl mt-2">
            <div className="">
              <div className="flex justify-center items-center content-center">
                {/* <p className="text-xl font-bold animate-bounce border-b ">
                  WEATHER!
                </p> */}
                <img className="w-1/2 animate-pulse" src={WeatherImage} alt="car-image" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

{
}

export default Weather;
