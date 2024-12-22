import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UpdateSubCategory = ({ data, close }) => {
  const allSubCategory = useSelector(
    (state) => state.categoryDetails.allSubCategory
  );

  const [updateSubCategoryData, setUpdateSubCategoryData] = useState({
    _id: data._id,
    name: data?.name,
    image: data.image,
    category: [...data.category],
  });

  const allCategory = useSelector((state) => state.categoryDetails.allCategory);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUpdateSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFileChange = async (e) => {
    try {
      setLoading(true);
      const imageFile = e.target?.files[0];

      const imageForm = new FormData();

      imageForm.append("image", imageFile);

      const response = await Axios({
        ...SummaryApi.uploadImage,
        data: imageForm,
      });

      const imageUrl = response.data?.data?.url;

      if (imageUrl) {
        setUpdateSubCategoryData((prev) => {
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

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        data: updateSubCategoryData,
      });

      const { data: responseData } = response;

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      close();
      refresh();
    }
  };

  const handleDeleteCategory = (value) => {
    const newCategory = updateSubCategoryData.category.filter(
      (el) => el !== value
    );

    setUpdateSubCategoryData((prev) => {
      return {
        ...prev,
        category: [...newCategory],
      };
    });
  };
  const [loading, setLoading] = useState(false);

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 flex items-center justify-center">
      <div className="bg-white max-w-[71rem] w-full rounded mt-16">
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="font-semibold ">Update Sub Category</h2>
          <button type="button">
            {" "}
            <MdClose size={25} onClick={close} />
          </button>
        </div>
        <div>
          <form action="" onSubmit={handleSubmit}>
            <div className="grid gap-2 px-4 py-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="bg-slate-200 outline-none border-2 border-blue-500 focus-within:border-primary-100 px-2 py-1 rounded-sm "
                placeholder="Enter category name "
                id="name"
                name="name"
                value={updateSubCategoryData?.name}
                onChange={handleOnChange}
              />
            </div>
            <div className="grid gap-2 px-4 py-2">
              <label>Image</label>
              <input
                type="file"
                className="bg-slate-200 outline-none border-2 border-blue-500 focus-within:border-primary-100 px-2 py-1 rounded-sm hidden"
                id="image"
                name="image"
                onChange={handleFileChange}
              />
              <div className="flex items-center gap-2">
                <div className="h-48 lg:w-44 bg-slate-500 flex flex-col items-center justify-center rounded">
                  {updateSubCategoryData.image ? (
                    <img
                      src={updateSubCategoryData.image}
                      className="w-full object-fit h-full"
                      alt="category"
                      id="image"
                    />
                  ) : (
                    <label className="text-sm font-semibold cursor-pointer ">
                      No Image
                    </label>
                  )}
                </div>
                <div
                  type="button"
                  className={`text-sm font-semibold  px-6 py-2 border-2  rounded  border-red-400 ${"bg-green-700"}`}
                >
                  <label htmlFor="image" className="cursor-pointer">
                    {loading ? "Loading..." : "Upload"}
                  </label>
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-lg p-2">Select Category </h2>
                <div className="flex items-center gap-2 flex-wrap pl-2 pb-2">
                  {Array.isArray(updateSubCategoryData.category) &&
                    updateSubCategoryData.category[0] &&
                    updateSubCategoryData.category.map((val) => {
                      return (
                        <div
                          className="flex items-center gap-2"
                          key={val + "subCategory"}
                        >
                          <p>{val?.name}</p>
                          <button
                            type="button"
                            onClick={() => {
                              handleDeleteCategory(val);
                            }}
                          >
                            <MdClose size={20} />
                          </button>
                        </div>
                      );
                    })}
                </div>
                <select
                  onChange={(e) => {
                    const _id = e.target.value;

                    const categoryDetail = allCategory.find(
                      (el) => el._id === _id
                    );
                    setUpdateSubCategoryData((prev) => {
                      return {
                        ...prev,
                        category: [...prev.category, categoryDetail],
                      };
                    });
                  }}
                  name="category"
                  id="selectCategory"
                  className="text-md p-2 rounded outline-none bg-transparent cursor-pointer border-2 focus-within:border-blue-400 max-h-12 overflow-y-scroll w-full"
                >
                  <option value="" className="w-full">
                    Select sub category
                  </option>

                  {allCategory.map((val, index) => {
                    return (
                      <option value={val._id} key={index}>
                        {val.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button className="p-2 my-4  border-2 border-blue-500 rounded-md hover:bg-red-800 text-md">
                Update Sub Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateSubCategory;
