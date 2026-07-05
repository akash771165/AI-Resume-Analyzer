const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();
const uploadRoute = require("./routes/uploadRoute");
const resumeRoute = require("./routes/resumeRoute");
const authRoute = require("./routes/authRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/upload", uploadRoute);
app.use("/api/resumes", resumeRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
    res.send("🚀 AI Resume Analyzer Backend is Running!");
});
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Backend Connected Successfully 🚀"
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});