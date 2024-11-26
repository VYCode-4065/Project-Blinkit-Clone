import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./store/userSlice";
import fetchUserDetails from "./common/fetchUserDetails";

function App() {
  const userData = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();

  const fetchingData = async () => {
    const userNewData = await fetchUserDetails();
    dispatch(setUser(userNewData?.data));
  };

  useEffect(() => {
    fetchingData();
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
