import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import delivery from "../assets/Best_Prices_Offers.png";
import mindelivery from "../assets/minute_delivery.png";
import itembag from "../assets/Wide_Assortment.png";
import { pricewithdiscount } from "../components/pricewithdiscount";
import { DislayPriceInRupees } from "../utils/DisplayPriceInRupee";
import AddToCartButton from "./AddToCartButton";
const ProductInfoDisplay = () => {
  const params = useParams();
  const [productData, setProductData] = useState({});
  const [img, setImg] = useState(0);
  const [stock, setStock] = useState(0);
  const productId = params.productInfo.split("+").slice(-1)[0];
  const arrowRef = useRef();
  const handleLeftArrow = () => {
    arrowRef.current.scrollLeft -= 100;
  };

  const handleRightArrow = () => {
    arrowRef.current.scrollLeft += 100;
  };

  console.log("product data", productData);

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { _id: productId },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setProductData(responseData.data);
        setStock(productData.stock);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);
  return (
    <section className="bg-white">
      <div className="grid lg:px-24 lg:grid-cols-4 border px-3 lg:p-0">
        <div className="grid col-span-2 h-[83vh] overflow-y-auto no-scrollbar scroll-smooth">
          <div className=" flex items-center flex-col border-r relative">
            <div className="h-[63vh] pt-4 rounded overflow-hidden ">
              <img
                src={productData?.image ? productData?.image[img] : ""}
                alt={productData.name}
                className="h-full w-full object-scale-down overflow-hidden"
              />
            </div>

            <div className="flex items-center justify-center gap-2 pt-4">
              {productData?.image?.map((_, idx) => {
                return (
                  <div
                    key={idx + "productInfo"}
                    className={`min-h-5 min-w-5 ${
                      img == idx ? "bg-slate-300" : "bg-slate-100"
                    } rounded-full w-fit `}
                  ></div>
                );
              })}
            </div>
            <div
              className="flex items-center justify-center gap-2 mt-5 lg:pl-32 pl-52   w-[20vw] overflow-x-auto no-scrollbar scroll-smooth"
              ref={arrowRef}
            >
              {productData?.image?.map((val, idx) => {
                return (
                  <div
                    onClick={() => setImg(idx)}
                    className="min-h-20 min-w-20 max-w-20 max-h-32 bg-slate-800 rounded  cursor-pointer z-10"
                  >
                    <img
                      src={val}
                      alt={val}
                      className=" w-full object-scale-down "
                    />
                  </div>
                );
              })}

              <div className="w-full hidden lg:flex items-center justify-between  shadow shadow-neutral-300">
                <button
                  className="left-[8rem] absolute h-10 w-10 p-2 rounded-full bg-slate-200 hover:bg-slate-400"
                  onClick={handleLeftArrow}
                >
                  <FaAngleLeft className="h-full w-full  " />
                </button>
                <button
                  className=" right-[8rem] h-10 w-10 p-2 absolute rounded-full bg-slate-200 hover:bg-slate-400 text-center"
                  onClick={handleRightArrow}
                >
                  <FaAngleRight className="h-full w-full" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:sticky top-24 h-[83vh] w-full lg:py-16 lg:px-16  col-span-2 ">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold ">{productData.name}</h2>
            <p className=" w-fit bg-slate-100 rounded-lg text-[12px] mt-5">
              10 MINS
            </p>
          </div>
          <hr />
          <div>
            <div className="flex items-center justify-between mt-3">
              <p className="p-1 w-fit text-slate-500 text-sm mt-2">
                {productData.unit}
              </p>
              {stock !== 0 && <AddToCartButton data={productData} />}
            </div>
            <div>
              <h2 className="text-sm ">MRP </h2>
              <div className="flex items-center gap-4">
                <span className="font-semibold mt-2 border border-green-800 w-fit px-3 py-1 rounded bg-slate-100">
                  {DislayPriceInRupees(
                    pricewithdiscount(productData.price, productData.discount)
                  )}
                </span>
                {Boolean(productData.discount) && (
                  <p className="pt-1 line-through">
                    {DislayPriceInRupees(productData.price)}
                  </p>
                )}
                {Boolean(productData.discount) && (
                  <p className="font-bold text-xl text-green-800 ">
                    {productData.discount}%{" "}
                    <span className="text-green-700 ">Discount</span>
                  </p>
                )}
              </div>
              <p className="w-fit text-slate-400 rounded-lg text-[12px]">
                (inclusive of all taxes)
              </p>
              {stock === 0 && (
                <p className="text-red-400 border border-red-400 w-fit rounded px-2 py-1 mt-2">
                  Out of Stock
                </p>
              )}
            </div>
            <hr />
            <div>
              <p className="font-semibold text-neutral-600 mt-7">
                Why shop from blinkit?
              </p>
              <div className="flex items-center gap-5">
                <img
                  src={mindelivery}
                  alt={productData.unit}
                  className="h-16 w-16 object-scale-down  border rounded-full overflow-hidden"
                />
                <div className="text-slate-400 text-[12.8px] my-6">
                  <p className="text-neutral-800 font-medium">
                    Superfast Delivery
                  </p>
                  <p>
                    Get your order delivered to your doorstep at the earliest
                    from dark stores near you.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <img
                  src={delivery}
                  alt={productData.unit}
                  className="h-16 w-16 object-scale-down  border rounded-full overflow-hidden"
                />
                <div className="text-slate-400 text-[12.8px] my-6">
                  <p className="text-neutral-800 font-medium">
                    Best Prices & Offers
                  </p>
                  <p>
                    Best price destination with offers directly from the
                    manufacturers.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <img
                  src={itembag}
                  alt={productData.unit}
                  className="h-16 w-16 object-scale-down  border rounded-full overflow-hidden"
                />
                <div className="text-slate-400 text-[12.8px] my-6">
                  <p className="text-neutral-800 font-medium">
                    Wide Assortment
                  </p>
                  <p>
                    Choose from 5000+ products across food, personal care,
                    household & other categories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full col-span-2 border-r">
          <div className="bg-gray-50 p-6 rounded-lg  w-full ">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Key Features of a Modern Grocery Website
            </h2>
            <div>
              <ol className="list-decimal list-inside space-y-4">
                <li>
                  <span className="font-medium ">User-Friendly Interface</span>
                  <ul className="list-disc list-inside ml-5 text-gray-600 space-y-2">
                    <li>Simple and intuitive navigation.</li>
                    <li>Categorized product lists for easy browsing.</li>
                    <li>
                      Search bar with filters like price, brand, and
                      availability.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium ">Product Management</span>
                  <ul className="list-disc list-inside ml-5 text-gray-600 space-y-2">
                    <li>Real-time inventory updates.</li>
                    <li>Detailed product descriptions with images.</li>
                    <li>
                      Pricing information, including discounts and offers.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium ">
                    Personalized User Experience
                  </span>
                  <ul className="list-disc list-inside ml-5 text-gray-600 space-y-2">
                    <li>
                      User accounts with order history and recommendations.
                    </li>
                    <li>Wishlist and cart functionality.</li>
                    <li>
                      Customizable notifications for deals and restocked items.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium ">
                    Seamless Checkout Process
                  </span>
                  <ul className="list-disc list-inside ml-5 text-gray-600 space-y-2">
                    <li>
                      Multiple payment options (UPI, credit/debit cards, cash on
                      delivery).
                    </li>
                    <li>Secure payment gateway integration.</li>
                    <li>Easy order modifications and cancellation policies.</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium "> Delivery Management</span>
                  <ul className="list-disc list-inside ml-5 text-gray-600 space-y-2">
                    <li>
                      Multiple delivery options, including express delivery.
                    </li>
                    <li>Real-time order tracking.</li>
                    <li>Flexible delivery schedules.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfoDisplay;
