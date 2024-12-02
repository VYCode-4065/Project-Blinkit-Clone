import React from "react";
import { useSelector } from "react-redux";
import { isAdmin } from "../utils/isAdmin.js";

const AdminControl = ({ children }) => {
  const user = useSelector((state) => state.userDetails);
  return (
    <>
      {isAdmin(user.role) ? (
        children
      ) : (
        <p className="text-lg text-center text-red-600 font-semibold p-5">
          You are not an admin{" "}
        </p>
      )}
    </>
  );
};

export default AdminControl;
