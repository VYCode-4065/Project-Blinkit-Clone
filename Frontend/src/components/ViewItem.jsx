import React from "react";
import { MdClose } from "react-icons/md";

const ViewItem = ({ url, close }) => {
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-800 bg-opacity-65 h-full w-full flex items-center justify-center">
      <div className="bg-white w-96  rounded-lg overflow-hidden">
        <div className="flex items-center justify-between py-3 px-2">
          <h2 className="font-bold  text-lg">View Item</h2>
          <button className="" onClick={close}>
            <MdClose size={25} />
          </button>
        </div>
        <div className="w-full h-full bg-blue-200 overflow-hidden">
          <img
            src={url}
            alt=""
            className="object-contain pt-4 h-full w-full "
          />
        </div>
      </div>
    </section>
  );
};

export default ViewItem;
