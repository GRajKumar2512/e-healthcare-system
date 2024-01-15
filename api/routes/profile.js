import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(403).json({ message: "no token found" });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
        if (err) throw err;
        return res.json(userData);
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
