import { Link } from "react-router-dom";

export default function HomeNavbar() {
  return (
    <header
      className="
      fixed top-0 left-0 w-full z-50
      h-16 flex items-center justify-between
      px-8
      bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80
      backdrop-blur-2xl
      border-b border-white/10
      shadow-[0_0_40px_rgba(0,255,255,.25)]
    "
    >

      {/* LOGO */}
      <h1
        className="
        text-3xl font-extrabold tracking-wider 
        bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 
        bg-clip-text text-transparent
      "
      >
        PxT
      </h1>

      {/* NAV LINKS */}
      <nav className="flex items-center gap-6 text-sm font-semibold">

        <Link
          to="/"
          className="text-slate-300 hover:text-cyan-400 transition"
        >
          Home
        </Link>



      </nav>

    </header>
  );
}
