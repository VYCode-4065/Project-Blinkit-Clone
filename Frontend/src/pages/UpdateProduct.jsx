import React, { useEffect, useState } from "react";
import { MdClose, MdDelete, MdOutlineCloudUpload } from "react-icons/md";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import ViewItem from "../components/ViewItem";
import { useSelector } from "react-redux";
import AddNewField from "../components/AddNewField";
import successAlert from "../utils/SwalAlert";

const UpdateProduct = ({ ProductIndex, setproductupdate }) => {
  const allCategory = useSelector((state) => state.categoryDetails.allCategory);

  const allSubCategory = useSelector(
    (state) => state.categoryDetails.allSubCategory
  );

  const [productData, setProductData] = useState({
    name: "",
    image: [],
    category_id: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
    public: true,
    publish: true,
  });

  const [loading, setLoading] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState("");
  const [ShowAddField, setShowAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  // fetching product data

  const productInfo = useSelector((state) => state.categoryDetails.product);

  const toUpdateValue = ProductIndex;

  useEffect(() => {
    setProductData((prev) => {
      return {
        ...prev,
        _id: ProductIndex?._id,
        name: toUpdateValue.name,
        image: [...toUpdateValue.image],
        category_id: toUpdateValue.category_id,
        subCategory: toUpdateValue.subCategory,
        unit: toUpdateValue.unit,
        stock: toUpdateValue.stock,
        price: toUpdateValue.price,
        discount: toUpdateValue.discount,
        description: toUpdateValue.description,
        // more_details: toUpdateValue.more_details,
        public: true,
        publish: true,
      };
    });
  }, []);

  const handleMoreField = () => {
    setProductData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setShowAddField(false);
  };

  const handleMoreDetailChange = (key, value) => {
    setProductData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [key]: value,
        },
      };
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleOnDelete = (idx) => {
    productData.image?.splice(idx, 1);
    setProductData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleRemoveCategory = (idx) => {
    productData.category_id.splice(idx, 1);
    setProductData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleRemoveSubCategory = (idx) => {
    productData.subCategory.splice(idx, 1);
    setProductData((prev) => {
      return {
        ...prev,
      };
    });
  };
  const handleUploadImage = async (e) => {
    try {
      setLoading(true);
      const imageFile = e.target?.files[0];

      if (!imageFile) {
        return;
      }

      const imageForm = new FormData();

      imageForm.append("image", imageFile);

      const response = await Axios({
        ...SummaryApi.uploadImage,
        data: imageForm,
      });

      const imageUrl = response.data?.data?.url;

      if (imageUrl) {
        toast.success(response.data.message);

        setProductData((prev) => {
          return {
            ...prev,
            image: [...prev.image, imageUrl],
          };
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.updateProductDetails,
        data: productData,
      });

      const { data: responseData } = response;
      console.log("updated value ", responseData);

      if (responseData.success) {
        successAlert(responseData.message);
        setProductData({
          name: "",
          image: [],
          category_id: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
          public: true,
          publish: true,
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setproductupdate(false);
    }
  };
  return (
    <section className="fixed top-0 right-0 left-0 bottom-0  bg-neutral-500 bg-opacity-65 flex items-center justify-center ">
      <div className="w-[75vw] bg-white border-2 border-gray-500 h-[80vh] overflow-y-scroll relative rounded p-2">
        <div className=" top-28 pt-2 lg:top-24 w-full">
          <div className="bg-neutral-50  shadow-sm shadow-pink-400 p-2 rounded flex items-center justify-between  sticky top-0 z-10">
            <h2 className="font-semibold text-md">Update Product</h2>
            <button
              onClick={() => setproductupdate(false)}
              className="pr-2 text-center hover:font-bold"
            >
              <MdClose size={25} />
            </button>
          </div>
          <div className="grid gap-3">
            <form
              action=""
              className="grid gap-4 p-4"
              onSubmit={handleOnSubmit}
            >
              <div className="grid gap-2">
                <label htmlFor="name" className="font-semibold">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  required
                  className="outline-none bg-white p-2 px-4 rounded border-2 focus-within:border-purple-500"
                  value={productData.name}
                  placeholder="Enter product name"
                  onChange={handleOnChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="font-semibold">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  value={productData.description}
                  onChange={handleOnChange}
                  placeholder="Product description......"
                  className="resize-none p-2 outline-none bg-white px-4 rounded border-2 focus-within:border-purple-500"
                />
              </div>
              <div className="grid gap-2">
                <p className="font-semibold">
                  Image <span className="text-red-500">*</span>
                </p>

                <div className="flex items-center justify-center h-36 bg-white rounded border-2 focus-within:file:bg-purple-500">
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <label
                      htmlFor="image"
                      className="flex items-center flex-col cursor-pointer hover:font-semibold select-none"
                    >
                      <MdOutlineCloudUpload size={30} />
                      <p>Upload Image</p>
                    </label>
                  )}
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleUploadImage}
                  />
                </div>
              </div>
              {/* Div to display image uploaded by admin */}
              <div className=" bg-white flex items-center flex-wrap ">
                {productData.image.map((img, idx) => {
                  return (
                    <div
                      key={idx + "image"}
                      className="relative h-28 w-28 m-4 group border shadow-md shadow-neutral-700 cursor-pointer"
                    >
                      <img
                        src={img}
                        alt={img + idx}
                        className="h-full w-full flex-1 cursor-pointer  object-scale-down"
                        onClick={() => {
                          setViewImage(true);
                          setViewImageUrl(img);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleOnDelete(idx)}
                        className="absolute bottom-0 right-0 p-.5 hover:rounded-full hover:bg-red-700 hover:text-white hidden group-hover:block"
                      >
                        <MdDelete size={25} />
                      </button>
                      {viewImage && (
                        <ViewItem
                          url={viewImageUrl}
                          close={() => setViewImage(false)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className=" grid gap-2">
                <label htmlFor="category" className="font-semibold">
                  Category<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center flex-wrap gap-2">
                  {productData.category_id[0] &&
                    productData.category_id.map((val, index) => {
                      const catData = allCategory.find(
                        (cat) => cat._id === val
                      );

                      return (
                        <div className="flex items-center gap-1">
                          <p key={index + "category"} className="text-sm">
                            {catData?.name}
                          </p>
                          <button
                            onClick={() => {
                              handleRemoveCategory(index);
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
                      (e) => e?._id === _id
                    );

                    setProductData((prev) => {
                      return {
                        ...prev,
                        category_id: [...prev.category_id, categoryDetail?._id],
                      };
                    });
                    e.target.value = "";
                  }}
                  name="category"
                  id="selectCategory"
                  className="text-md p-2 rounded outline-none bg-transparent cursor-pointer border-2 focus-within:border-blue-400 max-h-12 overflow-y-scroll bg-white"
                >
                  <option selected disabled value="" className="w-full">
                    Select category
                  </option>

                  {allCategory[0] &&
                    allCategory.map((val, index) => {
                      return (
                        <option value={val?._id} key={index}>
                          {val.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className=" grid gap-2">
                <label htmlFor="sub-category" className="font-semibold">
                  Sub Category<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center flex-wrap gap-2">
                  {productData.subCategory[0] &&
                    productData.subCategory.map((val, index) => {
                      const subData = allSubCategory.find(
                        (sub) => sub._id == val
                      );

                      return (
                        <div className="flex items-center gap-1">
                          <p key={index + "subcategory"} className="text-sm">
                            {subData?.name}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              handleRemoveSubCategory(index);
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

                    const SubcategoryDetail = allSubCategory.find(
                      (e) => e?._id === _id
                    );

                    setProductData((prev) => {
                      return {
                        ...prev,
                        subCategory: [
                          ...prev.subCategory,
                          SubcategoryDetail?._id,
                        ],
                      };
                    });

                    e.target.value = "";
                  }}
                  name="category"
                  id="selectCategory"
                  className="text-md p-2 rounded outline-none bg-transparent cursor-pointer border-2 focus-within:border-blue-400 max-h-12 overflow-y-scroll bg-white"
                >
                  <option value="" className="w-full">
                    Select sub category
                  </option>

                  {allSubCategory[0] &&
                    allSubCategory.map((val, index) => {
                      return (
                        <option value={val?._id} key={index}>
                          {val.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="unit" className="font-semibold">
                  Number of Unit<span className="text-red-500">*</span>
                </label>
                <input
                  name="unit"
                  id="unit"
                  type="text"
                  className="outline-none bg-white p-2 px-4 rounded border-2 focus-within:border-purple-500 appearance-none"
                  value={productData.unit}
                  placeholder="Enter product unit"
                  onChange={handleOnChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="price" className="font-semibold">
                  Price<span className="text-red-500">*</span>
                </label>
                <input
                  name="price"
                  id="price"
                  type="number"
                  className="outline-none bg-white p-2 px-4 rounded border-2 focus-within:border-purple-500 appearance-none"
                  value={productData.price}
                  placeholder="Enter product price"
                  onChange={handleOnChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="stock" className="font-semibold">
                  Number of Stock<span className="text-red-500">*</span>
                </label>
                <input
                  name="stock"
                  id="stock"
                  type="number"
                  className="outline-none bg-white p-2 px-4 rounded border-2 focus-within:border-purple-500 appearance-none"
                  value={productData.stock}
                  placeholder="Enter product stock"
                  onChange={handleOnChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="discount" className="font-semibold">
                  Discount <span className="text-red-500">(%)</span>
                </label>
                <input
                  name="discount"
                  id="discount"
                  type="number"
                  accept="number"
                  className="outline-none bg-white p-2 px-4 rounded border-2 focus-within:border-purple-500 appearance-none"
                  value={productData.discount}
                  placeholder="Enter product discount rate"
                  onChange={handleOnChange}
                />
              </div>

              {Object?.keys(productData?.more_details)?.map(
                (keyValue, index) => {
                  return (
                    <div className="grid gap-2" key={index + "addfield"}>
                      <label htmlFor={keyValue} className="font-semibold">
                        {keyValue}
                      </label>
                      <input
                        name={keyValue}
                        id={keyValue}
                        type="text"
                        value={productData.more_details[keyValue]}
                        placeholder={`Enter ${keyValue}`}
                        onChange={(e) =>
                          handleMoreDetailChange(keyValue, e.target.value)
                        }
                        className="outline-none bg-white p-2 px-4 rounded border-2 focus-within:border-purple-500 appearance-none"
                      />
                    </div>
                  );
                }
              )}

              <button
                onClick={() => setShowAddField(true)}
                type="button"
                className="px-4 py-2 w-fit block border-2 border-indigo-600 bg-green-600 hover:bg-green-700 text-md rounded-md font-semibold"
              >
                Add Field
              </button>

              {ShowAddField && (
                <AddNewField
                  value={fieldName}
                  submit={handleMoreField}
                  onChange={(e) => setFieldName(e.target.value)}
                  close={() => setShowAddField(false)}
                />
              )}
              <button className="py-2 w-full border-2 hover:border-neutral-800 bg-yellow-400 rounded text-center font-semibold">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProduct;
