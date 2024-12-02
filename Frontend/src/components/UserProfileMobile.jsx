import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Deviders from "./Deviders";
import UserLogout from "../common/logout";
import { resetUser } from "../store/userSlice";
import { MdClose } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import UserMenu from "./UserMenu";

const UserProfileMobile = ({ setProfile }) => {
  const user = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await UserLogout();

    dispatch(resetUser());
    localStorage.clear();
    setProfile(false);
    navigate("/");
  };
  return (
    <div className="relative shadow- ">
      <div
        onClick={() => setProfile(false)}
        className="absolute right-0 top-2 text-sm min-w-36 bg-white p-2 pt-2 flex flex-col gap-1 shadow-sm shadow-pink-500 border border-blue-500 rounded-sm"
      >
        {user._id ? (
          <div>
            <div className="flex items-center justify-between">
              <h5 className="font-semibold">My Account </h5>
              <MdClose
                size={25}
                className="hover:bg-slate-400 rounded-full cursor-pointer hover:size-6"
              />
            </div>

            <UserMenu />
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
