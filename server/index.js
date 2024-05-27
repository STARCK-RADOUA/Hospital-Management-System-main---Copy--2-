const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const DepartementRoute = require("./routes/DepartementRoute");
const nodemailer = require("nodemailer");

const getAllPatients = require("./routes/api/getAllPatients");
const getPatientByID = require("./routes/api/getPatientByID");
const createPatient = require("./routes/api/createPatient");
const editPatientByID = require("./routes/api/editPatientByID");
const deletePatientByID = require("./routes/api/deletePatientByID");
const LoginRegisterRoute = require("./routes/LoginRegisterRoute.js");
const UserRoute = require("./routes/UserRoute.js");
const DashboardRoute = require("./routes/DashboardRoute.js");
const PatientRoute = require("./routes/PatientRoute.js");
const DoctorRoute = require("./routes/DoctorRoute.js");
const AppointmentRoute = require("./routes/AppointmentRoute.js");
const MedicineRoute = require("./routes/MedicineRoute.js");
const PrescriptionRoute = require("./routes/PrescriptionRoute.js");
const InvoiceRoute = require("./routes/InvoiceRoute.js");
const ProfileRoute = require("./routes/ProfileRoute.js");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://saadi0mehdi:1cmu7lEhWPTW1vGk@cluster0.whkh7vj.mongodb.net/myBase?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true }
);

app.listen(3001, () => {
  console.log("App listening on port " + 3001);
});

app.use(LoginRegisterRoute);
app.use(DashboardRoute);
app.use(UserRoute);
app.use(PatientRoute);
app.use(DoctorRoute);
app.use(AppointmentRoute);
app.use(MedicineRoute);
app.use(PrescriptionRoute);
app.use(InvoiceRoute);
app.use(ProfileRoute);
app.use(DepartementRoute);

app.post("/api/message", async (req, res) => {
  const { email, tx, message } = req.body;
  const htmlContent = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #f0f0f0;
          border-radius: 8px;
          background-color: #ffffff;
        }
        .header {
          text-align: center;
          padding: 10px 0;
          background-color: #4CAF50;
          color: white;
          border-radius: 8px 8px 0 0;
        }
        .content {
          padding: 20px;
        }
        .footer {
          text-align: center;
          padding: 10px 0;
          font-size: 12px;
          color: #888888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Message Received</h1>
        </div>
        <div class="content">
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${tx}</p>
          <h2>Message</h2>
          <p>${message}</p>
        </div>
        <div class="footer">
          <p>This email was sent from your website.</p>
        </div>
      </div>
    </body>
  </html>
`;

  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "saadi.0mehdi@gmail.com", // Replace with your Gmail email address
        pass: "omih wcwo pamu mkjo", // Replace with your Gmail account password or app-specific password
      },
    });

    const mailOptions = {
      from: "",
      to: "saadi.0mehdi@gmail.com",
      subject: "New Message from Arrahmawebsite",
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send("Email Sent!");
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    res.status(500).send("Error occurred while sending email.");
  }
});

app.use("/api/paypal", require("./routes/api/paypal"));

app.use("/api/ask", require("./routes/api/ask"));
app.get("/", (req, res) => {
  res.send("hello world");
});
