import express from "express";
import Booking from "../models/Booking.js";
import NurseRecord from "../models/NurseRecord.js";
import sendBookingConfirmationEmail from "../lib/sendEmail.js";

const router = express.Router();

// gets the list of bookings
router.get("/", async (req, res) => {
  try {
    const allBookings = await Booking.find({}).populate(["nurse", "patient"]);

    res.status(200).json(allBookings);
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

// get the bookings of this specific patient
router.get("/patient/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bookings = await Booking.find({ patient: id }).populate("nurse");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get the bookings assigned to this specific patient
router.get("/nurse/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bookings = await Booking.find({ nurse: id });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete the bookings with this specific id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Booking.findByIdAndDelete(id);

    res.status(200).json({ message: "Booking deletion successful !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
