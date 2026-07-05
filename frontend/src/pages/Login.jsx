import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                form
            );

            login(res.data.user, res.data.token);

            toast.success("Login Successful 🚀");

            navigate("/");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">

            <form
                onSubmit={handleSubmit}
                className="bg-slate-900 p-10 rounded-2xl shadow-xl w-full max-w-md"
            >

                <h1 className="text-3xl font-bold text-white text-center">
                    🔐 Login
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-8 w-full p-3 rounded-lg bg-slate-800 text-white"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="mt-4 w-full p-3 rounded-lg bg-slate-800 text-white"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-white font-bold"
                >
                    {loading ? "Logging In..." : "Login"}
                </button>

                <p className="text-center text-slate-400 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-400"
                    >
                        Register
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Login;