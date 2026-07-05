function SummaryCard({ summary }) {
    return (
        <div className="bg-slate-900 rounded-xl p-5 shadow-lg hover:scale-[1.02] transition">

            <h3 className="text-xl font-bold mb-3">
                📝 Summary
            </h3>

            <p className="text-slate-300 leading-7">
                {summary}
            </p>

        </div>
    );
}

export default SummaryCard;