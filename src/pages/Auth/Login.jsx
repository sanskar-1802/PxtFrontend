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
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
        <h1 className="text-3xl font-bold text-center">Login</h1>

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
          Login
        </button>

        <div className="text-center text-sm">
          <Link to="/forgot-password" className="text-cyan-400">
            Forgot Password?
          </Link>
        </div>

        <p className="text-sm text-center">
          Not registered?{" "}
          <Link to="/register" className="text-cyan-400">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
