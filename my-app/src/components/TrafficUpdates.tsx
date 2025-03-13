import { useEffect, useState } from "react";
import { useTrafficStore } from "../store/useTrafficStore";

type CardProps = {
  title: string;
};

const TrafficUpdates = ({ title }: CardProps) => {
  const { trafficUpdates, fetchTrafficUpdates } = useTrafficStore();

  useEffect(() => {
    fetchTrafficUpdates();
  }, []);

  return (
    <div>
      <h2>{title}</h2>
      {trafficUpdates.length > 0 ? (
        <div>
          {trafficUpdates.map((update, index) => (
            <div key={index}>
              <p>{update.Message}</p>
              <p>{update.RoadNumber}</p>
              <p>{update.SeverityText}</p>
              <p>{update.CreationTime}</p>
              <p>{update.LocationDescriptor}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No traffic updates available.</p>
      )}
    </div>
  );
};

export default TrafficUpdates;
