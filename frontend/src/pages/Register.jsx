import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        name: "",
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
                "http://localhost:5000/api/auth/register",
                form
            );

            login(res.data.user, res.data.token);

            toast.success("Registration Successful 🎉");

            navigate("/");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
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
                    📝 Register
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-8 w-full p-3 rounded-lg bg-slate-800 text-white"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-4 w-full p-3 rounded-lg bg-slate-800 text-white"
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
                    className="mt-6 w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl text-white font-bold"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="text-center text-slate-400 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-400"
                    >
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Register;