import { Schema, model } from "mongoose";

const patientSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  ailment: {
    type: String,
    required: true,
  },
  patientType: {
    type: String,
    required: true,
  },
});

export default model("PatientRecord", patientSchema);
