import React, { useState } from "react";
import Weather from "../components/Weather/weather";
import TrafficUpdates from "../components/TrafficUpdates/TrafficUpdates";
import styles from "./Home.module.css";
import GetGeolocation from "../components/GetGeolocation/Geolocation";
import OptionalComponent from "../components/OptionalComponent/OptionalComponent";
import { Link } from "react-router-dom"; // Add this import
import Logo from "../assets/logo-map-pin.png";

const Home: React.FC = () => {
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lon, setLon] = useState<number | undefined>(undefined);

  return (
    <div className={styles.main}>
      <header className="bg-black text-white flex flex-col items-center p-4 shadow-lg w-full h-[150px]">
        <div className="flex w-full justify-between">
          <img className="h-[50px] w-[30px] ml-2" src={Logo} alt="" />
          <h1 className="text-4xl font-semibold text-center flex-1 mr-5">
            Local Travel & Weather Dashboard
          </h1>
        </div>
        <div className="mt-4 w-full flex justify-center">
          <GetGeolocation />
        </div>
      </header>

      <div className={styles.sectionTwo}>
        <div className="flex justify-center items-center">
          <div className="bg-raisinBlack text-black rounded-2xl p-4 flex gap-4 w-[860px] h-[300px]">
            <div className="flex flex-col gap-2 items-center justify-center w-[830px] h-[270px]">
              <Link to="/departures">
                <button className="p-3 bg-onyx hover:bg-gray-500 transition text-white rounded-md shadow-lg">
                  View Transport Departures
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Weather lat={lat} lon={lon} />
      </div>

      <div className={styles.sectionThree}>
        <OptionalComponent title="IMPACT" />
        <TrafficUpdates title="TRAFIC INCIDENTS" />
      </div>
    </div>
  );
};

export default Home;
