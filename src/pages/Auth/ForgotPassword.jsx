import { useState } from "react";
import { requestPasswordReset } from "../../services/authService";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      await requestPasswordReset({ email });
      setStatus("Password reset link sent to your email.");
    } catch {
      setStatus("Failed to send reset link.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 p-8 rounded-2xl backdrop-blur-xl border border-white/20 shadow-xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center">Forgot Password</h1>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-white/20"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 rounded bg-gradient-to-r from-cyan-400 to-blue-500 font-bold text-slate-900"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {status && <p className="text-sm text-center mt-3">{status}</p>}

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
