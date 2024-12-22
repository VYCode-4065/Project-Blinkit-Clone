import React, { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { generatePageURL } from "../components/GeneratePageUrl";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector } from "react-redux";
import userMobile from "../hooks/useMobile";

const ProductListPage = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const params = useParams();
  const [s, setS] = useState([]);

  const subCat = useSelector((state) => state.categoryDetails.allSubCategory);
  const allCat = useSelector((state) => state.categoryDetails.allCategory);

  const categoryId = params.category.split("+").splice(-1)[0];
  const subCategoryId = params.SubCategory.split("+").splice(-1)[0];
  const fetchSubCat = () => {
    const result = subCat.filter((sub) => {
      const filterData = sub.category.some((el) => {
        return el._id === categoryId;
      });

      return filterData ? true : null;
    });
    setS(result);
  };
  const isMobile = userMobile(414);
  const isTab = userMobile();

  const subCategory = params.SubCategory.split("+");

  const subCategoryName = subCategory
    .splice(0, subCategory?.length - 1)
    .join()
    .replace(",", " ");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          subCat: subCategoryId,
          cat: categoryId,
          limit: limit,
          page: page,
        },
      });

      const { data: responseData } = response;

      setProductData(responseData?.data?.product);
      if (data?.success) {
      }
    } catch (error) {
      // AxiosToastError(error);
    } finally {
      setLoading(false);
      fetchSubCat();
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [params]);

  const navigate = useNavigate();

  const handleProductListPage = (cat) => {
    const subCatP = subCat?.find((sub) => {
      const filtersub = sub.category.some((c) => c._id == cat._id);

      return filtersub ? true : null;
    });

    const url = `/${generatePageURL(cat.name)}+${cat._id}/${generatePageURL(
      subCatP.name
    )}+${subCatP._id}`;

    navigate(url);
  };
  return (
    <section className=" lg:w-[79vw] container mx-auto">
      <div className="sticky top-24 h-10 py-2 px-1 w-full rounded  shadow shadow-gray-200 lg:flex items-center justify-around text-sm mb-5 z-10 hidden bg-white ">
        {/* {allCat?.map((val, idx) => {
          return <div className="flex items-center justify-evenly">
            <p>{val.name}</p>;
          </div>
        })} */}

        {allCat?.map((val, idx) => {
          if (idx < 6) {
            return (
              <p
                onClick={() => handleProductListPage(val)}
                className="cursor-pointer"
              >
                {val.name}
              </p>
            );
          }
        })}

        <select
          name=""
          id=""
          className="w-fit  text-center rounded py-1 cursor-pointer"
          onChange={(e) => {
            const filterValue = allCat.find(
              (val) => val.name === e.target.value
            );
            // console.log(filterValue);
            handleProductListPage(filterValue);
          }}
        >
          <option selected disabled value="">
            More
          </option>
          {allCat?.map((val, idx) => {
            if (idx > 5) {
              return (
                <option value={val.name} className="cursor-pointer">
                  {val.name}
                </option>
              );
            }
          })}
        </select>
      </div>
      <div className="   h-[83vh] container mx-auto grid grid-cols-[100px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[250px,1fr] ">
        <div className=" h-[82vh] border-r-1 border-y-slate-100">
          <div className="flex items-center gap-10 lg:gap-5 flex-col overflow-y-scroll no-scrollbar h-[80vh]  w-full px-2 lg:px-0">
            {s.map((val, idx) => {
              const url = `/${generatePageURL(
                params.category
              )}/${generatePageURL(val.name)}+${val._id}`;
              return (
                <Link
                  to={url}
                  key={idx + val._id}
                  className="grid place-items-center lg:place-content-between lg:grid-flow-col-dense lg:w-full cursor-pointer  border border-slate-100 lg:px-7 container"
                >
                  <div className="flex items-center justify-center flex-col lg:flex-row lg:justify-between lg:gap-2 lg:w-auto gap-2">
                    <img
                      src={val.image}
                      alt={val.name}
                      className="h-12 lg:h-12  object-scale-down mt-2 "
                    />
                    <p className="text-sm text-center">{val.name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className=" ">
          <div className="sticky top-0 h-10 p-3 bg-white shadow-sm shadow-pink-200 font-bold">
            <h3>{subCategoryName}</h3>
          </div>
          <div className="h-[74vh] md:h-[73vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 shadow px-10 md:px-5 lg:px-20 mt-4 overflow-y-scroll no-scrollbar lg:gap-2">
            {loading && <LoadingSpinner />}
            {productData?.map((val, idx) => {
              const url = `/product/${generatePageURL(val.name)}+${val._id}`;
              return (
                <Link
                  to={url}
                  key={idx + val._id}
                  className="lg:h-80 w-52  shadow rounded bg-white p-2 flex justify-between flex-col  gap-3 "
                >
                  <img
                    src={val.image[0]}
                    alt={val.name}
                    className="h-48 w-48 object-scale-down"
                  />
                  <div className="flex  justify-between flex-col ">
                    <p className="text-sm text-ellipsis line-clamp-2 font-semibold ">
                      {val.name}
                    </p>
                    <p className="text-neutral-400 ">{val.unit}</p>
                  </div>
                  <div className="flex justify-between ">
                    <p className="text-sm font-medium">₹{val.price}</p>
                    <button className="border text-sm md:text-nowrap text-green-500 border-green-500 rounded px-3 py-1 ">
                      ADD
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
