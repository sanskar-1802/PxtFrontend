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
      navigate("/app");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-[radial-gradient(circle_at_top,#0f172a,#020617,black)]
    text-white p-4">

      <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2000&q=80')] bg-cover"></div>

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md p-8 rounded-2xl 
        bg-white/10 border border-white/20 backdrop-blur-2xl 
        shadow-[0_0_40px_#0ff]
        space-y-6"
      >
        <h1 className="text-4xl font-extrabold text-center tracking-wider">
          Register
        </h1>

        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="w-full p-3 rounded bg-black/40 border border-white/20"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded bg-black/40 border border-white/20"
            autoComplete="off"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full p-3 rounded bg-black/40 border border-white/20"
             autoComplete="new-password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded bg-gradient-to-r from-green-400 to-cyan-500 
          font-bold text-black shadow-lg hover:opacity-90 transition"
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
