import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Binkeyit from "../assets/Binkeyit.png";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setSubCategory } from "../store/productCategory";

const UploadProductSubCategory = ({ close }) => {
  const allCategory = useSelector((state) => state.categoryDetails.allCategory);
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleImageChange = async (e) => {
    try {
      setLoading(true);
      const file = e.target.files[0];

      const fileData = new FormData();

      fileData.append("image", file);

      const response = await Axios({
        ...SummaryApi.uploadImage,
        data: fileData,
      });

      const imageUrl = response.data?.data?.url;

      if (imageUrl) {
        setSubCategoryData((prev) => {
          return {
            ...prev,
            image: imageUrl,
          };
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = (_id) => {
    const updatedCategory = subCategoryData.category.filter(
      (e) => e._id !== _id
    );

    setSubCategoryData((prev) => {
      return {
        ...prev,
        category: updatedCategory,
      };
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: subCategoryData,
      });

      if (response.data?.success) {
        dispatch(setSubCategory(response?.data?.data));
        toast.success(response.data.message);
      }
    } catch (error) {
      // AxiosToastError(error);
    } finally {
      close();
    }
  };

  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-neutral-800 bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="w-[50rem] bg-white rounded p-4">
        <div className="flex items-center justify-between  ">
          <h2 className="font-semibold">Sub Category </h2>
          <button onClick={close}>{<MdClose size={25} />}</button>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className="grid py-2">
            <label htmlFor="name" className="font-semibold py-1">
              Name
            </label>
            <input
              name="name"
              id="name"
              type="text"
              value={subCategoryData.name}
              onChange={handleOnChange}
              placeholder="Enter sub-category name "
              className="outline-2 outline-blue-400 p-2 rounded "
            />
          </div>
          <div className="grid lg:grid-cols-4">
            <div className="bg-blue-100 h-44 lg:w-40 border-2 border-blue-400 rounded grid text-center mb-3">
              {subCategoryData.image ? (
                <img
                  src={subCategoryData.image}
                  alt="subcategory"
                  className="mx-auto py-2 lg:w-full h-48  object-center"
                />
              ) : (
                <p className="text-blue-500 font-semibold my-auto">No image</p>
              )}
            </div>
            <label htmlFor="image" className="my-auto">
              <div
                type="button"
                className="border border-pink-400 shadow-md shadow-blue-400 px-4 py-1   hover:bg-green-500 font-semibold rounded text-center cursor-pointer "
              >
                {loading ? "Loading....." : "Upload"}
              </div>
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="grid my-5 max-h-72">
            <label
              htmlFor="selectCategory"
              className="text-md font-semibold py-1"
            >
              Select Category
            </label>
            <div className="mb-2 flex flex-wrap gap-2">
              {subCategoryData.category.map((cat, idx) => {
                return (
                  <span key={idx} className="flex items-center">
                    {cat.name}{" "}
                    <button
                      type="button"
                      onClick={() => {
                        deleteCategory(cat?._id);
                      }}
                    >
                      <MdClose size={20} />
                    </button>
                  </span>
                );
              })}
            </div>
            <select
              onChange={(e) => {
                const _id = e.target.value;

                const categoryDetail = allCategory.find((e) => e?._id === _id);
                console.log(categoryDetail);

                setSubCategoryData((prev) => {
                  return {
                    ...prev,
                    category: [...prev.category, categoryDetail],
                  };
                });
              }}
              name="category"
              id="selectCategory"
              className="text-md p-2 rounded outline-none bg-transparent cursor-pointer border-2 focus-within:border-blue-400 max-h-12 overflow-y-scroll"
            >
              <option value="" className="w-full">
                Select category
              </option>

              {allCategory.map((val, index) => {
                return (
                  <option value={val?._id} key={index}>
                    {val.name}
                  </option>
                );
              })}
            </select>

            <button
              className={`border border-blue-700 text-center mt-2 p-2 rouded-sm ${
                subCategoryData.name &&
                subCategoryData.image &&
                subCategoryData.category[0]
                  ? "hover:bg-yellow-400 bg-yellow-500"
                  : "bg-slate-300"
              } font-semibold `}
            >
              Add Sub Category
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadProductSubCategory;
