import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import { useState } from "react";
import UpdateModal from "../components/UpdateModal";

const Table = ({ data, columns, inputs }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const [open, setOpen] = useState(false);
  const [rowDetails, setRowDetails] = useState({});

  const handleRowClick = (row) => {
    setRowDetails(row.original);
    setOpen(true);
  };

  return (
    <div className="overflow-y-auto">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center gap-1"
                          : "flex items-center gap-1",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {" "}
                      <span>
                        {
                          {
                            asc: <FaSortAmountDownAlt />,
                            desc: <FaSortAmountUp />,
                          }[header.column.getIsSorted()]
                        }
                      </span>
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`${
                row.id % 2 === 0
                  ? "bg-green-50 cursor-pointer"
                  : "bg-white cursor-pointer"
              }`}
              onClick={() => handleRowClick(row)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateModal
        open={open}
        onClose={() => setOpen(!open)}
        details={rowDetails}
      />
    </div>
  );
};

export default Table;
