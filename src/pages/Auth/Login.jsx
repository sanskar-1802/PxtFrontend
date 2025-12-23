import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await loginUser(form);
      login(data.accessToken, data.refreshToken);
      navigate("/app");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
          Login
        </h1>

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
          className="w-full p-3 rounded bg-gradient-to-r from-cyan-400 to-blue-500 
          font-bold text-black shadow-lg hover:opacity-90 transition"
        >
          Login
        </button>

        <div className="flex justify-between text-sm">
          <Link to="/forgot-password" className="text-cyan-400">
            Forgot Password?
          </Link>

          <Link to="/register" className="text-cyan-400">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
}
