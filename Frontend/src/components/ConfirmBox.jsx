import React from "react";

const ConfirmBox = ({ confirm, close }) => {
  return (
    <section>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-800 bg-opacity-70 flex items-center justify-center">
        <div className="flex flex-col items-start justify-center p-4  bg-neutral-200 w-[23rem] rounded">
          <h2 className="text-md font-semibold pb-2">Delete Category </h2>

          <p className=" text-neutral-800 pb-2">
            Are you sure you want to delete category
          </p>

          <div className="flex items-center h-auto justify-around w-full mt-2">
            <button
              onClick={close}
              className="text-md   px-8 py-1 rounded  bg-neutral-400 "
            >
              Cancel
            </button>
            <button
              onClick={confirm}
              className="text-md  px-8 py-1 rounded bg-red-600 "
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmBox;
