import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-slate-900 shadow-lg">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-400"
                >
                    AI Resume Analyzer
                </Link>

                <div className="flex items-center gap-5">

                    {user && (
                        <>
                            <span className="text-white font-semibold">
                                👋 {user.name}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white font-semibold transition"
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;