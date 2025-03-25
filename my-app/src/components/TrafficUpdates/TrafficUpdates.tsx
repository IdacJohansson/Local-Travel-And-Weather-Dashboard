import { useEffect } from "react";
import { useTrafficStore } from "../../store/useTrafficStore";
import { useLocationStore } from "../../store/useLocationStore";

import styles from "../TrafficUpdates/TrafficUpdates.module.css";

type CardProps = {
  title: string;
};

const TrafficUpdates = ({title}: CardProps) => {
  const { trafficUpdates, fetchTrafficUpdates, getSeverityColor } = useTrafficStore();
  const { location } = useLocationStore();

  useEffect(() => {
    if (location) {
      console.log("Location is set, fetching traffic updates...", location);
      fetchTrafficUpdates();
    }
  }, [location]);

  return (
    <div>
      {trafficUpdates.length > 0 ? (
        <div className={`bg-black text-black rounded-2xl p-4 flex gap-4 w-[1000px] h-[400px] ${styles.sectionThree}`}>
          {/* Föräldradivelement för vänster och höger kolumn */}
          <div className="flex w-full">
            {/* Vänsterkolumn */}
            <div className="flex-1 bg-gray-200 text-xs p-4">
              <h2 className="text-lg text-white font-bold mb-4">{title}</h2>
              {trafficUpdates.map((update, index) => (
                <div key={index} className="mb-2 mt-2 border-b pb-2">
                  <div className="bg-white flex justify-between items-center h-8 px-4">
                    <p className="font-bold">{update.MessageCode}</p>
                    <div className="flex space-x-4 gap-4">
                      <p className={getSeverityColor(update.SeverityText)}>{update.SeverityText}</p>
                      <p>{new Date(update.CreationTime).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-left px-4 mt-2">
                    <p>{update.Message}</p>
                    <div className="flex mt-1">
                      <p>
                        <span className="font-bold">Plats: </span>
                        {update.LocationDescriptor}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Högerkolumn (bild) */}
            <div className="bg-teal-300 p-4 flex justify-center items-center w-1/3">
              {/* <TrafficImage /> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black text-black rounded-2xl p-4 flex gap-4 w-[1000px] h-[350px]">
          <div className="flex-1 bg-gray-200 p-4 flex justify-center items-center">
            <div className="mb-4 border-b pb-2">
              <div className="flex justify-center items-center h-20 content-center">
                <p className="text-xl font-bold mb-4 animate-bounce">TRAFIK HÄNDELSER!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrafficUpdates;