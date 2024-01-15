import express from "express";
import PatientRecord from "../models/PatientRecord.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const patientRecords = await PatientRecord.find({});

    res.status(200).json(patientRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const selectedPatient = await PatientRecord.findOne({ patientId: id });

    const {
      firstname,
      lastname,
      dob,
      age,
      address,
      mobile,
      ailment,
      patientType,
    } = selectedPatient;

    res
      .status(200)
      .json({
        firstname,
        lastname,
        dob,
        age,
        address,
        mobile,
        ailment,
        patientType,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  const {
    patientId,
    firstname,
    lastname,
    dob,
    age,
    address,
    mobile,
    ailment,
    patientType,
  } = req.body;

  try {
    const createRecord = new PatientRecord({
      patientId,
      firstname,
      lastname,
      dob,
      age,
      address,
      mobile,
      ailment,
      patientType,
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
    firstname,
    lastname,
    dob,
    age,
    address,
    mobile,
    ailment,
    patientType,
  } = req.body;

  try {
    const updatedPatient = await PatientRecord.findByIdAndUpdate(id, {
      firstname,
      lastname,
      dob,
      age,
      address,
      mobile,
      ailment,
      patientType,
    });

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await PatientRecord.findByIdAndDelete(id);

    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
