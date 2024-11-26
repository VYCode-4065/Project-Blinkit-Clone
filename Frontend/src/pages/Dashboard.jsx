import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

import { FiExternalLink } from "react-icons/fi";
import UserLogout from "../common/logout";
import fetchUserDetails from "../common/fetchUserDetails";

const Dashboard = () => {
  const userLoggingOut = async () => {
    const response = await UserLogout();

    dispatch(resetUser());
    localStorage.clear();
  };

  const user = useSelector((state) => state.userDetails);
  return (
    <div className="container   lg:px-[15rem] lg:py-5 ">
      <div className="border-2  lg:border-slate-300 grid lg:grid-cols-[270px,1fr] gap-2 rounded-md">
        <div className="hidden lg:block  pb-4 w-full border-2  border-r-slate-300 ">
          <div className="flex items-start pl-4 pt-5 justify-center gap-2 flex-col  ">
            <h3 className="font-bold">My Account </h3>
            <div className="flex items-center gap-2 ">
              <span className="pt-2">{user?.name}</span>
              <Link to={"/dashboard/profile"}>
                <FiExternalLink className="cursor-pointer hover:font-bold" />
              </Link>
            </div>
          </div>
          <div className="flex items-start pl-4 pt-5 justify-center gap-2 flex-col text-slate-600 ">
            <Link to={"/dashboard/orders"} className="hover:text-black">
              My Orders
            </Link>
            <Link to={"/dashboard/address"} className="hover:text-black">
              Saved Address
            </Link>
            <Link onClick={userLoggingOut} className="hover:text-black">
              Logout
            </Link>
          </div>
        </div>
        <div className="p-5 border-2 border-l-slate-300 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
