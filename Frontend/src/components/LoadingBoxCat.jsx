import React from "react";
import userMobile from "../hooks/useMobile";

const LoadingBoxCat = () => {
  const loadingArray = new Array(6);

  return (
    <section className="flex items-center gap-3 lg:gap-7 py-4 overflow-x-scroll">
      {loadingArray.fill(null).map((_, index) => {
        return (
          <div
            key={index + "kajf"}
            className=" min-h-60 min-w-44  bg-transparent rounded animate-pulse"
          >
            <div className=" min-h-32 min-w-32 bg-blue-50   rounded "></div>
            <div className="flex  flex-col justify-between gap-2 mt-2">
              <div className="min-h-6 w-24 bg-blue-50 rounded border-gray-300 "></div>
              <div className="min-h-6 w-32 bg-blue-50 rounded border-gray-300  "></div>
              <div className="min-h-6 w-36 bg-blue-50 rounded border-gray-300 "></div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default LoadingBoxCat;
