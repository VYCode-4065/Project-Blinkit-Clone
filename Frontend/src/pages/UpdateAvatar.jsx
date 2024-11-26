import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { Form, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import fetchUserDetails from "../common/fetchUserDetails";
import { updateAvatar } from "../store/userSlice";

const UpdateAvatar = () => {
  const user = useSelector((state) => state.userDetails);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const response = fetchUserDetails();

    response.then((val) => {
      dispatch(updateAvatar(val.data.avatar));
    });
  }, [loading]);

  const handleClose = () => {
    navigate("/dashboard/profile");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });
      setLoading(false);

      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      AxiosError(error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  };
  return (
    <section className="fixed left-0 right-0 top-0 bottom-0 bg-black flex justify-center items-center bg-opacity-50">
      <div className="text-blue-800 min-h-72 min-w-72 rounded-lg bg-white flex flex-col items-center  py-4">
        <MdClose
          size={25}
          onClick={handleClose}
          className="mb-auto ml-auto  mx-4 cursor-pointer font-bold"
        />
        <div className="h-20 w-20 rounded-full overflow-hidden mx-2 mb-5 mt-4">
          {user.avatar ? (
            <img src={user.avatar} alt="" />
          ) : (
            <FaRegUserCircle size={72} />
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="border w-[6.9rem] text-sm  border-sky-300 shadow-lg rounded-xl  flex items-center justify-center  px-2 py-1 mb-14 hover:bg-primary-100 hover:text-black">
            <label htmlFor="upload" className="cursor-pointer font-semibold">
              {(loading && "Loading....") || "Upload"}
              <input
                onChange={handleChange}
                type="file"
                name="upload"
                id="upload"
                className="hidden"
              />
            </label>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateAvatar;
