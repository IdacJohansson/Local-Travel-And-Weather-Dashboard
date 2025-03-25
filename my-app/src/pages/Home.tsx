import React, { useState } from "react";
import Weather from "../components/Weather/weather";
import TrafficUpdates from "../components/TrafficUpdates/TrafficUpdates";
import styles from "./Home.module.css";
import GetGeolocation from "../components/GetGeolocation/Geolocation";
import OptionalComponent from "../components/OptionalComponent/OptionalComponent";
import { useLocationStore } from "../store/useLocationStore";
import { Link } from "react-router-dom"; // Add this import

const Home: React.FC = () => {
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lon, setLon] = useState<number | undefined>(undefined);
  const { location } = useLocationStore();

  // NOT IN USE
  // const handleLocation = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       setLat(position.coords.latitude);
  //       setLon(position.coords.longitude);
  //     },
  //     (err) => {
  //       console.error("Error fetching location:", err);
  //     }
  //   );
  // };

  return (
    <div className={styles.main}>
      <div className="bg-black text-white flex items-center p-4 shadow-lg w-full justify-between">
        <p className="text-xl font-bold">Logo</p>
        <h1 className="text-2xl font-semibold text-center flex-1">
          Local Travel & Weather Dashboard
        </h1>
      </div>
      {/* <button onClick={handleLocation}>Get Weather</button> NOT IN USE */}
      {/* <Weather lat={location?.latitude} lon={location?.longitude} /> */}

      <div className="flex justify-center items-center gap-8 p-5">
        <GetGeolocation />
        <div className="flex justify-center items-center">
          <Link to="/departures">
            <button className="p-3 bg-blue-500 text-white rounded-md">
              View Transport Departures
            </button>
          </Link>
        </div>
        <Weather lat={lat} lon={lon} />
      </div>

      <div className={styles.sectionThree}>
        <OptionalComponent title="PÅVERKAN" />
        <TrafficUpdates title="TRAFIK HÄNDELSER" />
      </div>
    </div>
  );
};

export default Home;
