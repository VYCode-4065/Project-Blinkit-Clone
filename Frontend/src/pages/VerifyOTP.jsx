import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate, Form, useLocation } from "react-router-dom";

const VerifyOTP = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);

  const navigate = useNavigate();

  const inputRef = useRef([]);

  const valideValue = data.every((el) => el);

  const location = useLocation();
  if (!location.state.email) {
    navigate("/forgot-password");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp: data.join(""),
          email: location.state.email,
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        navigate("/reset-password", {
          state: {
            email: location.state.email,
          },
        });
        toast.success(response.data.message);
        setData({
          data: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full container mx-auto px-2 ">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 border-2 shadow-lg shadow-blue-500 border-pink-600">
        <div className="flex items-center justify-center">
          <span className=" font-bold text-blue-500 text-xl shadow-sm shadow-black px-4 py-1">
            Verify OTP
          </span>
        </div>
        <Form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="otp">Enter OTP :</label>
            <div className="flex items-center justify-between px-2 mt-4">
              {data.map((val, index) => {
                return (
                  <input
                    key={"otp" + index}
                    type="text"
                    id="otp"
                    className="bg-blue-50 w-10  p-2 border border-red-400 rounded outline-none focus:border-blue-600 text-center font-bold"
                    value={data[index]}
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    maxLength={1}
                    onChange={(e) => {
                      const value = e.target.value;

                      const newData = [...data];
                      newData[index] = value;

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                      setData(newData);
                    }}
                  />
                );
              })}
            </div>
          </div>
          <button
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Verify OTP
          </button>
        </Form>
      </div>
    </section>
  );
};

export default VerifyOTP;
