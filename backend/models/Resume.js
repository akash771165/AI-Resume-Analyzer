const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        fileName: {
            type: String,
            required: true,
        },

        atsScore: Number,

        jobMatch: Number,

        summary: String,

        strengths: [String],

        matchedSkills: [String],

        missingSkills: [String],

        improvementSuggestions: [String],

        interviewQuestions: [String],

        favorite: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Resume", resumeSchema);