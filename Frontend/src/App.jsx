import { Outlet } from "react-router-dom";
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
import { setCategory } from "./store/productCategory";

function App() {
  const userData = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();

  const fetchingData = async () => {
    const userNewData = await fetchUserDetails();
    dispatch(setUser(userNewData?.data));
  };

  const fetchCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      const { data: responseData } = response;

      dispatch(setCategory(responseData.data));
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchingData();
    fetchCategory();
  }, []);
  return (
    <>
      <Header />
      <main className="min-h-[62vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
