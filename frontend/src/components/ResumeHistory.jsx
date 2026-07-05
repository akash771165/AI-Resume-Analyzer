import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ResumeHistory() {
    const [resumes, setResumes] = useState([]);
    const [search, setSearch] = useState("");
    const [minScore, setMinScore] = useState(0);

    useEffect(() => {
        fetchHistory();
    }, [search, minScore]);

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `http://localhost:5000/api/resumes?search=${search}&minScore=${minScore}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setResumes(res.data.resumes);

        } catch (error) {
            console.error(error);
        }
    };

    const deleteResume = async (id) => {
        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/resumes/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Resume Deleted");

            fetchHistory();

        } catch (error) {

            toast.error("Delete Failed");

        }
    };

    const toggleFavorite = async (id) => {
        try {

            const token = localStorage.getItem("token");

            await axios.patch(
                `http://localhost:5000/api/resumes/favorite/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchHistory();

        } catch (error) {

            toast.error("Favorite Update Failed");

        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-12">

            <h2 className="text-3xl font-bold text-white mb-8">
                📚 Resume History
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-8">

                <input
                    type="text"
                    placeholder="🔍 Search Resume..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-slate-800 text-white rounded-xl p-3 border border-slate-600"
                />

                <select
                    value={minScore}
                    onChange={(e) => setMinScore(e.target.value)}
                    className="bg-slate-800 text-white rounded-xl p-3 border border-slate-600"
                >
                    <option value="0">All ATS</option>
                    <option value="50">50+</option>
                    <option value="60">60+</option>
                    <option value="70">70+</option>
                    <option value="80">80+</option>
                    <option value="90">90+</option>
                </select>

            </div>

            <div className="space-y-6">

                {resumes.length === 0 && (
                    <div className="bg-slate-800 rounded-xl p-6 text-center text-slate-400">
                        No Resume Found
                    </div>
                )}

                {resumes.map((resume) => (

                    <div
                        key={resume._id}
                        className={`rounded-2xl p-6 shadow-lg transition border ${resume.favorite
                            ? "bg-yellow-900/20 border-yellow-500"
                            : "bg-slate-800 border-slate-700"
                            }`}
                    >

                        <div className="flex justify-between">

                            <div>

                                <h3 className="text-xl font-bold text-white">
                                    📄 {resume.fileName}
                                </h3>

                                <div className="flex gap-5 mt-3">

                                    <span className="text-green-400">
                                        ATS {resume.atsScore}%
                                    </span>

                                    <span className="text-blue-400">
                                        Match {resume.jobMatch}%
                                    </span>

                                </div>

                                <p className="text-slate-300 mt-4">
                                    {resume.summary}
                                </p>

                                <p className="text-slate-500 mt-4 text-sm">
                                    {new Date(
                                        resume.createdAt
                                    ).toLocaleString()}
                                </p>

                            </div>

                            <div className="flex flex-col gap-3">

                                <button
                                    onClick={() =>
                                        toggleFavorite(
                                            resume._id
                                        )
                                    }
                                    className="text-3xl"
                                >
                                    {resume.favorite
                                        ? "⭐"
                                        : "☆"}
                                </button>

                                <button
                                    onClick={() =>
                                        deleteResume(
                                            resume._id
                                        )
                                    }
                                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ResumeHistory;