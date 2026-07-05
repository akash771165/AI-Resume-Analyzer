const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getAllResumes,
    deleteResume,
    getStats,
    toggleFavorite,
} = require("../controllers/resumeController");

router.get("/", protect, getAllResumes);

router.get("/stats", protect, getStats);

router.patch(
    "/favorite/:id",
    protect,
    toggleFavorite
);

router.delete(
    "/:id",
    protect,
    deleteResume
);

module.exports = router;