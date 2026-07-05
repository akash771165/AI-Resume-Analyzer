const { analyzeResume: analyzeWithGemini } = require("../services/geminiService");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");

const analyzeResume = async (req, res) => {
    try {
        const filePath = req.file.path;

        const dataBuffer = fs.readFileSync(filePath);

        const pdfData = await pdfParse(dataBuffer);

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

            improvementSuggestions:
                parsedResponse.improvementSuggestions,

            interviewQuestions:
                parsedResponse.interviewQuestions,
        });

        res.json({
            success: true,
            result: parsedResponse,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

module.exports = {
    analyzeResume,
};