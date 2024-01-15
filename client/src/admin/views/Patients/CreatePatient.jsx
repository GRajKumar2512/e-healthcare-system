import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(20, "keep the name short")
    .required("name is required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "must be 6 characters minimum")
    .max(12, "must be 12 characters maximum")
    .required("password is required"),
});

const CreatePatient = ({ onValueChange }) => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const { mutate } = useMutation({
    mutationFn: async (values) => {
      const { data } = await axios.post("/register", {
        ...values,
        role: "patient",
      });
      onValueChange(data);
    },
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={mutate}
      >
        <Form className="lg:w-[70%] md:w-[80%] shadow-lg mx-auto py-8 px-10 border bg-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-10">
            Create Patient Credentials:{" "}
          </h2>
          <div className="px-4 py-2">
            <label>Patient Name:</label>
            <Field
              type="text"
              id="name"
              name="name"
              className="input_div"
              placeholder="ex. John Doe"
            />
            <ErrorMessage
              name="name"
              component={"div"}
              className="text-red-500"
            />
          </div>
          <div className="px-4 py-2">
            <label>Email:</label>
            <Field
              type="text"
              id="email"
              name="email"
              className="input_div"
              placeholder="your@mail.com"
            />
            <ErrorMessage
              name="email"
              component={"div"}
              className="text-red-500"
            />
          </div>
          <div className="px-4 py-2">
            <label>Password:</label>
            <Field
              type="text"
              id="password"
              name="password"
              className="input_div"
              placeholder="password"
            />
            <ErrorMessage
              name="password"
              component={"div"}
              className="text-red-500"
            />
          </div>
          <div className="text-end mt-5">
            <button
              type="submit"
              className="bg-gray-800 px-4 py-2 rounded-lg text-white"
            >
              Register
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePatient;
