import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newPassword = bcrypt.hashSync(password);

    const createUser = new User({
      name: name,
      email: email,
      password: newPassword,
      role: role,
    });

    await createUser.save();

    jwt.sign(
      {
        id: createUser._id,
        email: createUser.email,
        name: createUser.name,
        role: createUser.role,
      },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;

        res.cookie("token", token).status(200).send(createUser);
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
