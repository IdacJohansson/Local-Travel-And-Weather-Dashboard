import React from "react";
import MapPicture from "../assets/map.png";

const TrafficImage = () => {
  return (
    <div className="flex justify-center items-center p-5">
      <img
        src={MapPicture}
        alt="Traffic Image"
        className="w-[150px] h-[150px] object-cover"
      />
    </div>
  );
};

export default TrafficImage;
