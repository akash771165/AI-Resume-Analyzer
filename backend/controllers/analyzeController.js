const { analyzeResume: analyzeWithGemini } = require("../services/geminiService");
const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");

const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required",
            });
        }

        // Read PDF directly from memory
        const pdfData = await pdfParse(req.file.buffer);

        const jobDescription = req.body.jobDescription || "";

        const aiResponse = await analyzeWithGemini(
            pdfData.text,
            jobDescription
        );

        let parsedResponse;

        try {
            const cleanResponse = aiResponse
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            parsedResponse = JSON.parse(cleanResponse);

        } catch (error) {

            console.error("JSON Parse Error:", error);

            return res.status(500).json({
                success: false,
                message: "Invalid AI Response",
            });

        }

        await Resume.create({
            user: req.user,
            fileName: req.file.originalname,
            atsScore: parsedResponse.atsScore,
            jobMatch: parsedResponse.jobMatch,
            summary: parsedResponse.summary,
            strengths: parsedResponse.strengths,
            matchedSkills: parsedResponse.matchedSkills,
            missingSkills: parsedResponse.missingSkills,
            improvementSuggestions: parsedResponse.improvementSuggestions,
            interviewQuestions: parsedResponse.interviewQuestions,
        });

        res.json({
            success: true,
            result: parsedResponse,
        });

    } catch (error) {

        console.error("Analyze Resume Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    analyzeResume,
};