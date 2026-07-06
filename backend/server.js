const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const connectDB = require("./config/db");
connectDB();

const uploadRoute = require("./routes/uploadRoute");
const resumeRoute = require("./routes/resumeRoute");
const authRoute = require("./routes/authRoute");

const app = express();

// Create uploads folder automatically
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("✅ uploads folder created");
}

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

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
        message: "Backend Connected Successfully 🚀",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});