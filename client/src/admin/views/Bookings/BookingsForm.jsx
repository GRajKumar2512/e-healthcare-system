import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// import BookingDetail from "../../components/shared/BookingDetail";

const BookingsForm = () => {
  const navigate = useNavigate();

  const success = () =>
    toast.success("Booking successful !", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const failure = () =>
    toast.error("Booking failed !", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const { data: allNurse, isLoading: isNursesLoading } = useQuery({
    queryKey: ["nurseAvailable"],
    queryFn: async () => {
      const { data } = await axios.get("/nurse");
      return data;
    },
  });

  const { data: allPatient, isLoading: isPatientsLoading } = useQuery({
    queryKey: ["patientAvailable"],
    queryFn: async () => {
      const { data } = await axios.get("/patient");
      return data;
    },
  });

  const formik = useFormik({
    initialValues: {
      patient: "",
      contact: "",
      address: "",
      ailmentReason: "",
      currentMedication: "",
      nurse: "",
      fromDate: "",
      toDate: "",
    },
    validationSchema: Yup.object({
      patient: Yup.string().required("Required"),
      contact: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      ailmentReason: Yup.string().required("Required"),
      currentMedication: Yup.string(),
      nurse: Yup.string().required("Required"),
      fromDate: Yup.date().required("Required"),
      toDate: Yup.date().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post("/book-nurse", {
          ...values,
        });
        if (data) {
          success();
          navigate("/Bookings/All Bookings");
        }
      } catch (error) {
        failure();
      }
    },
  });

  if (isNursesLoading || isPatientsLoading) {
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
          <p className="text-slate-500 font-thin">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="lg:w-[70%] md:w-[80%] shadow-lg mx-auto mt-20 p-5 border bg-gray-100"
      id="booking"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Booking:</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-2 my-3">
          <div className="w-full">
            <h2>Patient:</h2>
            <select {...formik.getFieldProps("patient")} className="input_div">
              <option value="" label="Select Patient" />
              {allPatient &&
                allPatient.map((patient) => (
                  <option key={patient.patientId} value={patient.patientId}>
                    {patient.firstname}
                  </option>
                ))}
            </select>
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
          </div>
          <div className="w-full">
            <h2>Contact:</h2>
            <input
              type="text"
              placeholder="Your number"
              {...formik.getFieldProps("contact")}
              className="input_div"
            />
            {formik.touched.contact && formik.errors.contact && (
              <div className="text-red-500">{formik.errors.contact}</div>
            )}
          </div>
        </div>

        <div className="w-full">
          <h2>Address:</h2>
          <input
            type="text"
            placeholder="H.No, Street, Area, City"
            {...formik.getFieldProps("address")}
            className="input_div"
          />
          {formik.touched.address && formik.errors.address && (
            <div className="text-red-500">{formik.errors.address}</div>
          )}
        </div>

        <div className="flex gap-2 my-3">
          <div className="w-full">
            <h2>Reason & Ailment:</h2>
            <input
              type="text"
              placeholder="Reason or medical concerns..."
              {...formik.getFieldProps("ailmentReason")}
              className="input_div"
            />
            {formik.touched.ailmentReason && formik.errors.ailmentReason && (
              <div className="text-red-500">{formik.errors.ailmentReason}</div>
            )}
          </div>
          <div className="w-full">
            <h2>Current Medication:</h2>
            <input
              type="text"
              placeholder="If any"
              {...formik.getFieldProps("currentMedication")}
              className="input_div"
            />
            {formik.touched.currentMedication &&
              formik.errors.currentMedication && (
                <div className="text-red-500">
                  {formik.errors.currentMedication}
                </div>
              )}
          </div>
        </div>

        <div className="flex gap-2 my-3">
          <div className="w-full">
            <h2>Nurse:</h2>
            <select {...formik.getFieldProps("nurse")} className="input_div">
              <option value="" label="Select Nurse" />
              {allNurse &&
                allNurse.map((nurse) => (
                  <option key={nurse.nurseId} value={nurse.nurseId}>
                    {nurse.firstName}
                  </option>
                ))}
            </select>
            {formik.touched.nurse && formik.errors.nurse && (
              <div className="text-red-500">{formik.errors.nurse}</div>
            )}
          </div>
          <div className="w-full">
            <h2>From:</h2>
            <input
              type="date"
              {...formik.getFieldProps("fromDate")}
              className="input_div"
            />
            {formik.touched.fromDate && formik.errors.fromDate && (
              <div className="text-red-500">{formik.errors.fromDate}</div>
            )}
          </div>
          <div className="w-full">
            <h2>To:</h2>
            <input
              type="date"
              {...formik.getFieldProps("toDate")}
              className="input_div"
            />
            {formik.touched.toDate && formik.errors.toDate && (
              <div className="text-red-500">{formik.errors.toDate}</div>
            )}
          </div>
        </div>

        <div className="text-end">
          <button
            type="submit"
            className="bg-gray-800 px-7 py-2 rounded-lg text-white"
          >
            Book
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BookingsForm;
