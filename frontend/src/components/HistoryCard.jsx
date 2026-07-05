import api from "../api/axios";
import { toast } from "react-toastify";

function HistoryCard({ resume, fetchHistory }) {

    const handleDelete = async () => {

        if (!window.confirm("Delete this resume?")) return;

        try {

            const token = localStorage.getItem("token");

            await api.delete(
                `/api/resumes/${resume._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Resume Deleted");

            fetchHistory();

        } catch (error) {

            console.error(error);

            toast.error("Delete Failed");

        }

    };

    return (
        <div className="bg-slate-800 rounded-xl p-5 shadow-lg">

            <h2 className="text-xl font-bold text-white">
                📄 {resume.fileName}
            </h2>

            <div className="mt-4 flex gap-3">

                <span className="bg-green-600 px-3 py-1 rounded-lg">
                    ATS {resume.atsScore}%
                </span>

                <span className="bg-blue-600 px-3 py-1 rounded-lg">
                    Match {resume.jobMatch}%
                </span>

            </div>

            <p className="text-slate-300 mt-4">
                {resume.summary}
            </p>

            <p className="text-sm text-slate-500 mt-4">
                {new Date(resume.createdAt).toLocaleString()}
            </p>

            <button
                onClick={handleDelete}
                className="mt-6 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg transition"
            >
                🗑 Delete
            </button>

        </div>
    );
}

export default HistoryCard;