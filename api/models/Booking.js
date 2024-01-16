import { Schema, model } from "mongoose";

const BookingSchema = new Schema({
  contact: { type: String, required: true },
  address: { type: String, required: true },
  ailmentReason: { type: String, required: true },
  currentMedication: { type: String },
  nurse: { type: Schema.Types.ObjectId, ref: "User", required: true },
  patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
});

export default model("Booking", BookingSchema);
