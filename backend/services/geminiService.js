const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeResume(
    resumeText,
    jobDescription
) {

    const prompt = `
You are an expert ATS (Applicant Tracking System) Resume Analyzer.

Your task is to compare the candidate's resume with the provided Job Description.

Analyze the resume professionally and return ONLY valid JSON.

Resume:
${resumeText}

Job Description:
${jobDescription || "No Job Description Provided"}

Instructions:
- Calculate ATS score (0-100).
- If a Job Description is provided, calculate Job Match score (0-100).
- Write a professional summary in 3-5 sentences.
- List the candidate's strengths.
- List matched skills found in both resume and job description.
- List missing skills or keywords.
- Suggest practical improvements to increase ATS score.
- Generate 5 interview questions based on the resume and job description.

Return ONLY this JSON format:

{
  "atsScore": 85,
  "jobMatch": 80,
  "summary": "",
  "strengths": [],
  "matchedSkills": [],
  "missingSkills": [],
  "improvementSuggestions": [],
  "interviewQuestions": []
}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response.text;
}

module.exports = {
    analyzeResume,
};