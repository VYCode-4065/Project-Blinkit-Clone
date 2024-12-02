import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserLogout from "../common/logout";
import { resetUser } from "../store/userSlice";
import { MdClose } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import UserMenu from "./UserMenu";

const UserProfile = ({ setProfile }) => {
  return (
    <div
      onClick={() => setProfile(false)}
      className="my-2 mx-2 px-2 py-2 flex flex-col gap-2 z-50"
    >
      <div className="flex items-center justify-between ">
        <h5 className="font-semibold">My Account </h5>
        <MdClose
          size={25}
          className="hover:bg-slate-400 rounded-full cursor-pointer hover:size-6"
        />
      </div>
      <div>
        <UserMenu />
      </div>
    </div>
  );
};

export default UserProfile;
