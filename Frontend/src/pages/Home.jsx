import React, { useEffect, useState } from "react";
import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
import { generatePageURL } from "../components/GeneratePageUrl";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import CategoryDisplayPage from "./CategoryDisplayPage.jsx";

const Home = () => {
  const loadingProduct = useSelector(
    (state) => state.categoryDetails.loadingProduct
  );
  const [productByCategory, setProductByCategory] = useState([]);

  const allCategory = useSelector((state) => state.categoryDetails.allCategory);
  const allsubCategory = useSelector(
    (state) => state.categoryDetails.allSubCategory
  );

  const navigate = useNavigate();

  const handleProductListPage = (cat) => {
    const subCat = allsubCategory?.find((sub) => {
      const filtersub = sub.category.some((c) => c._id == cat._id);

      return filtersub ? true : null;
    });

    const url = `/${generatePageURL(cat.name)}+${cat._id}/${generatePageURL(
      subCat.name
    )}+${subCat._id}`;

    navigate(url);
  };

  return (
    <section className="bg-white lg:mx-32">
      <div className="container rounded bg-transparent">
        <img src={banner} alt="" className="hidden lg:block " />
        <img src={bannerMobile} alt="" className="lg:hidden" />
      </div>

      <div
        className={`grid grid-cols-2 md:grid-cols-4 md:mx-10 lg:grid-cols-10 gap-2 mx-2 lg:mx-3 my-3 ${
          loadingProduct && "animate-pulse"
        } rounded `}
      >
        {loadingProduct
          ? new Array(14).fill(null).map((_, index) => {
              return (
                <div
                  key={index}
                  className="min-h-40 min-w-40 flex flex-col justify-between gap-2   rounded border border-gray-300 p-1 animate-pulse"
                >
                  <div className="h-24 bg-blue-50 rounded"></div>
                  <div className="bg-blue-50 rounded h-12"></div>
                </div>
              );
            })
          : allCategory?.map((val, index) => {
              return (
                <div
                  key={index + val?._id}
                  className="cursor-pointer "
                  onClick={() => handleProductListPage(val)}
                >
                  <img
                    src={val.image}
                    alt={val.name}
                    className="object-fill "
                  />
                </div>
              );
            })}
      </div>
      <div className="px-6 mb-12 mt-6">
        {allCategory?.map((val, index) => {
          // console.log("category in all category ", val._id);
          if (
            index === 1 ||
            index === 2 ||
            index === 3 ||
            index === 5 ||
            index === 11 ||
            index === 19
          ) {
            return (
              <CategoryDisplayPage
                key={val._id + "categoryDisplay"}
                id={val?._id}
                name={val?.name}
              />
            );
          }
        })}
      </div>
    </section>
  );
};

export default Home;
