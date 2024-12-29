import { createContext, useContext, useEffect } from "react";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { addProductToCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { addAddress } from "../store/addressSlice";

export const GlobalContext = createContext(null);

export const GlobalContextProvider = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userDetails);

  const fetchCartProduct = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });
      const { data: responseData } = response;
      dispatch(addProductToCart(responseData?.data));
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const updateCartProductQty = async (_id, quantity) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: _id,
          quantity: quantity,
        },
      });

      const { data: responseData } = response;
      console.log(responseData.data);

      if (responseData.success) {
        console.log(responseData.data);
        fetchCartProduct();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const deleteCartProduct = async (_id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: _id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);

        fetchCartProduct();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const fetchUserAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAddress,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        // toast.success(responseData.message);
        dispatch(addAddress(responseData.data));
        // console.log("response data ", responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchCartProduct();
    }
    handleLogout();
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();

    dispatch(addProductToCart([]));
  };
  return (
    <GlobalContext.Provider
      value={{
        fetchCartProduct,
        updateCartProductQty,
        deleteCartProduct,
        fetchUserAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
