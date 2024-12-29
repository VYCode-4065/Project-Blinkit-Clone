import React, { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { generatePageURL } from "../components/GeneratePageUrl";
import { Link, useLocation, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import nothing from "../assets/nothing_here.webp";
import AddToCartButton from "./AddToCartButton";
import { pricewithdiscount } from "../components/pricewithdiscount";
import { DislayPriceInRupees } from "../utils/DisplayPriceInRupee";

const SearchPage = () => {
  const [productData, setProductData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const params = useLocation();
  console.log("params");
  const searchText = params?.search?.replace("?q=", "")?.replaceAll("+", " ");
  setTimeout(() => {
    setSearch(searchText);
  }, 500);

  const fetchData = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          search: search,
          page: page,
        },
      });
      console.log(response?.data);
      const { data: responseData } = response;
      if (response.data.success) {
        if (page == 1) {
          setProductData(responseData.data.data);
        } else {
          setProductData((preve) => {
            return [...preve, ...responseData.data.data];
          });
        }
        setTotalPage(responseData.data.totalPage);
        console.log(responseData);
      }
      console.log("product", productData);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  console.log("page ", page);
  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <section className="lg:px-44 min-h-[83vh] ">
      <p className="text-lg py-4 ">
        Search results :{" "}
        <span className="font-semibold ">{productData.length}</span>
      </p>
      <InfiniteScroll
        dataLength={productData.length}
        hasMore={true}
        next={handleFetchMore}
      >
        <div className="grid grid-cols-5 gap-4 overflow-auto">
          {productData?.map((val, index) => {
            const url = `/product/${generatePageURL(val.name)}+${val._id}`;
            return (
              <div
                key={index + "kajf"}
                className="min-w-44 min-h-36 flex justify-around flex-col  bg-transparent rounded overflow-y-clip py-2 border shadow shadow-neutral-200"
              >
                <div className="h-28 rounded">
                  <img
                    src={val?.image[0]}
                    alt={val?._id}
                    className=" object-scale-down h-full w-full rounded overflow-hidden "
                  />
                </div>
                <Link to={url} className="p-2">
                  <div className="flex items-center gap-1">
                    <p className="bg-green-200 rounded-full w-fit text-sm px-1 m-1 font-medium">
                      10 min
                    </p>
                    {Boolean(val.discount) && (
                      <p className="text-green-800 bg-white rounded w-fit text-sm px-1 m-1 font-medium text-ellipsis line-clamp-1">
                        {val.discount}% <span>discount</span>
                      </p>
                    )}
                  </div>
                  <p className="text-sm font-medium text-ellipsis line-clamp-2 mt-3">
                    {val?.name}
                  </p>
                  <p className="">{val?.unit}</p>
                </Link>
                <div className="flex items-center justify-between p-2">
                  {!Boolean(val.stock) ? (
                    <p>₹0</p>
                  ) : (
                    <p>
                      {DislayPriceInRupees(
                        pricewithdiscount(val.price, val.discount)
                      )}
                    </p>
                  )}
                  <div>
                    {!Boolean(val.stock) ? (
                      <p className="text-red-400 text-sm  text-center">
                        Out of Stock
                      </p>
                    ) : (
                      <AddToCartButton data={val} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
      {!Boolean(productData.length) && (
        <div className="grid grid-cols-2 place-items-center place-content-center w-full ">
          <img
            src={nothing}
            alt=""
            className="h-80 w-full object-scale-down col-span-2  rounded-lg overflow-hidden"
          />
          <h2 className="font-bold text-2xl text-center col-span-2">
            No product found !
          </h2>
        </div>
      )}
    </section>
  );
};

export default SearchPage;
