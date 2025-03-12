import React, { useState } from "react";
import Weather from "../components/Weather";

const Home: React.FC = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);

  const handleFetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleFetchLocation}>Get Weather</button>
      {lat && lon && <Weather lat={lat} lon={lon} />}
    </div>
  );
};

export default Home;
