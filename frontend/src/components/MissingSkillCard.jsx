function MissingSkillCard({ skills }) {
    return (
        <div className="bg-slate-900 rounded-xl p-5 shadow-lg hover:scale-[1.02] transition">

            <h3 className="text-xl font-bold text-red-400 mb-3">
                ❌ Missing Skills
            </h3>

            <ul className="space-y-3">
                {skills.map((item, index) => (
                    <li
                        key={index}
                        className="bg-red-500/10 border border-red-500 rounded-lg px-4 py-2"
                    >
                        {item}
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default MissingSkillCard;