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
        <h1 className="text-3xl font-extrabold text-center tracking-wider">
          Reset Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded bg-black/40 border border-white/20"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded bg-gradient-to-r from-cyan-400 to-blue-500 
          font-bold text-black shadow-lg hover:opacity-90 transition"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {status && <p className="text-center text-sm">{status}</p>}

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
