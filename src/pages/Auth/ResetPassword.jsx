import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (password !== confirm) {
      setStatus("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/request-password/${token}`,
        { password }
      );

      setStatus("Password reset successfully 🎉 Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setStatus(err.response?.data?.message || "Reset failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white p-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 p-8 rounded-2xl backdrop-blur-xl border border-white/20 shadow-xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center">
          Reset Password
        </h1>

        <div>
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            className="w-full p-2 rounded bg-white/20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full p-2 rounded bg-white/20"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        {status && (
          <p className="text-center text-sm mt-2 text-cyan-300">
            {status}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 rounded bg-gradient-to-r from-cyan-400 to-blue-500 font-bold text-slate-900 disabled:opacity-60"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p className="text-sm text-center">
          Back to{" "}
          <Link to="/login" className="text-cyan-400">
            Login
          </Link>
        </p>
      </form>

    </div>
  );
}
