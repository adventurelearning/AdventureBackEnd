const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/config");
const contactRoutes = require("./routes/contactsRoutes");
const registerRoutes = require("./routes/registerRoutes");
const authRoutes = require("./routes/authRoutes");

const corporateTrainingRoutes = require("./routes/corporateTrainingRoutes");
require("dotenv").config();

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

app.get("/", (req, res) => {
  res.send("Server is running Goodly");
});

app.listen(PORT, console.log(`Server is running at ${PORT}`));
