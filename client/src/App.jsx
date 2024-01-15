import { Routes, Route } from "react-router-dom";

import axios from "axios";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/views/Dashboard/AdminDashboard";
import BookingsAll from "./admin/views/Bookings/BookingsAll";
import BookingsForm from "./admin/views/Bookings/BookingsForm";
import NurseActions from "./admin/views/Nurses/NurseActions";
import PatientActions from "./admin/views/Patients/PatientActions";
import PatientForm from "./admin/views/Patients/PatientForm";
import AddNurse from "./admin/views/Nurses/AddNurse";
import AddPatient from "./admin/views/Patients/AddPatient";

function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;

  return (
    <>
      <Routes>
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
          <Route path="/Patients/Patient Action" element={<PatientActions />} />
          {/* appointments */}
          <Route path="/appointments" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
