import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../common/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validValue = Object.values(data).every((el) => el.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    if (!validValue) return;

    setLoading(true); // Set loading state

    try {
      // Make login request
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      // Handle errors returned from the server
      if (response.data.error) {
        toast.error(response.data.message);
        setLoading(false);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);

        // Fetch user details after successful login
        try {
          const userResponse = await fetchUserDetails();
          dispatch(setUser(userResponse.data)); // Update user state in Redux
        } catch (error) {
          console.error("Error fetching user details:", error.message || error);
        }

        // Store tokens in localStorage
        localStorage.setItem(
          "Access_Token",
          response?.data?.data?.access_token
        );
        localStorage.setItem(
          "Refresh_Token",
          response?.data?.data?.refresh_token
        );

        // Reset form data
        setData({
          email: "",
          password: "",
        });

        // Redirect to the home page
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 border-2 shadow-lg shadow-blue-500 border-pink-600">
        <div className="flex items-center justify-center">
          <span className="font-bold text-blue-500 text-xl shadow-sm shadow-black px-4 py-1">
            Login
          </span>
        </div>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password:</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full outline-none"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          <button
            disabled={!validValue || loading} // Disable button if form is invalid or loading
            type="submit"
            className={`${
              validValue && !loading
                ? "bg-green-800 hover:bg-green-700"
                : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="pb-4 mb-4 flex item-end">
          <Link
            to={"/forgot-password"}
            className="ml-auto hover:text-primary-100"
          >
            Forgot password?
          </Link>
        </div>
        <p>
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
