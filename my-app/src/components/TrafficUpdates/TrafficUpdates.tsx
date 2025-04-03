import { useEffect } from "react";
import { useTrafficStore } from "../../store/useTrafficStore";
import { useLocationStore } from "../../store/useLocationStore";

import styles from "../TrafficUpdates/TrafficUpdates.module.css";
import TrafficImage from "../TrafficImage";
import CarImage from "../../assets/white-car.png";

type CardProps = {
  title: string;
};

const TrafficUpdates = ({ title }: CardProps) => {
  const { trafficUpdates, fetchTrafficUpdates, getSeverityColor } =
    useTrafficStore();
  const { location } = useLocationStore();

  useEffect(() => {
    if (location) {
      fetchTrafficUpdates();
    }
  }, [location]);

  return (
    <div>
      {trafficUpdates.length > 0 ? (
        <div
          className={`bg-raisinBlack text-white rounded-2xl flex w-[1000px] h-[400px] ${styles.sectionThree}`}
        >
          <div className="flex w-full">
            <div className="flex-1 text-xs p-4">
              <h2 className="text-lg text-center text-white font-bold">
                {title}
              </h2>
              {trafficUpdates.map((update, index) => (
                <div key={index} className="mb-2 mt-5 pb-2">
                  <div className="bg-onyx flex justify-between items-center h-8 px-4">
                    <p className="font-bold">{update.MessageCode}</p>
                    <div className="flex space-x-4 gap-4">
                      <p className={getSeverityColor(update.SeverityText)}>
                        {update.SeverityText}
                      </p>
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
            <div className="bg-onyx rounded-r-2xl p-4 flex justify-center items-center w-1/4">
              <TrafficImage />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-raisinBlack text-white rounded-2xl p-4 flex gap-4 w-[1000px] h-[400px]">
          <div className="flex-1 bg-onyx p-2 rounded-2xl flex justify-center items-center">
            <div className="mb-4 pb-2">
              <div className="flex justify-center items-center h-20 content-center">
                <img
                  className="w-1/2 animate-pulse"
                  src={CarImage}
                  alt="car-image"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrafficUpdates;
