import React, { useState } from "react";
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import UpdateSubCategory from "./UpdateSubCategory";
const TableDisplay = ({ column, data }) => {
  const table = useReactTable({
    data: data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="">
      <table className="w-full ">
        <thead className="bg-black text-white  ">
          {table.getHeaderGroups()?.map((headerGroup) => (
            <tr key={headerGroup.id} className="h-10">
              <th>Sr. No.</th>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border whitespace-nowrap">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.map((row) => (
            <tr key={row.id} className="">
              <td
                key={row.id + "sr"}
                className="px-4 border border-neutral-400 whitespace-nowrap"
              >
                {row.index + 1}
              </td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 border border-neutral-400">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
};

export default TableDisplay;
