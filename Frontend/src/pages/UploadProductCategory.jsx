import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const UploadProductCategory = ({ close }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
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
        setData((prev) => {
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

  const validValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: data,
      });

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      close();
    }
  };

  const [loading, setLoading] = useState(false);
  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 flex items-center justify-center">
      <div className="bg-white max-w-[71rem] w-full rounded">
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="font-semibold ">Category</h2>
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
                value={data.name}
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
              <div className="grid lg:grid-cols-5 gap-2">
                <div className="h-48 lg:w-44 bg-slate-500 flex flex-col items-center justify-center rounded">
                  {data.image ? (
                    <img
                      src={data.image}
                      className="w-full h-full object-contain mt-5"
                      alt="category"
                      id="image"
                    />
                  ) : (
                    <label className="text-sm font-semibold cursor-pointer">
                      No Image
                    </label>
                  )}
                </div>

                <div
                  type="button"
                  className={`text-sm font-semibold   py-2 border-2  rounded  border-red-400 ${"bg-green-700"} text-center h-10  my-auto`}
                >
                  <label htmlFor="image" className="cursor-pointer ">
                    {loading ? "Loading....." : "Upload"}
                  </label>
                </div>
              </div>
              <button
                className={`p-2 my-4  border-2 border-blue-500 rounded-md ${
                  validValue && "bg-red-800"
                } text-md`}
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UploadProductCategory;
