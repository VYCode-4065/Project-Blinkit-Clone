import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

import { FiExternalLink } from "react-icons/fi";
import UserLogout from "../common/logout";
import fetchUserDetails from "../common/fetchUserDetails";
import { resetUser } from "../store/userSlice";
import UserMenu from "../components/UserMenu";

const Dashboard = () => {
  const user = useSelector((state) => state.userDetails);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLoggingOut = async () => {
    const response = await UserLogout();

    dispatch(resetUser());
    localStorage.clear();
    navigate("/");
    fetchUserDetails();
  };

  return (
    <div className="container px-5 min-h-[calc(100vh-140px)]">
      <div className=" mb-14 lg:mb-0  grid lg:grid-cols-[220px,1fr] gap-2 rounded-sm ">
        <div className="hidden lg:block  pb-4 w-full sticky top-28 max-h-[calc(100vh-200px)] ">
          <div className="flex items-start pl-4 pt-5 justify-center gap-2 flex-col  ">
            <h3 className="font-bold">My Account </h3>

            {<UserMenu />}
          </div>
        </div>
        <div className=" ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
