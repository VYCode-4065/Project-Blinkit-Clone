import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GlobalContextProvider } from "../provider/GlobalProvider";
import AddAddress from "../components/AddAddress";
import { MdDelete, MdEdit } from "react-icons/md";
import UpdateAddress from "../components/UpdateAddress";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const SavedAddress = () => {
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState("");
  const addressList = useSelector((state) => state.addressDetails.address);
  const { fetchUserAddress } = GlobalContextProvider();

  const handleOnDelete = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteAddress,
        data: {
          id: id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      fetchUserAddress();
    }
  };
  useEffect(() => {
    fetchUserAddress();
  }, [openAddAddress, openUpdateAddress]);

  return (
    <section>
      <div className="sticky top-28 lg:top-[5.5rem] max-h-[calc(100vh-200px)]">
        <div className="bg-neutral-50  shadow-sm shadow-pink-400 p-2 rounded flex items-center justify-between  ">
          <h2 className="font-semibold text-md">Saved Address</h2>
          <button
            onClick={() => setOpenAddAddress(true)}
            className="px-2 py-1 text-sm border-2 border-blue-300 hover:text-neutral-100 hover:bg-green-400 rounded"
          >
            Add Address
          </button>
        </div>
      </div>
      <div className="grid gap-3 bg-blue-50 px-5  mb-3  py-5 ">
        {addressList?.map((address, index) => {
          return (
            <div
              key={address?._id + index}
              className="bg-white flex items-center justify-between py-3 rounded"
            >
              <div className="px-5 ">
                <p>{address.address_line}</p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>{address.pincode}</p>
                <p>{address.country}</p>
                <p>{address.mobile}</p>
              </div>
              <div className="flex items-center justify-between flex-col gap-5 px-4 py-1 h-full">
                <button
                  onClick={() => {
                    setOpenUpdateAddress(true);
                    setDataToUpdate(address);
                  }}
                  className="p-2 rounded-full hover:bg-blue-100 "
                >
                  <MdEdit size={20} />
                </button>
                <button
                  onClick={() => handleOnDelete(address?._id)}
                  className="p-2 rounded-full hover:bg-red-200 "
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {openAddAddress && <AddAddress close={() => setOpenAddAddress(false)} />}
      {openUpdateAddress && (
        <UpdateAddress
          data={dataToUpdate}
          close={() => setOpenUpdateAddress(false)}
        />
      )}
    </section>
  );
};

export default SavedAddress;
