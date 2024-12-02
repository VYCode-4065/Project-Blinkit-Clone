import React, { useEffect, useState } from "react";
import UpdateCategory from "../pages/UpdateCategory";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import ConfirmBox from "./ConfirmBox";
import UpdateSubCategory from "./UpdateSubCategory";
import { createColumnHelper } from "@tanstack/react-table";

const SubCategoryCard = ({ SubCategoryData, setRefresh }) => {
  console.log(SubCategoryData);

  const columnHelper = createColumnHelper();

  columnHelper;
  return <div></div>;

  // return (
  //   <section>
  //     <div className="lg:w-52 mt-2 border-2 shadow-md rounded overflow-hidden ">
  //       <img
  //         src={SubCategoryData.image}
  //         alt={SubCategoryData.name}
  //         className=" rounded object-contain mt-2 w-full h-44"
  //       />
  //       <div className="flex gap-1 px-2 ">
  //         <button
  //           onClick={() => setOpenUpdate(true)}
  //           className="text-md font-semibold flex-1 py-1 rounded m-1 bg-green-600 hover:bg-green-500 "
  //         >
  //           Edit
  //         </button>
  //         <button
  //           onClick={setOpenConfirmDelete}
  //           className="text-md font-semibold flex-1 m-1 rounded bg-red-600 hover:bg-red-500"
  //         >
  //           Delete
  //         </button>
  //       </div>
  //     </div>
  //     {openUpdate && (
  //       <UpdateSubCategory
  //         data={SubCategoryData}
  //         close={() => setOpenUpdate(false)}
  //         refresh={() => setRefresh((prev) => !prev)}
  //       />
  //     )}
  //     {openConfirmDelete && (
  //       <ConfirmBox
  //         confirm={() => deleteSubCategoryData()}
  //         close={() => setOpenConfirmDelete(false)}
  //       />
  //     )}
  //   </section>
  // );
};

export default SubCategoryCard;
