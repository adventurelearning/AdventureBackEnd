
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/config");
const contactRoutes = require("./routes/contactsRoutes");
const registerRoutes = require("./routes/registerRoutes");
const authRoutes = require("./routes/authRoutes");
const corporateTrainingRoutes = require("./routes/corporateTrainingRoutes");
const InternRoutes = require("./routes/InternRegisterRoute");
const JobApplicationRoutes = require("./routes/jobapplicationRoutes");
const contactTechRoutes = require("./routes/contactTechRoute");
const nodemailer=require("nodemailer")
const certificateRoutes = require('./routes/certificates');

console.log(nodemailer)

connectDB();

const PORT = process.env.PORT;

//middlewares

app.use(cors());
app.use(express.json());

app.use("/api/corporate-training", corporateTrainingRoutes);
// app.use('/api/admin',adminRouter)
app.use("/api/contacts", contactRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/intern", InternRoutes);
app.use("/api/jobapplication", JobApplicationRoutes);
app.use("/api/contact-tech", contactTechRoutes);
app.use("/api/certificates", certificateRoutes);


app.get("/", (req, res) => {
  res.send("Server is running Goodly");
});

app.listen(PORT, console.log(`Server is running at ${PORT}`));
