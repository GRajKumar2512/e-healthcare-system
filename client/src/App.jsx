import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/views/Dashboard/AdminDashboard";

import BookingsAll from "./admin/views/Bookings/BookingsAll";
import BookingsForm from "./admin/views/Bookings/BookingsForm";

import AddNurse from "./admin/views/Nurses/AddNurse";
import NurseActions from "./admin/views/Nurses/NurseActions";

import AddPatient from "./admin/views/Patients/AddPatient";
import PatientActions from "./admin/views/Patients/PatientActions";

import AuthLayout from "./auth/Authlayout";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import { useQuery } from "@tanstack/react-query";
import { DNA } from "react-loader-spinner";

function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const { data: isAuthenticated, isLoading } = useQuery({
    queryKey: ["authenticationStatus"],
    queryFn: async () => {
      const { data } = await axios.get("/profile");
      return Boolean(data);
    },
  });

  useEffect(() => {
    if (isLoading) {
      return; // Wait until authentication status is loaded
    }

    if (!isAuthenticated) {
      // Redirect to login/register if not authenticated
      navigate("/register");
    }
  }, [navigate, isAuthenticated, isLoading]);

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
    <>
      <Routes>
        {!isAuthenticated ? (
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        ) : (
          <Route element={<AdminLayout />}>
            <Route path="/" element={<AdminDashboard />} />
            {/* bookings */}
            <Route path="/Bookings/Bookings Form" element={<BookingsForm />} />
            <Route path="/Bookings/All Bookings" element={<BookingsAll />} />
            {/* nurses */}
            <Route path="/Nurses/Add Nurse" element={<AddNurse />} />
            <Route path="/Nurses/Nurse Action" element={<NurseActions />} />
            {/* patients */}
            <Route path="/Patients/Add Patient" element={<AddPatient />} />
            <Route
              path="/Patients/Patient Action"
              element={<PatientActions />}
            />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
