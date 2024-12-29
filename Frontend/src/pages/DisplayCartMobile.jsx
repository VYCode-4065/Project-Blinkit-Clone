import React, { useState, useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { DislayPriceInRupees } from "../utils/DisplayPriceInRupee";
import { IoMdArrowDropright } from "react-icons/io";

const DisplayCartMobile = ({ totalQty, totalPrice, displayCart }) => {
  return (
    <section className="flex items-center justify-center lg:hidden">
      <div className="bg-green-700 container   min-h-14 rounded-md px-5 py-2 text-white font-semibold flex items-center justify-between">
        <div className="flex items-center gap-5">
          <BsCart4
            size={35}
            className="p-2 bg-slate-100 text-black font-bold rounded-md"
          />
          <div>
            <p>{totalQty} items</p>
            <p>{DislayPriceInRupees(totalPrice)}</p>
          </div>
        </div>
        <div
          className="text-sm md:text-lg flex items-center "
          onClick={displayCart}
        >
          <p className="cursor-pointer">View cart</p>
          <IoMdArrowDropright size={25} />
        </div>
      </div>
    </section>
  );
};

export default DisplayCartMobile;
