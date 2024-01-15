import express from "express";
import NurseRecord from "../models/NurseRecord.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const NurseRecords = await NurseRecord.find({});

    res.status(200).json(NurseRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const selectedNurse = await NurseRecord.findOne({ nurseId: id });

    const {
      firstName,
      lastName,
      dob,
      age,
      address,
      mobile,
      qualification,
      department,
      shift,
    } = selectedNurse;

    res
      .status(200)
      .json({
        firstName,
        lastName,
        dob,
        age,
        address,
        mobile,
        qualification,
        department,
        shift,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  const {
    nurseId,
    firstName,
    lastName,
    dob,
    age,
    address,
    mobile,
    qualification,
    department,
    shift,
  } = req.body;

  try {
    const createRecord = new NurseRecord({
      nurseId,
      firstName,
      lastName,
      dob,
      age,
      address,
      mobile,
      qualification,
      department,
      shift,
    });

    await createRecord.save();

    res.status(200).json(createRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    dob,
    age,
    address,
    mobile,
    qualification,
    department,
    shift,
  } = req.body;

  try {
    const updatedPatient = await NurseRecord.findByIdAndUpdate(id, {
      firstName,
      lastName,
      dob,
      age,
      address,
      mobile,
      qualification,
      department,
      shift,
    });

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await NurseRecord.findByIdAndDelete(id);

    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
