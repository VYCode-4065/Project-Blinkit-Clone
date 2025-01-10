import React, { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [orderData, setOrderData] = useState([]);

  const getMyOrders = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getOrderItems,
      });

      const { data: responseData } = response;

      console.log(responseData);
      if (responseData.success) {
        setOrderData(responseData.data);

        // toast.success(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, []);
  return (
    <section className="min-h-[71vh] h-[71vh]">
      <div className="sticky top-28 lg:top-24 max-h-[calc(100vh-200px)]">
        <div className="bg-neutral-50  shadow-sm shadow-pink-400 p-2 rounded flex items-center justify-between  ">
          <h2 className="font-semibold text-md">My Orders</h2>
        </div>
      </div>
      <div className="">
        {/* {
          orderData[0]?(
            <div><h1>Data hai</h1></div>
          ):(
            <div></div>
          )
        } */}

        <div className="mt-7">
          <h1>Order Summary</h1>
          <div className="bg-blue-50  font-bold p-4 ">
            <img src={""} alt="" />
            <h2>{orderData[0].product_details.name} </h2>
          </div>
        </div>

        {/* <div className="p-3 mt-7 bg-blue-100  rounded border shadow shadow-yellow-200 font-semibold text-md ">
          <h2>No orders was found !</h2>
        </div> */}
      </div>
    </section>
  );
};

export default MyOrders;
