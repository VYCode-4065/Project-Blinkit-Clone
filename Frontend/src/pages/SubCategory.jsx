import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import UploadProductSubCategory from "./UploadProductSubCategory";
import NoData from "../components/NoData";
import { useDispatch, useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { setSubCategory } from "../store/productCategory";
import SubCategoryCard from "../components/SubCategoryCard";
import TableDisplay from "../components/TableDisplay";
import { createColumnHelper } from "@tanstack/react-table";
import ViewItem from "../components/ViewItem";
import UpdateSubCategory from "../components/UpdateSubCategory";
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import ConfirmBox from "../components/ConfirmBox";

const SubCategory = () => {
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [viewItem, setViewItem] = useState("");
  const [toUpdateData, setToUpdateData] = useState({});
  const [toDeleteData, setToDeleteData] = useState({
    _id: "",
  });
  const [openUpdate, setOpenUpdate] = useState(false);

  const dispatch = useDispatch();

  const fetchAllSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });

      const { data: responseData } = response;

      setSubCategoryData(responseData.data);
      dispatch(setSubCategory(responseData.data));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setSubCategoryLoading(true);
    }
  };

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const deleteSubCategoryData = async () => {
    const _id = toDeleteData._id;

    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: { _id },
      });

      if (response.data.status) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setOpenConfirmDelete(false);
    }
  };

  useEffect(() => {
    fetchAllSubCategory();
  }, [addSubCategory, openUpdate, openConfirmDelete]);

  const columnHelper = createColumnHelper();

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return (
          <div
            onClick={() => setViewItem(row.original.image)}
            className="flex items-center justify-center cursor-pointer"
          >
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-8 h-8"
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 flex-wrap">
            {row.original.category.map((val) => {
              return <p key={val + val.name}>{val.name}</p>;
            })}
          </div>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-2 lg:gap-5 ">
            <button
              onClick={() => {
                setOpenUpdate(true);
                setToUpdateData(row.original);
              }}
            >
              <GoPencil size={20} />
            </button>
            <button
              onClick={() => {
                setOpenConfirmDelete(true);
                setToDeleteData({
                  _id: row.original._id,
                });
              }}
            >
              <MdDelete size={20} className="" />
            </button>

            {openUpdate && (
              <UpdateSubCategory
                data={toUpdateData}
                close={() => setOpenUpdate(false)}
              />
            )}
          </div>
        );
      },
    }),
  ];

  return (
    <section className="min-h-[71vh] ">
      <div className="sticky  top-28 lg:top-[5.6rem] max-h-[calc(100vh-200px)]">
        <div className="bg-neutral-50  shadow-sm shadow-pink-400 p-2 rounded flex items-center justify-between  ">
          <h2 className="font-semibold text-md">Sub Category</h2>
          <button
            onClick={() => setAddSubCategory(true)}
            className="px-2 py-1 text-sm border-2 border-blue-300 hover:bg-green-700 rounded"
          >
            Add Sub Category
          </button>
        </div>
      </div>
      <div>
        {addSubCategory && (
          <UploadProductSubCategory close={() => setAddSubCategory(false)} />
        )}

        {!subCategoryLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="w-full max-w-[90vw] overflow-auto">
            <TableDisplay data={subCategoryData} column={column} />
          </div>
        )}

        {/* {!subCategoryData[0] && !subCategoryLoading && <NoData />} */}
      </div>

      {viewItem && <ViewItem url={viewItem} close={() => setViewItem("")} />}
      {openConfirmDelete && (
        <ConfirmBox
          confirm={() => deleteSubCategoryData()}
          close={() => setOpenConfirmDelete(false)}
        />
      )}
    </section>
  );
};

export default SubCategory;
