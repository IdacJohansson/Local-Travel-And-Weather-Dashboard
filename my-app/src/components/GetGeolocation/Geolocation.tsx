import { useState, useRef, useEffect } from "react";
import { useWeatherStore } from "../Weather/weatherStore";
import { useTrafficStore } from "../../store/useTrafficStore";
import { useLocationStore } from "../../store/useLocationStore";

const GeolocationApp: React.FC = () => {
  const { fetchWeather } = useWeatherStore();
  const { location, address, setLocation, setAddress } = useLocationStore();
  const { fetchTrafficUpdates } = useTrafficStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (location) {
      fetchTrafficUpdates();
      fetchWeather(location.latitude, location.longitude);
    }
  }, [location, fetchTrafficUpdates, fetchWeather]);

  const getLocation = async () => {
    if (address.trim() === "") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            setLocation({ latitude, longitude });
            fetchTrafficUpdates();
            fetchWeather(latitude, longitude);
          },
          () => console.error("Unable to retrieve location.")
        );
      } else {
        console.error("Geolocation is not supported.");
      }
    } else {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        const [location] = await response.json();
        if (location) {
          const { lat, lon } = location;
          setLocation({
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
          });
          setAddress("");
          fetchTrafficUpdates();
          fetchWeather(lat, lon);
        } else {
          console.error("Location not found for address:", address);
        }
      } catch (error) {
        console.error("Error fetching location for address:", error);
      }
    }
  };

  return (
    <div className="text-black w-[500px] mt-4">
      <div className="flex items-center content-center gap-1">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a location..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-[400px] p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={getLocation}
          className="w-[180px] p-2 bg-onyx text-white rounded-lg hover:bg-raisinBlack transition"
        >
          Get Location
        </button>
      </div>
    </div>
  );
};
export default GeolocationApp;
