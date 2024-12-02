import React, { useEffect, useState } from "react";
import UpdateCategory from "../pages/UpdateCategory";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import ConfirmBox from "./ConfirmBox";

const CardDisplay = ({ Categorydata }) => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const deleteCategoryData = async () => {
    const _id = Categorydata._id;

    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: { _id },
      });
      console.log(response.data);

      if (response.data.status) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setOpenConfirmDelete(false);
    }
  };

  return (
    <section>
      <div className="lg:w-52 mt-2 border-2 shadow-md rounded overflow-hidden ">
        <img
          src={Categorydata.image}
          alt={Categorydata.name}
          className=" rounded object-center w-full h-48"
        />
        <div className="flex gap-1 px-2 ">
          <button
            onClick={() => setOpenUpdate(true)}
            className="text-md font-semibold flex-1 py-1 rounded m-1 bg-green-300 "
          >
            Edit
          </button>
          <button
            onClick={setOpenConfirmDelete}
            className="text-md font-semibold flex-1 m-1 rounded bg-red-300"
          >
            Delete
          </button>
        </div>
      </div>
      {openUpdate && (
        <UpdateCategory
          data={Categorydata}
          close={() => setOpenUpdate(false)}
        />
      )}
      {openConfirmDelete && (
        <ConfirmBox
          confirm={() => deleteCategoryData()}
          close={() => setOpenConfirmDelete(false)}
        />
      )}
    </section>
  );
};

export default CardDisplay;
