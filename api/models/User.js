import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "nurse", "patient"], required: true },
});

export default model("User", UserSchema);
