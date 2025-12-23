import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNotifications } from "../services/notificationService";

export default function Navbar() {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
    const i = setInterval(loadNotifications, 5000);
    return () => clearInterval(i);
  }, []);

  const loadNotifications = async () => {
    const res = await getNotifications();
    const arr = res.data.notifications || [];
    setUnreadCount(arr.filter(n => !n.isRead).length);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <header
      className="
      fixed top-0 left-0 w-full z-50
      h-16 flex items-center justify-between

      px-8
      bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70
      backdrop-blur-2xl
      border-b border-white/10
      shadow-[0_0_40px_rgba(0,255,255,.25)]
    "
    >

      {/* LOGO */}
      <h1 className="
        text-3xl font-extrabold tracking-wider 
        bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 
        bg-clip-text text-transparent
        drop-shadow-[0_0_20px_rgba(0,255,255,.6)]
      ">
        PxT
      </h1>

      {/* NAV LINKS */}
     <nav className="flex items-center gap-8 text-sm font-semibold">
<NavLink
  to="/"
  className={({ isActive }) =>
    `relative transition-all duration-300 ${
      isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"
    }`
  }
>
  Home
</NavLink>

  <NavLink
    to="/app"
    end
    className={({ isActive }) =>
      `relative transition-all duration-300 ${
        isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"
      }`
    }
  >
    Dashboard
  </NavLink>

  <NavLink
    to="/app/transactions"
    className={({ isActive }) =>
      `relative transition-all duration-300 ${
        isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"
      }`
    }
  >
    Transactions
  </NavLink>

  <NavLink
    to="/app/budgets"
    className={({ isActive }) =>
      `relative transition-all duration-300 ${
        isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"
      }`
    }
  >
    Budgets
  </NavLink>

  <NavLink
    to="/app/goals"
    className={({ isActive }) =>
      `relative transition-all duration-300 ${
        isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"
      }`
    }
  >
    Goals
  </NavLink>

  <NavLink
    to="/app/notifications"
    className={({ isActive }) =>
      `relative transition-all duration-300 ${
        isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"
      }`
    }
  >
    Notifications
    {unreadCount > 0 && (
      <span className="absolute -top-3 -right-4 text-xs bg-red-500 text-white rounded-full px-2 py-[2px]">
        {unreadCount}
      </span>
    )}
  </NavLink>

</nav>

      {/* LOGOUT BUTTON */}
      <button
        onClick={logout}
        className="
          px-5 py-2 rounded-xl text-sm font-bold
          text-cyan-300 border border-cyan-500/40 
          bg-white/10 hover:bg-cyan-500/30
          transition-all duration-300
          shadow-[0_0_20px_rgba(0,255,255,.3)]
        "
      >
        Logout
      </button>
    </header>
  );
}
