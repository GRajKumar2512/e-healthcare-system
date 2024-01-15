import { Schema, model } from "mongoose";

const nurseSchema = new Schema({
  nurseId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  qualification: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
});

export default model("NurseRecord", nurseSchema);
