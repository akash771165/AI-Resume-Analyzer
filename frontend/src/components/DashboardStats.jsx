import { useEffect, useState } from "react";
import api from "../api/axios";

function DashboardStats() {

    const [stats, setStats] = useState({
        total: 0,
        avgATS: 0,
        avgMatch: 0,
        bestATS: 0,
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {

            const token = localStorage.getItem("token");

            const res = await api.get(
                "/api/resumes/stats",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setStats(res.data.stats);

        } catch (error) {
            console.error(error);
        }
    };

    const cards = [
        {
            title: "Total Reports",
            value: stats.total,
            color: "bg-blue-600",
            icon: "📄",
        },
        {
            title: "Average ATS",
            value: `${stats.avgATS}%`,
            color: "bg-green-600",
            icon: "⭐",
        },
        {
            title: "Average Match",
            value: `${stats.avgMatch}%`,
            color: "bg-yellow-500",
            icon: "🎯",
        },
        {
            title: "Best ATS",
            value: `${stats.bestATS}%`,
            color: "bg-purple-600",
            icon: "🏆",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto mt-12">

            <h2 className="text-3xl font-bold text-white mb-8 text-center">
                📊 Dashboard Analytics
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`${card.color} rounded-2xl p-6 text-center`}
                    >
                        <div className="text-5xl">
                            {card.icon}
                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-white">
                            {card.title}
                        </h3>

                        <p className="mt-3 text-4xl font-bold text-white">
                            {card.value}
                        </p>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default DashboardStats;