function InterviewCard({ questions }) {
    return (
        <div className="bg-slate-900 rounded-xl p-5 shadow-lg hover:scale-[1.02] transition">

            <h3 className="text-xl font-bold text-blue-400 mb-3">
                🎯 Interview Questions
            </h3>

            <ol className="space-y-3 list-decimal ml-5">
                {questions.map((question, index) => (
                    <li
                        key={index}
                        className="bg-blue-500/10 border border-blue-500 rounded-lg px-4 py-3"
                    >
                        {question}
                    </li>
                ))}
            </ol>

        </div>
    );
}

export default InterviewCard;