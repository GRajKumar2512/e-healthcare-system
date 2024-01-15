import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// import BookingDetail from "../../components/shared/BookingDetail";

const BookingsForm = () => {
  const [allNurse, setAllNurse] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      address: "",
      ailmentReason: "",
      currentMedication: "",
      nurse: "",
      fromDate: "",
      toDate: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
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
          patient: id,
          ...values,
        });
        if (data) {
          alert("Booking successful !");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  return (
    <div
      className="lg:w-[70%] md:w-[80%] mx-auto mt-20 p-5 border bg-gray-100"
      id="booking"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Booking:</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-2 my-3">
          <div className="w-full">
            <h2>Name:</h2>
            <input
              type="text"
              placeholder="Your name"
              {...formik.getFieldProps("name")}
              className="input_div"
            />
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
            onClick={() => {
              notify();
              setIsBooked(true);
            }}
          >
            Book
          </button>
        </div>
      </form>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="dark"
      />
    </div>
  );
};

export default BookingsForm;
