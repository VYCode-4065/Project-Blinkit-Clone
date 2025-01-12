import React, { useEffect, useState } from "react";
import logo from "../assets/blinkit_logo_2.0.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import userMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { Toaster } from "react-hot-toast";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import UserProfileMobile from "./UserProfileMobile";
import { DislayPriceInRupees } from "../utils/DisplayPriceInRupee";
import { pricewithdiscount } from "./pricewithdiscount";
import DisplayCartMobile from "../pages/DisplayCartMobile";
import DisplayCartItem from "../pages/DisplayCartItem";
import { setProductTotalPrice } from "../store/productCategory";

const Header = () => {
  const user = useSelector((state) => state.userDetails);
  const cartItem = useSelector((state) => state.cartProductDetails.cart);
  const [openCart, setOpenCart] = useState(false);

  const [isMobile] = userMobile();
  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const [openProfile, setOpenProfile] = useState(false);

  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const qty = cartItem.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);

    setTotalQty(qty);

    const tPrice = cartItem.reduce((prev, curr) => {
      return (
        prev +
        Number(
          pricewithdiscount(curr?.productId?.price, curr?.productId?.discount)
        ) *
          Number(curr.quantity)
      );
    }, 0);

    setTotalPrice(tPrice);
    dispatch(setProductTotalPrice(tPrice));
  }, [cartItem]);

  const handleUserClick = () => {
    setOpenProfile((prev) => !prev);
  };
  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const [profile, setProfile] = useState(false);

  const isSearchPage = location.pathname === "/search";

  return (
    <header className="container pt-5 lg:pt-0 px-5 mx-auto h-[7.3rem] md:h-[5.5rem] lg:h-[4.8rem] sticky top-0  bg-white z-30">
      <div className="container mx-auto ">
        <div className="flex items-center justify-between  ">
          {/* logo section */}
          <Link
            to={"/"}
            className={`lg:flex justify-center flex-col  ${
              isMobile && isSearchPage && "hidden"
            }`}
          >
            <div className="h-8 md:h-10 lg:h-[3.3rem] -ml-2 p-.5">
              <img
                src="https://prooh.ai/images/blinkit.png"
                alt="logo"
                className="h-full w-full object-scale-down"
              />
            </div>
          </Link>

          {/* search section  */}
          <div className="cursor-text hidden lg:block mt-3">
            <Search />
          </div>

          {/* User icon for mobile version */}

          <div
            onClick={handleUserClick}
            className={`lg:hidden text-2xl px-3 ${
              isMobile && isSearchPage && "hidden"
            }`}
          >
            {user.avatar ? (
              <div className="w-8  ">
                <img src={`${user?.avatar}`} alt="" className="rounded-full " />
              </div>
            ) : (
              <FaRegUserCircle size={30} />
            )}
            {openProfile && <UserProfileMobile setProfile={setProfile} />}
          </div>

          {/* login and cart section for desktop version */}
          <Toaster />
          <div className="hidden lg:flex  lg:items-center lg:gap-9">
            <div>
              {user ? (
                <div className="relative">
                  <div
                    className="flex items-center gap-1 select-none cursor-pointer"
                    onClick={() => setProfile((prev) => !prev)}
                  >
                    <p>Account</p>
                    {profile ? (
                      <IoMdArrowDropup size={25} />
                    ) : (
                      <IoMdArrowDropdown size={25} />
                    )}
                  </div>
                  <div className="min-w-64 right-0 absolute top-[3.2rem] bg-white shadow-lg  rounded-lg">
                    {profile && <UserProfile setProfile={setProfile} />}
                  </div>
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="font-semibold">
                  Login
                </button>
              )}
            </div>
            <button
              onClick={() => setOpenCart(true)}
              className="flex items-center bg-green-800  px-4 rounded-md text-white gap-2 hover:bg-green-700"
            >
              <div className="animate-bounce">
                <BsCart4 size={29} />
              </div>
              {cartItem[0] ? (
                <div className="text-sm ">
                  <p>{totalQty} items</p>
                  <p>{DislayPriceInRupees(totalPrice)}</p>
                </div>
              ) : (
                <>
                  <div className="font-semibold py-3">
                    <span>My cart</span>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto container bg-transparent pt-2 px-4 lg:hidden">
        <Search />
      </div>
      {cartItem[0] && location.pathname !== "/checkout" && (
        <div className="fixed bottom-5 left-1 right-1">
          <DisplayCartMobile
            totalQty={totalQty}
            totalPrice={totalPrice}
            displayCart={() => setOpenCart(true)}
          />
        </div>
      )}
      {openCart && (
        <DisplayCartItem
          totalQty={totalQty}
          totalPrice={totalPrice}
          data={cartItem}
          close={() => setOpenCart(false)}
        />
      )}
    </header>
  );
};

export default Header;
