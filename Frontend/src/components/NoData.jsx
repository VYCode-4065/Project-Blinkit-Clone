import React from "react";
import nothing from "../assets/nothing_here.webp";

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src={nothing} alt="No data" className="w-56 object-fit" />
      <p className="text-neutral-500">Not data</p>
    </div>
  );
};

export default NoData;
