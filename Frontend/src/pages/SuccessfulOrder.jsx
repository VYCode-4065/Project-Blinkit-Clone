import React from "react";
import { Link, useLocation } from "react-router-dom";

const SuccessfulOrder = () => {
  const location = useLocation();

  return (
    <section className="min-h-[82vh] w-full">
      <div className="h-fit w-full max-w-lg mx-auto">
        <div className="flex items-center justify-center flex-col gap-5 mt-20 bg-green-300 py-5 px-2">
          {Boolean(location.state?.text) ? (
            <p className="text-2xl font-bold ">Order placed successfully </p>
          ) : (
            <p className="text-2xl font-bold ">
              Online payment done successfully{" "}
            </p>
          )}
          <Link
            to={"/"}
            className="px-4 py-2 border-2 border-blue-500 hover:bg-blue-500 hover:border-white hover:text-neutral-300 rounded font-semibold transition-all"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessfulOrder;
