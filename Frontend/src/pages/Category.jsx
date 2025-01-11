import React, { useEffect, useState } from "react";
import UploadProductCategory from "./UploadProductCategory";
import LoadingSpinner from "../components/LoadingSpinner";
import NoData from "../components/NoData";
import CardDisplay from "../components/CardDisplay";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const Category = () => {
  const [addCategory, setAddCategory] = useState(false);

  const [categoryLoading, setCategoryLoading] = useState(false);

  const [categoryData, setCategoryData] = useState([]);

  const allCategory = useSelector((state) => state.categoryDetails.allCategory);

  const dispatch = useDispatch();

  useEffect(() => {
    setCategoryData(allCategory);
    fetchCategory();
  }, [addCategory]);

  const fetchCategory = async () => {
    try {
      setCategoryLoading(true);

      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      const { data: responseData } = response;

      setCategoryData(responseData.data);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setCategoryLoading(false);
    }
  };

  return (
    <section className="min-h-[71vh] ">
      <div className="sticky top-28 lg:top-24 max-h-[calc(100vh-200px)]">
        <div className="bg-neutral-50  shadow-sm shadow-pink-400 p-2 rounded flex items-center justify-between  ">
          <h2 className="font-semibold text-md">Category</h2>
          <button
            onClick={() => setAddCategory(true)}
            className="px-2 py-1 text-sm border-2 border-blue-300 hover:bg-green-700 rounded"
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="lg:p-4">
        {addCategory && (
          <UploadProductCategory close={() => setAddCategory(false)} />
        )}
        {categoryLoading && <LoadingSpinner />}

        <div className="grid grid-cols-2  lg:grid-cols-5 gap-1 rounded overflow-hidden ">
          {categoryData.map((val, index) => {
            return (
              <CardDisplay
                key={index}
                Categorydata={val}
                refresh={() => fetchCategory()}
              />
            );
          })}
        </div>

        {!categoryData[0] && !categoryLoading && <NoData />}
      </div>
    </section>
  );
};

export default Category;
