import { useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function ATSChart() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchChartData();
    }, []);

    const fetchChartData = async () => {
        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/resumes",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const chartData = res.data.resumes
                .slice()
                .reverse()
                .map((resume, index) => ({
                    name: `Resume ${index + 1}`,
                    ATS: resume.atsScore,
                    Match: resume.jobMatch,
                }));

            setData(chartData);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-12 bg-slate-800 rounded-2xl p-6">

            <h2 className="text-3xl font-bold text-white mb-6 text-center">
                📈 ATS Score Trend
            </h2>

            <ResponsiveContainer width="100%" height={350}>

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="ATS"
                        stroke="#22c55e"
                        strokeWidth={3}
                    />

                    <Line
                        type="monotone"
                        dataKey="Match"
                        stroke="#3b82f6"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}

export default ATSChart;