import React, { useState } from "react";
import { IoMdArrowDropright, IoMdClose } from "react-icons/io";
import watch from "../assets/minute.png";
import { DislayPriceInRupees } from "../utils/DisplayPriceInRupee";
import { pricewithdiscount } from "../components/pricewithdiscount";
import AddToCartButton from "./AddToCartButton";
import { FaBook } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import emtpybucket from "../assets/empty_bucket.jpg";
import CheckoutPage from "./CheckoutPage";
import { useNavigate } from "react-router-dom";

const DisplayCartItem = ({ data, close, totalQty, totalPrice }) => {
  const navigate = useNavigate();

  const redirectToCheckout = () => {
    close();
    navigate("/checkout");
  };
  return (
    <section className="fixed left-0 right-0 top-0 bottom-0 bg-neutral-900 bg-opacity-80  flex justify-end h-full ">
      <div className="h-full w-full lg:w-96  bg-blue-50 relative">
        <div className="sticky top-0 h-16 flex items-center justify-between  bg-white font-semibold px-5 z-10">
          <p>My Cart</p>
          <button className="">
            <IoMdClose size={25} onClick={close} />
          </button>
        </div>
        {data[0] ? (
          <div className="h-svh ">
            <div className="bg-white mt-2 w-full h-full overflow-y-auto no-scrollbar pb-36">
              <div className="flex items-center gap-2  py-2 px-5">
                <img src={watch} alt="clock" className="h-12 w-12" />
                <div>
                  <p className="font-semibold text-sm">
                    Delivery in 10 minutes{" "}
                  </p>
                  <p className="text-neutral-500 text-xs">
                    Shipment of {totalQty} Items
                  </p>
                </div>
              </div>
              <div>
                {data?.map((val, index) => {
                  return (
                    <div
                      key={index + "cartItem"}
                      className="flex items-center justify-evenly gap-2 border  py-2"
                    >
                      <img
                        src={val.productId.image[0]}
                        alt=""
                        className="h-16 rounded"
                      />
                      <div className="text-xs text-slate-800">
                        <p className="text-ellipsis line-clamp-2 w-36">
                          {val.productId.name}
                        </p>
                        <p>{val.productId.unit}</p>
                        <p className="font-semibold p-2 text-black">
                          {DislayPriceInRupees(
                            pricewithdiscount(
                              val.productId.price,
                              val.productId.discount
                            )
                          )}
                        </p>
                      </div>
                      <div className="justify-self-end">
                        <AddToCartButton data={val.productId} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="px-5 flex  flex-col gap-1 border shadow-md py-3">
                <h2 className="font-semibold">Bill details </h2>
                <div className="text-xs flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FaBook />
                    <p>Items total </p>
                  </div>
                  <p>{DislayPriceInRupees(totalPrice)}</p>
                </div>
                <div className="text-xs flex items-center justify-between ">
                  <div className="flex items-center gap-1">
                    <MdDeliveryDining size={18} />
                    <p>Delivery charge </p>
                  </div>
                  <div>
                    {totalPrice < 99 ? (
                      <p>₹ 25.00</p>
                    ) : (
                      <p className="text-blue-400 font-semibold">
                        <span className="line-through text-neutral-800 mr-3">
                          ₹ 25
                        </span>{" "}
                        FREE
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-xs flex items-center justify-between ">
                  <div className="flex items-center gap-1">
                    <GiShoppingBag size={15} />
                    <p>Handling charge </p>
                  </div>
                  <p>{DislayPriceInRupees(5)}</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold justify-between mt-7">
                  <h2 className="">Grand Total </h2>
                  <p>
                    {DislayPriceInRupees(
                      totalPrice + 5 + (totalPrice > 99 ? 0 : 25)
                    )}
                  </p>
                </div>
                <div className=" px-2 mt-5">
                  <h2 className="font-semibold ">Cancelation Policy</h2>
                  <p className="text-neutral-700 text-xs">
                    Orders cannot be cancelled once packed for delivery. In case
                    of unexpected delays, a refund will be provided, if
                    applicable.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute right-1 left-3 bottom-5">
              <div className="px-3 py-2 flex items-center justify-between  bg-[#0C831F] rounded text-white font-semibold">
                <div>
                  <p className="text-sm ">
                    {DislayPriceInRupees(
                      totalPrice + 5 + (totalPrice > 99 ? 0 : 25)
                    )}
                  </p>
                  <p className="text-center text-xs text-neutral-300">TOTAL</p>
                </div>
                <div>
                  <button
                    onClick={redirectToCheckout}
                    className="flex items-center "
                  >
                    Proceed to Pay
                    <span>
                      <IoMdArrowDropright size={25} />{" "}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col h-[88vh] bg-white my-2 ">
            <img
              src={emtpybucket}
              alt={"empty bucket"}
              className="h-60 w-60 rounded"
            />
            <p className="text-lg font-bold mt-5 ml-14">Empty Bucket</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;
