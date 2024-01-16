import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../../tables/Table";
import { DNA } from "react-loader-spinner";
import { useState } from "react";

const BookingsAll = () => {
  const {
    data: allBookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const { data } = await axios.get("/book-nurse");

      return data;
    },
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row) => row.nurse.name, {
      id: "nurse",
      header: () => "NURSE",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.patient.name, {
      id: "patient",
      header: () => "PATIENT",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("contact", {
      header: () => "CONTACT",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("address", {
      header: () => "ADDRESS",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("ailmentReason", {
      header: () => "AILMENT REASON",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("currentMedication", {
      header: () => "MEDICATION",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("fromDate", {
      header: () => "FROM",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("toDate", {
      header: () => "TO",
      cell: (info) => info.renderValue(),
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
          <p className="text-slate-500 font-thin">Loading Bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg mt-20">
      <div className="p-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-950">Bookings</h1>
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
              <label>Nurse:</label>
              <input
                type="text"
                name="nurse"
                className="w-full p-4 mt-4 border rounded-lg outline-green-500"
                placeholder="Nurse Name"
              />
            </div>
            <div className="w-full">
              <label>Patient:</label>
              <input
                type="text"
                name="patient"
                className="w-full p-4 mt-4 border rounded-lg outline-green-500"
                placeholder="Patient Name"
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
          </div>

          <button className="ml-5 p-4 rounded-lg shadow-lg text-white bg-green-950">
            Submit
          </button>
        </div>
      )}
      <Table data={allBookings} columns={columns} p-4 />
    </div>
  );
};

export default BookingsAll;
