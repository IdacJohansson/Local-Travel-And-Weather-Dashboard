import React from "react";
import { useTrafficStore } from "../../store/useTrafficStore";
import TrafficSignImage from "../../assets/white-traffic-sign.png";

type CardProps = {
  title: string;
};

const OptionalComponent = ({ title }: CardProps) => {
  const { trafficUpdates, getSeverityCount, getSeverityColor } =
    useTrafficStore();

  return (
    <div className="container bg-raisinBlack rounded-2xl  text-white text-center p-4 flex-col w-[400px] h-[400px]">
      {trafficUpdates.length > 0 ? (
        <>
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <div className="bg-onyx rounded-2xl text-lg h-[300px] flex flex-col justify-center items-center gap-4">
            <div className="w-[200px] h-[40px] shadow-xl flex justify-center items-center">
              <p className="font-bold">
                Very high:{" "}
                <span
                  className={
                    getSeverityCount("Mycket stor påverkan") > 0
                      ? getSeverityColor("Mycket stor påverkan")
                      : "text-white"
                  }
                >
                  {getSeverityCount("Mycket stor påverkan")}
                </span>
              </p>
            </div>
            <div className="w-[200px] h-[40px] shadow-xl flex justify-center items-center">
              <p className="font-bold">
                High: {""}
                <span
                  className={
                    getSeverityCount("Stor påverkan") > 0
                      ? getSeverityColor("Stor påverkan")
                      : "text-white"
                  }
                >
                  {getSeverityCount("Stor påverkan")}
                </span>
              </p>
            </div>
            <div className="w-[200px] h-[40px] shadow-xl flex justify-center items-center">
              <p className="font-bold">
                Low: {""}
                <span
                  className={
                    getSeverityCount("Liten påverkan") > 0
                      ? getSeverityColor("Liten påverkan")
                      : "text-white"
                  }
                >
                  {getSeverityCount("Liten påverkan")}
                </span>
              </p>
            </div>
            <div className="w-[200px] h-[40px] shadow-xl flex justify-center items-center">
              <p className="font-bold">
                No: {""}
                <span
                  className={
                    getSeverityCount("Ingen påverkan") > 0
                      ? getSeverityColor("Ingen påverkan")
                      : "text-white"
                  }
                >
                  {getSeverityCount("Ingen påverkan")}
                </span>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-onyx p-4 flex justify-center items-center w-full h-full">
          <img
            className="w-1/2 animate-pulse"
            src={TrafficSignImage}
            alt="car-image"
          />
        </div>
      )}
    </div>
  );
};

export default OptionalComponent;
