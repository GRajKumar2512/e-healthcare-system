import axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../../tables/Table";
import { useQuery } from "@tanstack/react-query";
import { DNA } from "react-loader-spinner";

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
    <div className="lg:w-[70%] md:w-[80%] p-4 mx-auto bg-white rounded-lg shadow-lg mt-20">
      <Table data={nurses} columns={columns} />
    </div>
  );
};

export default NurseActions;
