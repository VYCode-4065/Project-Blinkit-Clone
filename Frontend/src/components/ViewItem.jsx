import React from "react";
import { MdClose } from "react-icons/md";

const ViewItem = ({ url, close }) => {
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-800 bg-opacity-65 h-full  w-full flex items-center justify-center z-50">
      <div className="bg-pink-300 w-[70vw] lg:w-[40vw]  rounded-lg overflow-hidden">
        <div className="flex items-center justify-between py-3 px-2 w-full">
          <h2 className="font-bold  text-lg">View Item</h2>
          <button className="" onClick={close}>
            <MdClose size={25} />
          </button>
        </div>
        <div className="w-full h-fit bg-gray-200 overflow-hidden flex items-center justify-center">
          <img
            src={url}
            alt=""
            className="object-scale-down w-fit h-full pt-4"
          />
        </div>
      </div>
    </section>
  );
};

export default ViewItem;
