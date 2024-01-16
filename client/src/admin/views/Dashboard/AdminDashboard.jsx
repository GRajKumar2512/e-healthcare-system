import React from "react";
// packages
import { motion } from "framer-motion";
// charts
import BarChart from "../../../charts/BarChart";
import DoughnutChart from "../../../charts/DoughnutChart";
//icons
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { LiaUserNurseSolid } from "react-icons/lia";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { MdAdminPanelSettings } from "react-icons/md";

const AdminDashboard = () => {
  const dashboardItems = [
    { name: "Department", data: 0, icon: MdAdminPanelSettings },
    { name: "Bookings", data: 1, icon: HiOutlineClipboardDocumentList },
    { name: "Nurse", data: 2, icon: LiaUserNurseSolid },
    { name: "Patient", data: 3, icon: AiOutlineUserSwitch },
    { name: "Prescription", data: 4, icon: GiMedicines },
    { name: "Invoice", data: 5, icon: LiaFileInvoiceDollarSolid },
  ];
  return (
    <div className="">
      <h1 className="text-4xl font-bold mt-10">Admin Dashboard</h1>

      <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4 mb-10">
        {dashboardItems.map((item, index) => (
          <div
            className="p-4 rounded-lg bg-white flex justify-between items-center shadow-lg"
            key={index}
            id="container"
          >
            <div className="p-1">
              <h2 className="text-[1.5rem]">{item.name}</h2>
              <p className="text-[1.2rem]">{item.data}</p>
            </div>
            <div className="p-3 bg-green-600 text-white" id="icon-container">
              {item.icon && (
                <div id="icon">
                  {React.createElement(item.icon, { size: 35 })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-4 mt-4">
        <div className="bg-white rounded-lg shadow-lg p-2">
          <BarChart />
        </div>
        <div className="bg-white rounded-lg shadow-lg">
          <DoughnutChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
