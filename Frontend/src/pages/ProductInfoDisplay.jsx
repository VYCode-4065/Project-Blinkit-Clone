import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
const ProductInfoDisplay = () => {
  const params = useParams();
  const [data, setData] = useState("");

  const productId = params.productInfo.split("+").slice(-1)[0];
  console.log("params", productId);

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { _id: productId },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
        console.log("response ", responseData);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);
  return (
    <section>
      <div className="grid  lg:px-24">
        <div className="grid col-span-2 bg-red-500 min-h-44 min-w-44">
          {<img src={data?.image[0]} alt={data.name} />}
        </div>
      </div>
    </section>
  );
};

export default ProductInfoDisplay;
