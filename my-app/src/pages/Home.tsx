import React, { useState } from "react";
import Weather from "../components/Weather/weather";
import SearchBox from "../components/SearchBox/SearchBox";
import TransportDepartures from "../components/TransportDepartures/TransportDepartures";
import TrafficUpdates from "../components/TrafficUpdates/TrafficUpdates";
import styles from "./Home.module.css";


const Home: React.FC = () => {
  const [lat, setLat] = useState<number | undefined>(undefined);
const [lon, setLon] = useState<number | undefined>(undefined);

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      (err) => {
        console.error("Error fetching location:", err);
      }
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.sectionOne}>
        <p>Logo</p>
        <h1>Local Travel & Weather Dashboard</h1>
      </div>
      <SearchBox />
      <button onClick={handleLocation}>Get Weather</button>

      <div className={styles.sectionTwo}>
        <TransportDepartures />
        {/* Now Weather uses lat/lon */}
        <Weather lat={lat} lon={lon} />
      </div>

      <div className={styles.sectionThree}>
        <div>OPTIONAL COMPONENT</div>
        <TrafficUpdates />
      </div>
    </div>
  );
};

export default Home;