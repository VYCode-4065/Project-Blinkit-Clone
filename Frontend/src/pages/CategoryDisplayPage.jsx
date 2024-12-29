import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LoadingBoxCat from "../components/LoadingBoxCat";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import DisplayProduct from "./DisplayProduct";

const CategoryDisplayPage = ({ id, name, gotoUrl }) => {
  const [Productdata, setProductData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProductByCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: { id: id, page: page },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchProductByCategory();
  }, []);

  const url = `/dc/q?=${id}`;
  return (
    <div>
      <div className="flex items-center justify-between ">
        <p className="font-bold text-lg lg:text-xl">{name}</p>
        <button onClick={gotoUrl} className="pr-2 text-green-800 lg:text-lg">
          See all
        </button>
      </div>

      <div className="relative flex items-center">
        <div>
          {!Productdata ? (
            <LoadingBoxCat />
          ) : (
            <DisplayProduct p={Productdata} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDisplayPage;
