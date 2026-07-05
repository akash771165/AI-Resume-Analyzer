const Resume = require("../models/Resume");

// GET ALL RESUMES
const getAllResumes = async (req, res) => {
    try {
        const { search = "", minScore = 0 } = req.query;

        const resumes = await Resume.find({
            user: req.user,
            fileName: {
                $regex: search,
                $options: "i",
            },
            atsScore: {
                $gte: Number(minScore),
            },
        }).sort({
            createdAt: -1,
        });

        res.json({
            success: true,
            resumes,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

// TOGGLE FAVORITE
const toggleFavorite = async (req, res) => {
    try {

        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user,
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume Not Found",
            });
        }

        resume.favorite = !resume.favorite;

        await resume.save();

        res.json({
            success: true,
            favorite: resume.favorite,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

// DELETE
const deleteResume = async (req, res) => {
    try {

        await Resume.findOneAndDelete({
            _id: req.params.id,
            user: req.user,
        });

        res.json({
            success: true,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
        });

    }
};

// DASHBOARD
const getStats = async (req, res) => {
    try {

        const resumes = await Resume.find({
            user: req.user,
        });

        const total = resumes.length;

        const avgATS =
            total === 0
                ? 0
                : Math.round(
                    resumes.reduce(
                        (sum, r) => sum + r.atsScore,
                        0
                    ) / total
                );

        const avgMatch =
            total === 0
                ? 0
                : Math.round(
                    resumes.reduce(
                        (sum, r) => sum + r.jobMatch,
                        0
                    ) / total
                );

        const bestATS =
            total === 0
                ? 0
                : Math.max(...resumes.map(r => r.atsScore));

        const favorites = resumes.filter(
            r => r.favorite
        ).length;

        res.json({
            success: true,
            stats: {
                total,
                avgATS,
                avgMatch,
                bestATS,
                favorites,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
        });

    }
};

module.exports = {
    getAllResumes,
    deleteResume,
    getStats,
    toggleFavorite,
};