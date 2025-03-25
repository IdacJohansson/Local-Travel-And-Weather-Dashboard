import React, { useState } from "react";
import Weather from "../components/Weather/weather";
import TransportDepartures from "../components/TransportDepartures/TransportDepartures";
import TrafficUpdates from "../components/TrafficUpdates/TrafficUpdates";
import styles from "./Home.module.css";
import GetGeolocation from "../components/GetGeolocation/Geolocation";
import OptionalComponent from "../components/OptionalComponent/OptionalComponent";
import { useLocationStore } from "../store/useLocationStore";

const Home: React.FC = () => {
// NOT IN USE
// const [lat, setLat] = useState<number | undefined>(undefined);
// const [lon, setLon] = useState<number | undefined>(undefined);
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
      <div className={styles.sectionOne}>
        <p>Logo</p>
        <h1>Local Travel & Weather Dashboard</h1>
      </div>
      <GetGeolocation />
      {/* <SearchBox />  NOT IN USE*/} 
      {/* <button onClick={handleLocation}>Get Weather</button> NOT IN USE */}

      <div className={styles.sectionTwo}>
        <TransportDepartures />
        {/* Now Weather uses lat/lon NOT IN USE*/}
        {/* <Weather lat={lat} lon={lon} NOT IN USE/> */}
        <Weather lat={location?.latitude} lon={location?.longitude} />
      </div>

      <div className={styles.sectionThree}>
        <OptionalComponent title="PÅVERKAN" />
        <TrafficUpdates title="TRAFIK HÄNDELSER" />
      </div>
    </div>
  );
};

export default Home;
