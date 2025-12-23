import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full text-white bg-[#020617]">

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
    <main
  className="
    pt-24 px-6
    bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950
    min-h-[calc(100vh-64px)]
  "
>

        {/* remove max-width to make FULL SCREEN */}
        <div className="w-full">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
