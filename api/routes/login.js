import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    console.log("started searching for the user");
    const checkUser = await User.findOne({ email: email, role: role });
    console.log("finished search");

    if (!checkUser) {
      return res.status(404).json({ message: "No User with this credentials" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, checkUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
        name: checkUser.name,
        role: checkUser.role,
      },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;

        return res.cookie("token", token).status(200).send(checkUser);
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
