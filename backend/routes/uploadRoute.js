const express = require("express");
const multer = require("multer");

const { analyzeResume } = require("../controllers/analyzeController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage,
});

router.post(
    "/",
    protect,
    upload.single("resume"),
    analyzeResume
);

module.exports = router;