import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { DNA } from "react-loader-spinner";
import Table from "../../../tables/Table";

const PatientActions = () => {
  const { data: patients, isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const { data } = await axios.get("/patient");
      return data;
    },
  });

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
          <p className="text-slate-500 font-thin">Loading Nurses</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-[70%] md:w-[80%] p-4 mx-auto bg-white rounded-lg shadow-lg mt-20">
      <Table data={patients} columns={columns} />
    </div>
  );
};
export default PatientActions;
