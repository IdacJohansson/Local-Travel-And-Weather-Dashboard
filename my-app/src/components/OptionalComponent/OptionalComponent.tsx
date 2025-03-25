import React from "react";
import { useTrafficStore } from "../../store/useTrafficStore";

type CardProps = {
  title: string;
};

const OptionalComponent = ({ title }: CardProps) => {
  const { getMessageCode } = useTrafficStore(); 

  return (
    <div className="container bg-black text-white rounded-2xl p-4 flex-col gap-4 w-[400px] h-[350px]">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="bg-teal-300 h-[250px] flex flex-col justify-center items-center gap-4">
        <div>
          <p>Stor påverkan: {getMessageCode("Stor påverkan")}</p>
        </div>
        <div>
          <p>Liten påverkan: {getMessageCode("Liten påverkan")}</p>
        </div>
        <div>
          <p>Ingen påverkan: {getMessageCode("Ingen påverkan")}</p>
        </div>
      </div>
    </div>
  );
};

export default OptionalComponent;