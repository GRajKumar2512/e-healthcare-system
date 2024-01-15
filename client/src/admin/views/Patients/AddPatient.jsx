import React, { useState } from "react";
import CreatePatient from "./CreatePatient";
import PatientForm from "./PatientForm";

const AddPatient = () => {
  const [patientId, setPatientId] = useState("");

  const handleValueChange = (newValue) => {
    setPatientId(newValue);
  };

  return (
    <div className="mt-20">
      <div className={patientId ? "hidden" : ""}>
        <CreatePatient onValueChange={handleValueChange} />
      </div>
      <div className={`${patientId ? "" : "hidden"}`}>
        <PatientForm patientId={patientId} />
      </div>
    </div>
  );
};

export default AddPatient;
