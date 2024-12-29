import React, { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { generatePageURL } from "../components/GeneratePageUrl";
import { pricewithdiscount } from "../components/pricewithdiscount";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { DislayPriceInRupees } from "../utils/DisplayPriceInRupee";
import { GlobalContextProvider } from "../provider/GlobalProvider";
import toast from "react-hot-toast";
import AddToCartButton from "./AddToCartButton";

const DisplayProduct = ({ p }) => {
  const containerRef = useRef();
  const [addTocart, setAddToCart] = useState(false);

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
            className="min-w-44 min-h-36 flex justify-around flex-col  bg-transparent rounded overflow-y-clip py-2 border shadow shadow-neutral-200"
          >
            <div className="h-28 rounded">
              <img
                src={val?.image[0]}
                alt={val?._id}
                className=" object-scale-down h-full w-full rounded overflow-hidden "
              />
            </div>
            <Link to={url} className="p-2">
              <div className="flex items-center gap-1">
                <p className="bg-green-200 rounded-full w-fit text-sm px-1 m-1 font-medium">
                  10 min
                </p>
                {Boolean(val.discount) && (
                  <p className="text-green-800 bg-white rounded w-fit text-sm px-1 m-1 font-medium text-ellipsis line-clamp-1">
                    {val.discount}% <span>discount</span>
                  </p>
                )}
              </div>
              <p className="text-sm font-medium text-ellipsis line-clamp-2 mt-3">
                {val?.name}
              </p>
              <p className="">{val?.unit}</p>
            </Link>
            <div className="flex items-center justify-between p-2">
              {!Boolean(val.stock) ? (
                <p>₹0</p>
              ) : (
                <p>
                  {DislayPriceInRupees(
                    pricewithdiscount(val?.price, val?.discount)
                  )}
                </p>
              )}
              <div>
                {!Boolean(val.stock) ? (
                  <p className="text-red-400 text-sm  text-center">
                    Out of Stock
                  </p>
                ) : (
                  <AddToCartButton data={val} />
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div className={` lg:flex hidden items-center justify-between w-full`}>
        <button
          className="p-3 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-300 -left-12 absolute"
          onClick={handleLeftArrow}
        >
          <FaAngleLeft size={20} />
        </button>
        <button
          className="p-3 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-300 absolute -right-7"
          onClick={handleRightArrow}
        >
          <FaAngleRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default DisplayProduct;
