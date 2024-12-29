import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { IoMdArrowBack } from "react-icons/io";
import userMobile from "../hooks/useMobile";
import { generatePageURL } from "./GeneratePageUrl";

const Search = () => {
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [search, setSearch] = useState("");

  const location = useLocation();

  const [isMobile] = userMobile(770);

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location.pathname]);

  const navigation = useNavigate();
  const changePath = () => {
    navigation("/search");
  };

  // const fetchProduct = async () => {
  //   try {
  //     const response = await Axios({
  //       ...SummaryApi.getProduct,
  //       data: { limit: 14, page: currentPage, search: search },
  //     });

  //     const { data: responseData } = response.data;

  //     dispatch(setProduct(responseData.data));
  //     setTotalPage(responseData.totalPage);
  //     setProductData(responseData.data);
  //   } catch (error) {
  //     AxiosToastError(error);
  //   }
  // };

  // const handleOnSearch = (e) => {
  //   const { value } = e.target;

  //   const timeoutval = setTimeout(() => {
  //     setSearch(value);
  //   }, 500);
  // };

  const handleOnChange = (e) => {
    const { value } = e.target;
    const url = `/search?q=${generatePageURL(value)}`;
    navigation(url);
  };
  return (
    <>
      <div className="w-full   md:min-w-[300px]  rounded-xl lg:min-w-[650px] flex justify-start  p-2 gap-2 border-2 group focus-within:border-primary-100">
        <div className=" h-full   flex items-center justify-center">
          {isSearchPage && isMobile ? (
            <Link
              to={"/"}
              className="bg-slate-200 p-1   group-focus-within:text-primary-100 rounded-full  shadow-2xl h-full group-focus-within:bg-slate-200"
            >
              <IoMdArrowBack size={22} />
            </Link>
          ) : (
            <button className=" text-gray-600 decoration-0 group-focus-within:text-primary-100  ">
              <FaSearch size={20} />
            </button>
          )}
        </div>
        <div
          onClick={changePath}
          className="text-gray-600 w-full h-full text-lg"
        >
          {!isSearchPage ? (
            // When not in search page,
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed once, initially
                'Search " milk "',
                1000,
                'Search " paneer "',
                1000,
                'Search " bread "',
                1000,
                'Search " atta "',
                1000,
              ]}
              speed={25}
              repeat={Infinity}
            />
          ) : (
            // When in search page,
            <input
              type="text"
              placeholder="Search for atta dal and more "
              onChange={handleOnChange}
              className="bg-transparent h-full outline-none w-full text-slate-600 pt-1"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
