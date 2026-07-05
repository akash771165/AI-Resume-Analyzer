import JobMatchCard from "./JobMatchCard";
import MatchedSkillCard from "./MatchedSkillCard";
import SuggestionCard from "./SuggestionCard";

import { generatePDF } from "../utils/pdfReport";

import ScoreCard from "./ScoreCard";
import SummaryCard from "./SummaryCard";
import StrengthCard from "./StrengthCard";
import MissingSkillCard from "./MissingSkillCard";
import InterviewCard from "./InterviewCard";

function ResultCard({ result }) {
    return (
        <div className="mt-10 bg-slate-800 rounded-2xl p-8 text-white shadow-2xl">

            {/* ATS Score + Job Match */}
            <div className="grid md:grid-cols-2 gap-6">

                <ScoreCard score={result.atsScore} />

                <JobMatchCard score={result.jobMatch} />

            </div>

            {/* Analysis Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">

                <SummaryCard summary={result.summary} />

                <StrengthCard strengths={result.strengths} />

                <MatchedSkillCard skills={result.matchedSkills} />

                <MissingSkillCard skills={result.missingSkills} />

                <SuggestionCard
                    suggestions={result.improvementSuggestions}
                />

                <InterviewCard
                    questions={result.interviewQuestions}
                />

            </div>

            {/* PDF Download */}
            <div className="mt-8 flex justify-center">

                <button
                    onClick={() => generatePDF(result)}
                    className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl font-bold transition"
                >
                    📄 Download PDF Report
                </button>

            </div>

        </div>
    );
}

export default ResultCard;