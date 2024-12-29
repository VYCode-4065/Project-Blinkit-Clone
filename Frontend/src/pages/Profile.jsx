import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import fetchUserDetails from "../common/fetchUserDetails";
import { setUser, updateUserDetail } from "../store/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.userDetails);

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const [loading, setLoading] = useState(false);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      if (response.data.success) {
        toast.success(response.data.message);

        const userUpdatedDetails = await fetchUserDetails();
        dispatch(updateUserDetail(userData));
      }
    } catch (error) {
      AxiosError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="h-20 w-20 rounded-full overflow-hidden mx-2 text-center mt-4">
        {user.avatar ? (
          <img src={user.avatar} alt="" />
        ) : (
          <FaRegUserCircle size={72} />
        )}
      </div>
      <Link
        to={"/dashboard/update-avatar"}
        className="border w-32 text-sm  border-sky-300 shadow-lg rounded-xl  flex items-center justify-center  px-2 py-1 mt-5 hover:bg-primary-100 hover:text-black"
      >
        Change Picture
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="grid my-4 ">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name "
            className="my-2 py-1 px-2 border-2 focus-within:border-primary-100 outline-none rounded-md"
            value={userData.name}
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="grid my-4 ">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email "
            className="my-2 py-1 px-2 border-2 focus-within:border-primary-100 outline-none rounded-md"
            value={userData.email}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid my-4 ">
          <label htmlFor="mobile" className="font-semibold">
            Mobile
          </label>
          <input
            type="text"
            maxLength={10}
            id="mobile"
            name="mobile"
            placeholder="Enter your new number "
            className="my-2 py-1 px-2 border-2 focus-within:border-primary-100 outline-none rounded-md"
            value={userData.mobile}
            onChange={handleOnChange}
          />
        </div>
        <button className="px-2 py-1 hover:bg-primary-100 hover:text-black font-semibold border-2 rounded-md border-primary-100 mx-auto w-full">
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
