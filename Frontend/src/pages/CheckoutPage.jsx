import React, { useContext, useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { MdDelete, MdDeliveryDining } from "react-icons/md";
import { DislayPriceInRupees } from "../utils/DisplayPriceInRupee";
import { useSelector } from "react-redux";
import AddAddress from "../components/AddAddress";
import {
  GlobalContext,
  GlobalContextProvider,
} from "../provider/GlobalProvider";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const cartProductList = useSelector((state) => state.cartProductDetails.cart);
  const addressList = useSelector((state) => state.addressDetails.address);
  const totalPrice = useSelector(
    (state) => state.categoryDetails.productTotalPrice
  );

  const { fetchUserAddress, fetchCartProduct } = GlobalContextProvider();

  const [selectedAddress, setSelectedAddress] = useState(0);
  const navigate = useNavigate();

  const handleCashOnDelivery = async () => {
    try {
      const responseOrder = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartProductList,
          addressId: addressList[selectedAddress]?._id,
          totalPrice: totalPrice,
          subTotalPrice: totalPrice,
        },
      });

      const { data: responseDataOrder } = responseOrder;

      if (responseDataOrder.success) {
        toast.success(responseDataOrder.message);
        if (fetchCartProduct) {
          fetchCartProduct();
        }
        navigate("/success", {
          state: {
            text: "COD",
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
      navigate("/cancel");
    }
  };

  const handleOnlinePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

    try {
      toast.loading("Redirecting to payment gateway");
      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartProductList,
          totalAmt: totalPrice,
          addressId: addressList[selectedAddress]._id,
          subTotalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;

      stripe.redirectToCheckout({ sessionId: responseData.id });

      if (fetchCartProduct) {
        fetchCartProduct();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchUserAddress();
  }, [openAddAddress]);

  return (
    <section className="grid lg:grid-cols-3 lg:h-[83vh] px-10 py-5">
      {/* show address and add address */}
      <div className="lg:col-span-2 overflow-auto no-scrollbar">
        <h2 className="px-3 py-1 sticky top-0 bg-white h-10  font-semibold text-lg rounded-md ">
          Choose your Address
        </h2>
        <div className="grid  bg-white lg:px-10  mb-3  py-3 border rounded">
          {addressList?.map((address, index) => {
            return (
              <label
                key={address?._id + index}
                htmlFor={"address" + index}
                className="flex gap-3 p-3 shadow cursor-pointer border-2 rounded mt-3 hover:bg-blue-50"
              >
                <div>
                  <input
                    type="radio"
                    name="address"
                    value={index}
                    id={"address" + index}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                  />
                </div>
                <div>
                  <p>{address.address_line}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.pincode}</p>
                  <p>{address.country}</p>
                  <p>{address.mobile}</p>
                </div>
              </label>
            );
          })}
        </div>
        <div className="px-4 py-2 bg-blue-100 border-2 rounded font-semibold text-center mx-3">
          <button onClick={() => setOpenAddAddress(true)}>Add address</button>
        </div>
      </div>

      {/* show summary details and payment method  */}
      <div className="bg-white grid gap-10 lg:gap-0">
        <div className=" mt-12  px-5 flex  flex-col gap-1   ">
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
              {DislayPriceInRupees(totalPrice + 5 + (totalPrice > 99 ? 0 : 25))}
            </p>
          </div>
        </div>
        <div className="flex items-center flex-col gap-3 w-full px-3">
          <button
            className="bg-orange-400 py-2 rounded font-semibold text-white border-2 border-orange-200 shadow-md w-full"
            onClick={handleOnlinePayment}
          >
            Online Payment{" "}
          </button>
          <button
            onClick={handleCashOnDelivery}
            className="bg-white py-2 rounded font-semibold hover:bg-orange-400 hover:text-white border-2 border-orange-200 shadow-md w-full"
          >
            Cash On Delivery
          </button>
        </div>
      </div>
      {openAddAddress && <AddAddress close={() => setOpenAddAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;
