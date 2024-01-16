import express from "express";
import Booking from "../models/Booking.js";
import NurseRecord from "../models/NurseRecord.js";
import sendBookingConfirmationEmail from "../lib/sendEmail.js";

const router = express.Router();

router.get("/patient/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bookings = await Booking.find({ patient: id }).populate("nurse");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/nurse/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bookings = await Booking.find({ nurse: id });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// send mail to the nurse email id
router.post("/", async (req, res) => {
  const {
    contact,
    address,
    ailmentReason,
    currentMedication,
    nurse,
    patient,
    fromDate,
    toDate,
  } = req.body;

  try {
    const createdBooking = new Booking({
      contact,
      address,
      ailmentReason,
      currentMedication,
      nurse,
      patient,
      fromDate,
      toDate,
    });

    await createdBooking.save();

    const populatedBooking = await Booking.findById(
      createdBooking._id
    ).populate("nurse");
    const nurseEmail = populatedBooking.nurse.email;

    console.log(nurseEmail);

    await sendBookingConfirmationEmail(nurseEmail);

    res.status(200).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allBookings = await Booking.find({}).populate(["nurse", "patient"]);

    res.status(200).json(allBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
