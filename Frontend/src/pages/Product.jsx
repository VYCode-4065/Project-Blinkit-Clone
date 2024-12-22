import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import ViewItem from "../components/ViewItem";
import CardDisplay from "../components/CardDisplay";
import { FiSearch } from "react-icons/fi";
import UpdateProduct from "./UpdateProduct";
import { useDispatch } from "react-redux";
import { setProduct } from "../store/productCategory";
import toast from "react-hot-toast";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [productUpdate, setProductUpdate] = useState(false);
  const [toUpdateIndex, setToUpdateIndex] = useState(0);
  const [openConfirm, setOpenConfirm] = useState(false);

  const dispatch = useDispatch();

  const fetchProduct = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: { limit: 14, page: currentPage, search: search },
      });

      const { data: responseData } = response.data;

      dispatch(setProduct(responseData.data));
      setTotalPage(responseData.totalPage);
      setProductData(responseData.data);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [currentPage, totalPage, search, productUpdate, openConfirm]);

  const handleOnPrev = () => {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleOnNext = () => {
    if (currentPage !== totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleOnSearch = (e) => {
    const { value } = e.target;

    const timeoutval = setTimeout(() => {
      setSearch(value);
    }, 500);
  };

  const handleDeleteProduct = async (_id) => {
    if (!_id) {
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: { _id: _id },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="min-h-[71vh]  bg-white mt-1">
      <div className="">
        <div className="bg-neutral-50  shadow-sm shadow-pink-400 p-2 rounded flex items-center justify-between  ">
          <h2 className="font-semibold text-md">Products</h2>
          <div>
            <div className="w-40 lg:w-auto p-1 border-2 border-blue-300 rounded text-center flex items-center justify-between bg-transparent lg:mr-5">
              <FiSearch size={22} />
              <input
                type="text"
                placeholder="Search item"
                className="pl-2 outline-none h-full w-full"
                onChange={handleOnSearch}
              />
            </div>
          </div>
        </div>
        <div className="min-h-[65vh] mt-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2  pb-1 pl-4  ">
            {productData?.map((p, index) => {
              return (
                <div
                  key={index + "products"}
                  className="flex justify-center flex-col rounded shadow-lg shadow-neutral-400 "
                >
                  <img src={p.image[0]} alt="" className="object-scale-down" />

                  <div className="pt-1 pl-1">
                    <p className="text-sm text-ellipsis line-clamp-2 px-1">
                      {p.name}
                    </p>
                    <p className="text-sm px-1 font-semibold">{p.unit}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2 px-2 pb-2">
                    <button
                      className="text-sm font-semibold px-2 lg:px-4 py-1 rounded border border-neutral-500 bg-green-400 hover:bg-green-500"
                      onClick={() => {
                        setProductUpdate(true);
                        setToUpdateIndex(p);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm font-semibold px-2 lg:px-4 py-1 rounded border border-neutral-500 bg-red-400 hover:bg-red-500"
                      onClick={() => {
                        handleDeleteProduct(p._id);
                        setOpenConfirm((prev) => !prev);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-between py-2 mt-2 px-4 ">
          <button
            className="px-5 py-1 bg-green-400 hover:bg-green-500 border border-gray-600 rounded "
            onClick={handleOnPrev}
          >
            Prev
          </button>
          <div className="text-medium font-semibold">
            <p>{`${currentPage}/${totalPage}`}</p>
          </div>
          <button
            className="px-5 py-1 bg-blue-400 hover:bg-blue-500 border border-gray-600 rounded "
            onClick={handleOnNext}
          >
            Next
          </button>
        </div>
        {productUpdate && (
          <UpdateProduct
            ProductIndex={toUpdateIndex}
            setproductupdate={setProductUpdate}
          />
        )}
      </div>
    </section>
  );
};

export default Product;
