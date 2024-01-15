import transporter from "./Nodemailer.js";

async function sendBookingConfirmationEmail(nurseEmail) {
  try {
    const mailOptions = {
      from: "bot101byraj@gmail.com",
      to: nurseEmail,
      subject: "Booking Confirmation",
      text: "You have a new booking. Please check your schedule :)",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
}

export default sendBookingConfirmationEmail;
