import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UpdateAddress = ({ data, close }) => {
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      address_line: data.address_line,
      city: data.city,
      state: data.state,
      mobile: data.mobile,
      country: data.country,
      pincode: data.pincode,
    },
  });

  const onSubmit = async (updatedata) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateAddress,
        data: updatedata,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      // setValue("");
      close();
    }
  };
  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 z-50">
      <div className="bg-white w-72 md:w-auto h-[80vh] lg:h-full pb-8 container mx-auto my-8  rounded border  max-w-lg overflow-auto">
        <div className="flex items-center justify-between p-2 h-12 sticky top-0 bg-white ">
          <h2 className="font-semibold text-lg   rounded pl-2">
            Update Address
          </h2>
          <button onClick={close}>
            <IoMdClose size={25} />
          </button>
        </div>
        <form
          className="mt-5 w-full grid gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-2 mx-3">
            <label htmlFor="address_line " className="font-medium">
              Address Line :
            </label>
            <input
              id="address_line"
              {...register("address_line", { required: true })}
              className="py-2 px-2 border-2 shadow rounded "
            />
          </div>
          <div className="grid gap-2 mx-3">
            <label htmlFor="city">City :</label>
            <input
              id="city"
              name="city"
              {...register("city", { required: true })}
              className="py-2 px-2 border-2 shadow rounded "
            />
          </div>
          <div className="grid gap-2 mx-3">
            <label htmlFor="state " className="font-medium">
              State :
            </label>
            <input
              id="state"
              name="state"
              {...register("state", { required: true })}
              className="py-2 px-2 border-2 shadow rounded "
            />
          </div>
          <div className="grid gap-2 mx-3">
            <label htmlFor="pincode " className="font-medium" required={true}>
              Pincode :
            </label>
            <input
              id="pincode"
              name="pincode"
              {...register("pincode", { required: true })}
              className="py-2 px-2 border-2 shadow rounded "
            />
          </div>
          <div className="grid gap-2 mx-3">
            <label htmlFor="country " className="font-medium">
              Country :
            </label>
            <input
              id="country"
              name="country"
              {...register("country", { required: true })}
              className="py-2 px-2 border-2 shadow rounded "
            />
          </div>
          <div className="grid gap-2 mx-3">
            <label htmlFor="mobile " className="font-medium" required={true}>
              Phone No. :
            </label>
            <input
              name="mobile"
              id="mobile"
              {...register("mobile", { required: true })}
              className="py-2 px-2 border-2 shadow rounded "
            />
          </div>
          <div className="w-full px-2 py-3">
            <button
              type="submit"
              className="py-2  border-2 rounded bg-orange-400 hover:bg-orange-500    w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateAddress;
