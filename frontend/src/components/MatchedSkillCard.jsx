function MatchedSkillCard({ skills }) {
    return (
        <div className="bg-slate-900 rounded-xl p-5">
            <h3 className="text-xl font-bold text-green-400 mb-3">
                ✅ Matched Skills
            </h3>

            <ul className="list-disc ml-5 space-y-2">
                {skills.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default MatchedSkillCard;