import React, { useState } from "react";

import CreateNurse from "./CreateNurse";
import NurseForm from "./NurseForm";

const AddNurse = () => {
  const [nurseId, setNurseId] = useState("");

  const handleValueChange = (newValue) => {
    setNurseId(newValue);
  };

  return (
    <div className="mt-20">
      <div className={nurseId ? "hidden" : ""}>
        <CreateNurse onValueChange={handleValueChange} />
      </div>
      <div className={`${nurseId ? "" : "hidden"}`}>
        <NurseForm nurseId={nurseId} />
      </div>
    </div>
  );
};

export default AddNurse;

// const createNurse = async (values) => {
//   const { data } = await axios.post("/nurse/add", { nurseId, ...values });

//   if (data) {
//     navigate("/Nurses/Nurse Action");
//   }
// };

// const navigate = useNavigate();
