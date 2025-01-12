import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./store/userSlice";
import fetchUserDetails from "./common/fetchUserDetails";
import AxiosToastError from "./utils/AxiosToastError";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
import {
  setCategory,
  setLoadingProduct,
  setProduct,
  setSubCategory,
} from "./store/productCategory";
import { addProductToCart } from "./store/cartSlice";
import GlobalProvider from "./provider/GlobalProvider";
import DisplayCartMobile from "./pages/DisplayCartMobile";

function App() {
  const userData = useSelector((state) => state.userDetails);
  const allCategory = useSelector((state) => state.categoryDetails.allCategory);

  const dispatch = useDispatch();

  const fetchingData = async () => {
    const userNewData = await fetchUserDetails();
    dispatch(setUser(userNewData?.data));
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingProduct(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      const { data: responseData } = response;

      dispatch(setCategory(responseData.data));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      dispatch(setLoadingProduct(false));
    }
  };

  const fetchAllSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });

      const { data: responseData } = response;

      dispatch(setSubCategory(responseData.data));
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProduct,
      });

      const { data: responseData } = response.data;

      dispatch(setProduct(responseData.data));
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    // fetchingData();
    fetchCategory();
    fetchAllSubCategory();
    fetchProduct();
  }, []);
  return (
    <GlobalProvider className="bg-white">
      <Header />
      <main className="min-h-[62vh]">
        <Outlet />
      </main>
      <Footer />
    </GlobalProvider>
  );
}

export default App;
