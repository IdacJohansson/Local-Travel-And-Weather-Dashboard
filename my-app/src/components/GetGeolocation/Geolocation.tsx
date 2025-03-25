import { useState, useRef, useEffect } from "react";
import { useWeatherStore } from "../Weather/weatherStore";
import { useTrafficStore } from "../../store/useTrafficStore";
import { useLocationStore } from "../../store/useLocationStore";

const GeolocationApp: React.FC = () => {
  const { fetchWeather } = useWeatherStore(); // add
  const { location, address, setLocation, setAddress } = useLocationStore();
  const { fetchTrafficUpdates } = useTrafficStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (location) {
      // console.log("Location updated, fetching traffic updates...");
      fetchTrafficUpdates();
      fetchWeather(location.latitude, location.longitude); // add
    }
  }, [location, fetchTrafficUpdates, fetchWeather]); // added fetchTrafficUpdates and fetchWeather

  const getLocation = async () => {
    if (address.trim() === "") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            setLocation({ latitude, longitude });
            fetchTrafficUpdates();
            fetchWeather(latitude, longitude); // add
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
          fetchWeather(lat, lon); // add
        } else {
          console.error("Location not found for address:", address);
        }
      } catch (error) {
        console.error("Error fetching location for address:", error);
      }
    }
  };

  // REPLACED WITH useLocationStore

  // const [location, setLocation] = useState<string>('');
  //  const [address, setAddress] = useState<string>('');
  //  const inputRef = useRef<HTMLInputElement>(null);

  //  const getLocation = async () => {
  //   if (address.trim() === '') {
  //  if (navigator.geolocation) {
  //  navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //  const latitude = position.coords.latitude;
  //  const longitude = position.coords.longitude;

  //  setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
  //  fetchWeather(latitude, longitude);
  //   },
  //   () => {
  //  setLocation('Unable to retrieve location.');
  //   }
  //   );
  // } else {
  //   setLocation('Geolocation is not supported by this browser.');
  //   }
  //   } else {
  //  try {
  //  const response = await fetch(
  //  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
  //  address
  //  )}`
  //   );
  //   const data = await response.json();

  //  if (data.length > 0) {
  // const { lat, lon } = data[0];
  // setLocation(
  // `Your Location is ${address} 👉🏻 Latitude: ${lat}, Longitude: ${lon}`
  //  );
  //  fetchWeather(parseFloat(lat), parseFloat(lon));

  // if (inputRef.current) {
  // inputRef.current.value = '';
  //  }
  // setAddress('');
  //  } else {
  // setLocation('Location not found.');
  //  }
  // } catch {
  //  setLocation('Error fetching location.');
  //  }
  //  }
  //  };

  //  return (
  //   <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light text-center p-4">

  //   {/* Search Input with Button */}
  //  <div
  //  className="input-group mb-3"
  //  style={{ maxWidth: '500px', width: '100%' }}
  //  >
  //   <input
  //  ref={inputRef}
  // type="text"
  // placeholder="Search for a location..."
  // value={address}
  // onChange={(e) => setAddress(e.target.value)}
  // className="form-control border-primary shadow-sm"
  // />
  // <button onClick={getLocation} className="mt-3 btn btn-primary">
  //  Get Location
  // </button>
  // </div>
  // {/* Display Location */}
  // <p className="mt-3">{location}</p>
  // </div>
  //  );

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a location..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={getLocation}>Get Location</button>
      <p>
        {location
          ? `Latitude: ${location.latitude}, Longitude: ${location.longitude}`
          : "No location available"}
      </p>
    </div>
  );
};
export default GeolocationApp;
