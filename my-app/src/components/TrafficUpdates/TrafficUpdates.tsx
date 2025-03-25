import { useEffect } from "react";
import { useTrafficStore } from "../../store/useTrafficStore";
import { useLocationStore } from "../../store/useLocationStore";

import styles from "../TrafficUpdates/TrafficUpdates.module.css";
import TrafficImage from "../TrafficImage";


const TrafficUpdates = () => {
  const { trafficUpdates, fetchTrafficUpdates } = useTrafficStore();
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
        <div className="bg-black text-black rounded-2xl p-4 flex gap-4 w-[1000px] h-[350px]">
          {/*  Vänsterkolumn */}
          <div className="flex-1 bg-gray-200 text-xs p-4">
            {trafficUpdates.map((update, index) => (
              <div key={index} className="mb-4 border-b pb-2">
                <div className="bg-white flex justify-between items-center h-8 px-4">
                <p className="font-bold">{update.MessageCode}</p>
                <div className="flex space-x-4">
                <p>{update.SeverityText}</p>
                <p>Uppdaterad: {new Date(update.CreationTime).toLocaleString()}</p>
                </div>
                </div>
                <div className=" flex justify-between items-center h-8 px-4">
                <p>{update.Message}</p>
                <p>Plats: {update.LocationDescriptor}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Högerkolumn */}
          <div className="bg-teal-300 p-4 flex justify-center items-center flex-none w-1/3">
            <TrafficImage />
          </div>
        </div>
      ) : (
        <p>No traffic updates available.</p>
      )}
    </div>
  );
};

export default TrafficUpdates;