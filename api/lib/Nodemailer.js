import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "bot101byraj@gmail.com",
    pass: "qljlccavjdfryalr",
  },
});

export default transporter;
