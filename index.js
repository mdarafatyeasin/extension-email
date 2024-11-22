const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json()); 
app.use(cors()); 

// POST endpoint to send email
app.post("/send-email", async (req, res) => {
  const { email, name } = req.body;

  // Validate user data
  if (!email || !name) {
    return res.status(400).json({ success: false, error: "Missing email or name" });
  }

  try {
    // Create the transporter for sending emails (using Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yeasinarafat54239@gmail.com",  // Your Gmail address
        pass: "wiaj qoih ujgf xkka",  // Your Gmail app password (not your Gmail password)
      },
    });

    // Set up the email content
    const mailOptions = {
      from: "yeasinarafat54239@gmail.com",  // Sender's email address
      to: email,  // Recipient's email address
      subject: "Login Successful",  // Email subject
      text: `Hello ${name},\n\nYou have successfully logged into the app! Welcome!`,  // Email body text
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server on port 3000
app.get('/', (req, res) => {
    res.send('Hello extension!')
})

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
