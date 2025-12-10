import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNotifications } from "../services/notificationService";
import pxtLogo from "../assets/pxtlogo.jpg";

const linkBase =
  "block px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200";
const inactiveClasses = "text-slate-300 hover:bg-white/10 hover:text-white";
const activeClasses =
  "bg-gradient-to-r from-cyan-400/80 to-blue-500/80 text-slate-900 shadow-lg";

export default function Sidebar() {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNotifications = async () => {
    const res = await getNotifications();
    const arr = res.data.notifications || [];
    setUnreadCount(arr.filter((n) => !n.isRead).length);
  };

  useEffect(() => {
    loadNotifications();
    window.refreshNotifications = loadNotifications;
    const interval = setInterval(loadNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/transactions", label: "Transactions" },
    { to: "/budgets", label: "Budgets" },
    { to: "/goals", label: "Goals" },
    { to: "/notifications", label: "Notifications" },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-slate-900/70 border-r border-white/10 backdrop-blur-2xl p-5">

      {/* 🔥 TOP LOGO + BRAND */}
<div className="mb-10 flex flex-col items-center justify-center gap-3">

  {/* Circular Logo */}
  <div className="w-35 h-35 rounded-full overflow-hidden border border-white/20 shadow-md flex items-center justify-center">
    <img
      src={pxtLogo}
      alt="PxT Logo"
      className="w-full h-full object-cover"
    />
  </div>


      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `${linkBase} flex justify-between items-center ${
                isActive ? activeClasses : inactiveClasses
              }`
            }
          >
            <span>{link.label}</span>

            {link.to === "/notifications" && unreadCount > 0 && (
              <span className="ml-2 text-xs bg-red-500 text-white rounded-full px-2 py-[2px]">
                {unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>


    </aside>
  );
}
