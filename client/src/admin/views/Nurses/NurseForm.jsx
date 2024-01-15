import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const regExp = /^[0-9]{10}$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  dob: Yup.date().required("Date of Birth is required"),
  age: Yup.number().required("Age is required"),
  address: Yup.string().required("Address is required"),
  mobile: Yup.string()
    .matches(regExp, "Invalid Number")
    .required("Mobile No is required"),
  qualification: Yup.string().required("Qualification is required"),
  department: Yup.string().required("Department is required"),
  shift: Yup.string().required("Shift is required"),
});

const NurseForm = ({ nurseId }) => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    dob: "",
    age: "",
    address: "",
    mobile: "",
    qualification: "",
    department: "",
    shift: "",
  };

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (values) => {
      const { data } = await axios.post("/nurse/add", { nurseId, ...values });
    },
  });

  if (isSuccess) {
    navigate("/Nurses/Nurse Action");
  }

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
          <p className="text-slate-500 font-thin">Uploading details...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={mutate}
      >
        <Form className="lg:w-[70%] md:w-[80%] shadow-lg mx-auto py-8 px-10 border bg-gray-100">
          <div className="px-4 py-2">
            <label htmlFor="firstName">First Name:</label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              placeholder="John"
              className="input_div"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="px-4 py-2">
            <label htmlFor="lastName">Last Name:</label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Doe"
              className="input_div"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="px-4 py-2">
            <label htmlFor="dob">Date of Birth:</label>
            <Field
              type="date"
              id="dob"
              name="dob"
              placeholder=""
              className="input_div"
            />
            <ErrorMessage name="dob" component="div" className="text-red-500" />
          </div>

          <div className="px-4 py-2">
            <label htmlFor="age">Age:</label>
            <Field
              type="number"
              id="age"
              name="age"
              placeholder="eg. 23"
              className="input_div"
            />
            <ErrorMessage name="age" component="div" className="text-red-500" />
          </div>

          <div className="px-4 py-2">
            <label htmlFor="address">Address:</label>
            <Field
              type="text"
              id="address"
              name="address"
              placeholder="H. No, Street, Area, City"
              className="input_div"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="px-4 py-2">
            <label htmlFor="mobile">Mobile No:</label>
            <Field
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Your Mobile No."
              className="input_div"
            />
            <ErrorMessage
              name="mobile"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="px-4 py-2">
            <label htmlFor="qualification">Qualification:</label>
            <Field
              type="text"
              id="qualification"
              name="qualification"
              placeholder="eg. Bsc etc"
              className="input_div"
            />
            <ErrorMessage
              name="qualification"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="px-4 py-2">
            <label htmlFor="department">Department:</label>
            <Field
              type="text"
              id="department"
              name="department"
              placeholder="eg. Critical Care"
              className="input_div"
            />
            <ErrorMessage
              name="department"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="px-4 py-2">
            <label htmlFor="shift">Shift:</label>
            <Field
              type="text"
              id="shift"
              name="shift"
              placeholder="Night / Day"
              className="input_div"
            />
            <ErrorMessage
              name="shift"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="text-end mt-5">
            <button
              type="submit"
              className="bg-gray-800 px-4 py-2 rounded-lg text-white"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NurseForm;
