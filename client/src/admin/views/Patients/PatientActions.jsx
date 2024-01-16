import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { DNA } from "react-loader-spinner";
import Table from "../../../tables/Table";
import { useState } from "react";

const PatientActions = () => {
  const { data: patients, isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const { data } = await axios.get("/patient");
      return data;
    },
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("firstname", {
      header: () => "FIRST NAME",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("lastname", {
      header: () => "LAST NAME",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("dob", {
      header: () => "DOB",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("age", {
      header: () => "AGE",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("address", {
      header: () => "ADDRESS",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("mobile", {
      header: () => "MOBILE",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("ailment", {
      header: () => "AILMENT",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("patientType", {
      header: () => "PATIENT TYPE",
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
          <p className="text-slate-500 font-thin">Loading Patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg mt-20">
      <div className="p-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-950">Patients:</h1>
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
                placeholder="first Name"
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
              <label>Ailment:</label>
              <input
                type="text"
                name="ailment"
                className="w-full p-4 mt-4 border rounded-lg outline-green-500"
                placeholder="Ailment"
              />
            </div>
          </div>

          <button className="ml-5 p-4 rounded-lg shadow-lg text-white bg-green-950">
            Submit
          </button>
        </div>
      )}
      <Table data={patients} columns={columns} />
    </div>
  );
};
export default PatientActions;
