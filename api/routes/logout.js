import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.cookie("token", "").json({ message: "logout successful" });
});

export default router;
