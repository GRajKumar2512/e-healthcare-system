import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const menuItems = [
    "Dashboard",
    "Bookings",
    "Patients",
    "Nurses",
    "Appointments",
    "Calender",
  ];

  return (
    <>
      <nav className="flex justify-between px-8 py-4 items-center shadow-lg">
        <div>
          <h1 className="text-2xl font-semibold text-gray-500 tracking-widest">
            Heathcare
          </h1>
        </div>
        <div>
          <button className="px-3 py-1 rounded-lg bg-red-700 text-white">
            Log Out
          </button>
        </div>
      </nav>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 mx-auto bg-green-50 px-5">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
