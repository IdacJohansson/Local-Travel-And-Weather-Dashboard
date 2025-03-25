import React from 'react'
import MapPicture from '../assets/map.png';

const TrafficImage = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <img
        src={MapPicture}
        alt="Traffic Image"
        className="w-full max-w-2xl rounded-lg shadow-lg object-cover"
      />
    </div>
  )
}

export default TrafficImage