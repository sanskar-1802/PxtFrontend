import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  /* ----------------------- THEME HANDLER ----------------------- */
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  /* ------------------------ LOGOUT ------------------------------ */
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <header
      className="
      h-16 w-full flex items-center justify-between 
      px-6 border-b border-white/10 bg-white/5 dark:bg-black/20 
      backdrop-blur-xl shadow-md transition-all duration-300
    "
    >
      {/* CENTERED LOGO */}
      <div className="flex items-center gap-2">
        <span className="
          text-3xl font-extrabold tracking-wider 
          bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 
          bg-clip-text text-transparent
        ">
          PxT
        </span>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-4">

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="
            px-3 py-1.5 rounded-lg text-sm font-semibold 
            bg-white/10 dark:bg-white/20
            hover:bg-white/20 transition-all
          "
        >
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="
            px-4 py-2 rounded-lg text-sm font-semibold 
            text-cyan-300 border border-cyan-500/40 
            hover:bg-cyan-500/20 transition-all
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
}
