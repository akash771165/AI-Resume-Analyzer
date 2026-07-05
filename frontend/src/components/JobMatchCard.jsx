import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";

function JobMatchCard({ score }) {
    const color =
        score >= 80
            ? "#22c55e"
            : score >= 60
                ? "#facc15"
                : "#ef4444";

    return (
        <div className="bg-slate-900 rounded-2xl p-8 shadow-xl">
            <div className="w-44 h-44 mx-auto">
                <CircularProgressbar
                    value={score}
                    text={`${score}%`}
                    styles={buildStyles({
                        textSize: "18px",
                        pathColor: color,
                        textColor: "#ffffff",
                        trailColor: "#1e293b",
                    })}
                />
            </div>

            <h2 className="text-center text-2xl font-bold mt-6">
                Job Match
            </h2>
        </div>
    );
}

export default JobMatchCard;