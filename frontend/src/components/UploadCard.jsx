import ResultCard from "./ResultCard";
import DropZone from "./DropZone";
import api from "../api/axios";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UploadCard() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    const resultRef = useRef(null);
    const navigate = useNavigate();

    const handleAnalyze = async () => {
        if (!file) {
            toast.warning("Please select a resume 📄");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);
        formData.append("jobDescription", jobDescription);

        try {
            setLoading(true);
            setUploadProgress(0);

            const response = await api.post(
                "/api/upload",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },

                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) /
                            progressEvent.total
                        );

                        setUploadProgress(percent);
                    },
                }
            );

            setResult(response.data.result);

            toast.success("Resume analyzed successfully 🚀");

            setTimeout(() => {
                resultRef.current?.scrollIntoView({
                    behavior: "smooth",
                });
            }, 300);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Upload Failed"
            );

        } finally {

            setLoading(false);
            setUploadProgress(0);

        }
    };

    return (
        <div className="mt-12 border-2 border-dashed border-slate-600 rounded-2xl p-10 max-w-4xl mx-auto text-center bg-slate-900">

            <h2 className="text-3xl font-bold text-white">
                📄 Upload Your Resume
            </h2>

            <p className="mt-4 text-slate-300">
                Upload your PDF resume and get an AI-powered ATS analysis.
            </p>

            <DropZone
                file={file}
                setFile={setFile}
            />

            <div className="mt-8 text-left">

                <label className="block text-white font-semibold mb-2">
                    💼 Paste Job Description (Optional)
                </label>

                <textarea
                    rows="8"
                    value={jobDescription}
                    onChange={(e) =>
                        setJobDescription(e.target.value)
                    }
                    placeholder="Paste the Job Description here..."
                    className="w-full bg-slate-800 text-white rounded-xl p-4 border border-slate-600 focus:outline-none focus:border-blue-500"
                />

            </div>

            {loading && (
                <div className="mt-6">

                    <div className="flex justify-between text-sm text-slate-300 mb-2">

                        <span>Uploading Resume...</span>

                        <span>{uploadProgress}%</span>

                    </div>

                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">

                        <div
                            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                            style={{
                                width: `${uploadProgress}%`,
                            }}
                        />

                    </div>

                </div>
            )}

            <button
                onClick={handleAnalyze}
                disabled={loading}
                className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto min-w-[220px]"
            >
                {loading ? (
                    <span className="flex items-center gap-2">

                        <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>

                        Analyzing...

                    </span>
                ) : (
                    "🚀 Analyze Resume"
                )}
            </button>

            <div ref={resultRef}>
                {result && <ResultCard result={result} />}
            </div>

        </div>
    );
}

export default UploadCard;