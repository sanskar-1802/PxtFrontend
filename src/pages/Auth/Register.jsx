import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useLoading } from "../../context/LoadingContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 p-8 rounded-2xl backdrop-blur-xl border border-white/20 shadow-xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center">Register</h1>

        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-white/20"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-white/20"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 rounded bg-white/20"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 rounded bg-gradient-to-r from-cyan-400 to-blue-500 font-bold text-slate-900 disabled:opacity-60"
        >
          Register
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
