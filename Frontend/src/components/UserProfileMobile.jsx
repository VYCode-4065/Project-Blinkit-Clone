import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Deviders from "./Deviders";
import UserLogout from "../common/logout";
import { resetUser } from "../store/userSlice";
import { MdClose } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";

const UserProfileMobile = ({ setProfile }) => {
  const user = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await UserLogout();

    dispatch(resetUser());
    localStorage.clear();
    setProfile(false);
  };
  return (
    <div className="relative shadow- ">
      <div className="absolute right-0 top-2 text-sm min-w-36 bg-white p-2 pt-2 flex flex-col gap-1 shadow-sm shadow-pink-500 border border-blue-500 rounded-sm">
        {user._id ? (
          <div>
            <div className="flex items-center justify-between">
              <h5 className="font-semibold">My Account </h5>
              <MdClose
                onClick={() => setProfile(false)}
                size={25}
                className="hover:bg-slate-400 rounded-full cursor-pointer hover:size-6"
              />
            </div>
            <Link to={"/dashboard/profile"} className="flex items-center gap-2">
              <h6 className=" text-[.7rem] py-2">{user.name}</h6>
              <FiExternalLink />
            </Link>
            <Deviders />
            <div className="grid gap-2 text-[.7rem] pt-2">
              <Link to={"/dashboard/orders"} className=" hover:text-black">
                My Orders
              </Link>
              <Link to={"/dashboard/address"} className=" hover:text-black">
                Saved Address
              </Link>
              <button
                onClick={handleLogout}
                className="text-left hover:text-black"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="w-5">
            <Link to={"/login"}>Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileMobile;
