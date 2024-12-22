import React, { useRef, useState } from "react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { generatePageURL } from "../components/GeneratePageUrl";

const DisplayProduct = ({ p, hide = false }) => {
  const containerRef = useRef();
  const handleLeftArrow = () => {
    containerRef.current.scrollLeft -= 200;
  };
  const handleRightArrow = () => {
    containerRef.current.scrollLeft += 200;
  };

  return (
    <section
      className="flex items-center gap-3 lg:gap-3 w-[78vw] overflow-x-scroll  py-3 scroll-smooth no-scrollbar"
      ref={containerRef}
    >
      {p?.map((val, index) => {
        const url = `/product/${generatePageURL(val.name)}+${val._id}`;
        return (
          <div
            key={index + "kajf"}
            className="min-w-40 min-h-36 flex justify-around flex-col  bg-transparent rounded overflow-y-clip py-2 border shadow shadow-neutral-200"
          >
            <div className="h-28 rounded">
              <img
                src={val?.image[0]}
                alt={val?._id}
                className=" object-scale-down h-full w-full rounded overflow-hidden "
              />
            </div>
            <Link to={url} className="p-2">
              <p className="bg-green-200 rounded-full w-fit text-sm px-1 m-1 font-medium">
                10 min
              </p>
              <p className="text-sm font-medium text-ellipsis line-clamp-2 mt-3">
                {val?.name}
              </p>
              <p className="">{val?.unit}</p>
            </Link>
            <div className="flex items-center justify-between p-2">
              <p>₹{val?.price}</p>
              <button className="text-green-500  text-medium text-center rounded px-3 py-1 border border-green-400">
                ADD
              </button>
              {/* <div className="flex items-center justify-between ">
                <button className="text-green-500  text-medium text-center rounded px-3 py-1 border border-green-400">
                  +
                </button>
                <p>1</p>
                <button className="text-green-500  text-medium text-center rounded px-3 py-1 border border-green-400">
                  -
                </button>
              </div> */}
            </div>
          </div>
        );
      })}
      <div
        className={`absolute lg:flex hidden items-center justify-between w-[78vw] `}
      >
        <button
          className="p-3 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-300 left-0"
          onClick={handleLeftArrow}
        >
          <FaAngleLeft size={20} />
        </button>
        <button
          className="p-3 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-300 right-0"
          onClick={handleRightArrow}
        >
          <FaAngleRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default DisplayProduct;
