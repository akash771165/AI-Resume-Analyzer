function SuggestionCard({ suggestions }) {
    return (
        <div className="bg-slate-900 rounded-xl p-5">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">
                💡 Improvement Suggestions
            </h3>

            <ul className="list-disc ml-5 space-y-2">
                {suggestions.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default SuggestionCard;