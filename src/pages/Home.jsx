import { Link } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
// import previewImg from "../assets/dashboard-preview.png";

export default function Home() {

  return (
    <div className="min-h-screen w-full text-white bg-[#020617]">
      
      {/* HOME NAVBAR */}
      <HomeNavbar />

      {/* PAGE CONTENT */}
      <div className="pt-28 px-6">

        {/* HERO SECTION */}
        <div className="max-w-6xl mx-auto text-center space-y-6">

          <h1
            className="
              text-5xl font-extrabold tracking-wide
              bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500
              bg-clip-text text-transparent
            "
          >
            Personal Expense Tracker
          </h1>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Track expenses, plan budgets, achieve goals and stay financially disciplined with PxT.
          </p>

          {/* ALWAYS SHOW LOGIN & SIGNUP */}
          <div className="flex justify-center gap-4 mt-6">
            <Link
              to="/register"
              className="
                px-6 py-3 rounded-xl font-bold
                bg-gradient-to-r from-cyan-400 to-blue-500
                text-black shadow-lg hover:opacity-90 transition
              "
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="
                px-6 py-3 rounded-xl font-bold
                border border-cyan-400 text-cyan-300
                hover:bg-cyan-500/20 transition
              "
            >
              Login
            </Link>
          </div>

        </div>
{/* ================= APP PREVIEW ================= */}
<div className="max-w-6xl mx-auto mt-20 text-center">

  <h2 className="text-3xl font-bold mb-3">
    See Your Money Clearly
  </h2>

  <p className="text-gray-300 mb-8">
    Beautiful dashboard that turns your spending into meaningful insights.
  </p>

  <div className="
    bg-white/10 border border-white/20 backdrop-blur-xl
    rounded-2xl p-5 shadow-[0_0_40px_rgba(0,255,255,.25)]
    hover:scale-[1.01] transition glow-card
  ">
    <img
      src="/dashboard-preview.png"   // <-- replace with real screenshot
      alt="Dashboard Preview"
      className="rounded-xl"
    />
  </div>

</div>


{/* ================= FEATURES ================= */}
<div className="max-w-6xl mx-auto space-y-16 mt-20">


  {/* ================= TRACK EXPENSES ================= */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    {/* LEFT CARD – Title */}
    <div className="
      p-10 rounded-2xl
      bg-white/10 border border-white/20 backdrop-blur-xl
      shadow-[0_0_30px_rgba(0,255,255,.25)]
      flex flex-col justify-center items-center text-center glow-card
    ">
      <div className="text-7xl mb-3">💰</div>
      <h2 className="text-3xl font-bold">
        Track Expenses
      </h2>
    </div>

    {/* RIGHT CARD – Content */}
    <div className>
      <p className="text-gray-300 text-lg">
        Easily record incomes & expenses, view complete financial history
        and stay aware of your spending habits.
      </p>
    </div>

  </div>



  {/* ================= SMART DASHBOARD ================= */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    {/* LEFT CARD – Content */}
    <div>
      <p className="text-gray-300 text-lg text-left md:text-right">
        Visual charts show monthly spending trends, comparisons,
        and category-wise breakdowns to help you understand money flow.
      </p>
    </div>

    {/* RIGHT CARD – Title */}
    <div className="
      p-10 rounded-2xl
      bg-white/10 border border-white/20 backdrop-blur-xl
      shadow-[0_0_30px_rgba(0,255,255,.25)]
      flex flex-col justify-center items-center text-center
      order-1 md:order-2 glow-card
    ">
      <div className="text-7xl mb-3 text-blue-400">📊</div>
      <h2 className="text-3xl font-bold">
        Smart Dashboard
      </h2>
    </div>

  </div>



  {/* ================= ACHIEVE GOALS ================= */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    {/* LEFT CARD – Title */}
    <div className="
      p-10 rounded-2xl
      bg-white/10 border border-white/20 backdrop-blur-xl
      shadow-[0_0_30px_rgba(0,255,255,.25)]
      flex flex-col justify-center items-center text-center glow-card
    ">
      <div className="text-7xl mb-3 text-green-400">🎯</div>
      <h2 className="text-3xl font-bold">
        Achieve Goals
      </h2>
    </div>

    {/* RIGHT CARD – Content */}
    <div>
      <p className="text-gray-300 text-lg">
        Set financial goals, save step-by-step, track progress
        and celebrate when you achieve them 🎉
      </p>
    </div>

  </div>

</div>
{/* ================= HOW IT WORKS ================= */}
<div className="max-w-6xl mx-auto mt-24 text-center">

  <h2 className="text-3xl font-bold mb-2">
    How PxT Works
  </h2>

  <p className="text-gray-300 mb-10">
    Simple process to gain control over your finances
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div className="
      bg-white/10 border border-white/20 backdrop-blur-xl
      rounded-2xl p-6 glow-card
    ">
      <h3 className="text-5xl mb-3">①</h3>
      <h4 className="text-xl font-bold mb-1">Add Transactions</h4>
      <p className="text-gray-300">
        Record income & expenses in seconds.
      </p>
    </div>

    <div className="
      bg-white/10 border border-white/20 backdrop-blur-xl
      rounded-2xl p-6 glow-card
    ">
      <h3 className="text-5xl mb-3">②</h3>
      <h4 className="text-xl font-bold mb-1">Analyze Dashboard</h4>
      <p className="text-gray-300">
        See trends, charts & spending breakdown.
      </p>
    </div>

    <div className="
      bg-white/10 border border-white/20 backdrop-blur-xl
      rounded-2xl p-6 glow-card
    ">
      <h3 className="text-5xl mb-3">③</h3>
      <h4 className="text-xl font-bold mb-1">Achieve Goals</h4>
      <p className="text-gray-300">
        Save smarter & reach your financial targets.
      </p>
    </div>

  </div>

</div>

{/* ================= STATS SECTION ================= */}
<div className="max-w-6xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">

  <div className="
    bg-white/10 border border-white/20 backdrop-blur-xl
    rounded-2xl p-6 text-center shadow-[0_0_25px_rgba(0,255,255,.25)] glow-card
  ">
    <h3 className="text-4xl font-bold text-cyan-400">10,000+</h3>
    <p className="text-gray-300 mt-1">Transactions Tracked</p>
  </div>

  <div className="
    bg-white/10 border border-white/20 backdrop-blur-xl
    rounded-2xl p-6 text-center shadow-[0_0_25px_rgba(0,255,255,.25)] glow-card
  ">
    <h3 className="text-4xl font-bold text-blue-400">₹50,00,000+</h3>
    <p className="text-gray-300 mt-1">Money Managed</p>
  </div>

  <div className="
    bg-white/10 border border-white/20 backdrop-blur-xl
    rounded-2xl p-6 text-center shadow-[0_0_25px_rgba(0,255,255,.25)] glow-card
  ">
    <h3 className="text-4xl font-bold text-green-400">1,500+</h3>
    <p className="text-gray-300 mt-1">Goals Achieved</p>
  </div>

</div>



        {/* ================= FOOTER ================= */}
        <footer className="mt-20 py-8 text-center text-gray-400 border-t border-white/10">
          <p>© {new Date().getFullYear()} PxT - Personal Expense Tracker</p>
          
        </footer>

      </div>

    </div>
  );
}
