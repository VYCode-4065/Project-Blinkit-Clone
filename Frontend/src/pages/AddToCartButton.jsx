import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import {
  GlobalContext,
  GlobalContextProvider,
} from "../provider/GlobalProvider";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const AddToCartButton = ({ data }) => {
  const cartItem = useSelector((state) => state.cartProductDetails.cart);
  const [isInCart, setIsInCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalQty, setTotalQty] = useState(0);

  const { fetchCartProduct, updateCartProductQty, deleteCartProduct } =
    GlobalContextProvider();

  const handleQtyIncrease = async (dataProductId) => {
    const cartProductValue = cartItem?.find(
      (item) => item?.productId._id === dataProductId
    );

    const cartProductId = cartProductValue?._id;

    const response = await updateCartProductQty(cartProductId, totalQty + 1);
  };
  const handleQtyDecrease = async (dataProductId) => {
    const cartProductValue = cartItem?.find(
      (item) => item?.productId._id === dataProductId
    );

    const cartProductId = cartProductValue?._id;

    if (totalQty === 1) {
      await deleteCartProduct(cartProductId);
      return;
    }
    const response = await updateCartProductQty(cartProductId, totalQty - 1);
  };
  const handleAddToCart = async (id) => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addTocart,
        data: {
          productId: id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartProduct) {
          fetchCartProduct();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isincart = cartItem.some((val) => val.productId._id === data?._id);

    const onlyCartData = cartItem?.find(
      (item) => item?.productId._id === data?._id
    );

    if (onlyCartData) {
      setTotalQty(onlyCartData.quantity);
    }

    setIsInCart(isincart);
  }, [cartItem]);

  return (
    <section>
      {isInCart ? (
        <div className="flex items-center gap-2  px-2 py-1 rounded-lg ">
          <button
            onClick={() => handleQtyIncrease(data?._id)}
            className="bg-green-800 text-white p-1 rounded-sm"
          >
            <FaPlus size={12} />
          </button>
          <p>{totalQty}</p>
          <button
            onClick={() => handleQtyDecrease(data?._id)}
            className="bg-green-800 p-1 rounded-sm text-white"
          >
            <FaMinus size={12} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            handleAddToCart(data?._id);
          }}
          className={`text-green-500    text-medium text-center rounded px-3 py-1 border border-green-400`}
        >
          {loading ? <LoadingSpinner /> : "Add"}
        </button>
      )}
      {/* ) : (
      <div className="flex items-center justify-between ">
        <button className="text-green-500  text-medium text-center rounded px-3 py-1 border border-green-400">
          +
        </button>
        <p>1</p>
        <button className="text-green-500  text-medium text-center rounded px-3 py-1 border border-green-400">
          -
        </button>
      </div>
      ) */}
    </section>
  );
};

export default AddToCartButton;
