import React from "react";
import BarChart from "../../../charts/BarChart";
import DoughnutChart from "../../../charts/DoughnutChart";

const AdminDashboard = () => {
  const dashboardItems = [
    { name: "Department", data: 0 },
    { name: "Bookings", data: 1 },
    { name: "Nurse", data: 2 },
    { name: "Patient", data: 3 },
    { name: "Payment", data: 4 },
    { name: "Invoice", data: 5 },
  ];
  return (
    <div className="">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4">
        {dashboardItems.map((item) => (
          <div className="p-4 rounded-lg bg-white flex justify-between items-center shadow-lg">
            <div className="p-1">
              <h2>{item.name}</h2>
              <p>{item.data}</p>
            </div>
            <div className="p-3 bg-green-600"></div>
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
