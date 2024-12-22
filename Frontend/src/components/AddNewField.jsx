import React from "react";
import { MdClose } from "react-icons/md";

const AddNewField = ({ value, onChange, submit, close }) => {
  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-neutral-800 bg-opacity-60 flex items-center justify-center p-4 lg:p-0 z-50">
      <div className="w-full max-w-md bg-white p-4 rounded">
        <div className="flex items-center justify-between gap-2 ">
          <h2 className="font-semibold bg-yellow-500 px-2  rounded">
            Add New Field
          </h2>
          <button onClick={close}>
            <MdClose size={22} />
          </button>
        </div>
        <div className="grid gap-2 mt-5">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={value}
            onChange={onChange}
            required
            placeholder="Enter field name"
            className="outline-none border-2 focus-within:border-purple-700 p-2 rounded"
          />
        </div>

        <button
          onClick={submit}
          className="w-fit mt-4 block px-4 py-2 bg-yellow-500 border-2 shadow-md shadow-black mx-auto rounded font-semibold"
        >
          Add Field
        </button>
      </div>
    </section>
  );
};

export default AddNewField;
