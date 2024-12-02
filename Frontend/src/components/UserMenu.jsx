import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetUser } from "../store/userSlice";
import fetchUserDetails from "../common/fetchUserDetails";
import UserLogout from "../common/logout";
import { isAdmin } from "../utils/isAdmin";

const UserMenu = ({ setProfile }) => {
  const user = useSelector((state) => state.userDetails);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();

  const userLoggingOut = async () => {
    const response = await UserLogout();

    dispatch(resetUser());
    localStorage.clear();
    navigate("/");
    setProfile(false);
    fetchUserDetails();
  };
  return (
    <div>
      <div className="flex items-center gap-2 pt-2">
        <span className="">{user?.name}</span>{" "}
        {isAdmin(user.role) && <span className="text-red-700">(Admin)</span>}
        <Link to={"/dashboard/profile"}>
          <FiExternalLink className="cursor-pointer hover:font-bold" />
        </Link>
      </div>

      <div className="flex items-start pl-4 pt-5 justify-center gap-2 flex-col text-slate-600 ">
        {isAdmin(user.role) && (
          <Link to={"/dashboard/category"} className="hover:text-black">
            Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link to={"/dashboard/sub-category"} className="hover:text-black">
            Sub Category
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link to={"/dashboard/upload-product"} className="hover:text-black">
            Upload Product
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link to={"/dashboard/product"} className="hover:text-black">
            Product
          </Link>
        )}

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
  );
};

export default UserMenu;
