function Hero() {
    return (
        <section className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">

            <h1 className="text-5xl font-bold">
                AI Resume Analyzer
            </h1>

            <p className="mt-4 max-w-2xl text-center text-slate-300">
                Analyze your resume with AI, calculate ATS score,
                identify missing skills and generate interview questions.
            </p>

            <button className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700 transition duration-300">
                🚀 Upload Resume
            </button>

        </section>
    );
}

export default Hero;