import { Routes, Route } from "react-router-dom";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/views/Dashboard/AdminDashboard";
import BookingsAll from "./admin/views/Bookings/BookingsAll";
import BookingsForm from "./admin/views/Bookings/BookingsForm";
import NurseForm from "./admin/views/Nurses/NurseForm";
import NurseActions from "./admin/views/Nurses/NurseActions";
import PatientActions from "./admin/views/Patients/PatientActions";
import PatientForm from "./admin/views/Patients/PatientForm";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<AdminDashboard />} />
          {/* bookings */}
          <Route path="/Bookings/Bookings Form" element={<BookingsForm />} />
          <Route path="/Bookings/All Bookings" element={<BookingsAll />} />
          {/* nurses */}
          <Route path="/Nurses/Nurse Form" element={<NurseForm />} />
          <Route path="/Nurses/Nurse Action" element={<NurseActions />} />
          {/* patients */}
          <Route path="/Patients/Patient Form" element={<PatientForm />} />
          <Route path="/Patients/Patient Action" element={<PatientActions />} />
          {/* appointments */}
          <Route path="/appointments" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
