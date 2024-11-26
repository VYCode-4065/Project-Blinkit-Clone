import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserLogout from "../common/logout";
import { resetUser } from "../store/userSlice";
import { MdClose } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";

const UserProfile = ({ setProfile }) => {
  const user = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();

  const userLoggingOut = async () => {
    const response = await UserLogout();

    dispatch(resetUser());
    localStorage.clear();
    setProfile(false);
  };
  return (
    <div className="my-2 mx-2 px-2 py-2 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h5 className="font-semibold">My Account </h5>
        <MdClose
          onClick={() => setProfile(false)}
          size={25}
          className="hover:bg-slate-400 rounded-full cursor-pointer hover:size-6"
        />
      </div>
      <div className="flex items-center gap-2 ">
        <span className="pt-2">{user?.name}</span>
        <Link onClick={() => setProfile(false)} to={"/dashboard/profile"}>
          <FiExternalLink className="cursor-pointer hover:font-bold" />
        </Link>
      </div>
      <div className="grid pl-7 my-4 gap-4 text-sm">
        <Link
          onClick={() => setProfile(false)}
          to={"/dashboard/orders"}
          className="hover:font-semibold"
        >
          My Orders
        </Link>
        <Link
          onClick={() => setProfile(false)}
          to={"/dashboard/address"}
          className="hover:font-semibold"
        >
          Saved Address{" "}
        </Link>
        <button
          onClick={userLoggingOut}
          className="text-left hover:font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
