import React from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const AddAddress = ({ close }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        ...SummaryApi.createAddress,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      close();
    }
  };
  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 z-50">
      <div className="bg-white w-72 md:w-auto h-[80vh] lg:h-full pb-8 container mx-auto my-8  rounded border  max-w-lg overflow-auto">
        <div className="flex items-center justify-between p-2 h-12 sticky top-0 bg-white ">
          <h2 className="font-semibold text-lg   rounded pl-2">Add Address</h2>
          <button onClick={close}>
            <IoMdClose size={25} />
          </button>
        </div>
        <form
          className="mt-5 w-full grid gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-2 mx-3">
            <label htmlFor="addressline " className="font-medium">
              Address Line :
            </label>
            <input
              defaultChecked={true}
              id="addressline"
              {...register("addressline", { required: true })}
              className="py-2 px-2 border-2 shadow rounded "
            />
          </div>
          <div className="grid gap-2 mx-3">
            <label htmlFor="city">City :</label>
            <input
              id="city"
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
              {...register("country", { required: true })}
              className="py-2 px-2 border-2 shadow rounded "
            />
          </div>
          <div className="grid gap-2 mx-3">
            <label htmlFor="mobile " className="font-medium" required={true}>
              Phone No. :
            </label>
            <input
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

export default AddAddress;
