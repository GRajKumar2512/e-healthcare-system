import axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../../tables/Table";
import { useQuery } from "@tanstack/react-query";
import { DNA } from "react-loader-spinner";
import { useState } from "react";

const NurseActions = () => {
  // const [selectedNurse, setSelectedNurse] = useState(null);
  // const [isOpen, setIsOpen] = useState(false);

  const {
    data: nurses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["nurses"],
    queryFn: async () => {
      const { data } = await axios.get("/nurse");
      return data;
    },
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("firstName", {
      header: () => "FIRST NAME",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("lastName", {
      header: () => "LAST NAME",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("dob", {
      header: () => "DOB",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("age", {
      header: () => "AGE",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("address", {
      header: () => "ADDRESS",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("mobile", {
      header: () => "MOBILE NO",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("qualification", {
      header: () => "QUALIFICATION",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("department", {
      header: () => "DEPARTMENT",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("shift", {
      header: () => "SHIFT",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
  ];

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          <p className="text-slate-500 font-thin">Loading Nurses</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>An Error occurred while fetching the data.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg mt-20">
      <div className="p-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-950">Nurses</h1>
        <button
          className="px-3 py-3 rounded-lg shadow-lg text-white bg-green-950"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          Filters
        </button>
      </div>
      <div className="border-t" />
      {isFilterOpen && (
        <div className="p-4">
          <div className="flex gap-5 items-center justify-between p-5 ">
            <div className="w-full">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                className="w-full p-4 mt-4 border rounded-lg outline-green-500"
                placeholder="First Name"
              />
            </div>
            <div className="w-full">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                className="w-full p-4 mt-4 border rounded-lg outline-green-500"
                placeholder="Address"
              />
            </div>
            <div className="w-full">
              <label>Department:</label>
              <input
                type="text"
                name="department"
                className="w-full p-4 mt-4 border rounded-lg outline-green-500"
                placeholder="Department"
              />
            </div>
          </div>

          <button className="ml-5 p-4 rounded-lg shadow-lg text-white bg-green-950">
            Submit
          </button>
        </div>
      )}
      <Table data={nurses} columns={columns} />
    </div>
  );
};

export default NurseActions;
