import { useEffect, useState } from "react";
import { getAllExpenses, getGoals } from "../../services/dashboardService";
import {
  LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import { RadialBarChart, RadialBar } from "recharts";
import { createNotification } from "../../services/notificationService";
import { getBudgets } from "../../services/budgetService";

export default function Dashboard() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [savings, setSavings] = useState(0);
  const [expenseByCategory, setExpenseByCategory] = useState([]);
  const [trend, setTrend] = useState([]);
  const [goalProgress, setGoalProgress] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getAllExpenses();
      const expenses = Array.isArray(res.data) ? res.data : res.data.expenses || [];

      /* Income + Expense Totals */
      const incomeTotal = expenses
        .filter((t) => t.type === "income")
        .reduce((a, b) => a + Number(b.amount || 0), 0);

      const expenseTotal = expenses
        .filter((t) => t.type === "expense")
        .reduce((a, b) => a + Number(b.amount || 0), 0);

      setIncome(incomeTotal);
      setExpense(expenseTotal);
      setSavings(incomeTotal - expenseTotal);

      /* ----- Notifications ----- */
      if (expenseTotal > incomeTotal && !window.__highExpense) {
        window.__highExpense = true;
        createNotification({
          type: "warning",
          message: "⚠ Your expenses have exceeded your savings!"
        });
      }

      /* Pie Chart Data */
      const cat = {};
      expenses
        .filter((t) => t.type === "expense")
        .forEach((e) => {
          cat[e.category] = (cat[e.category] || 0) + Number(e.amount || 0);
        });

      setExpenseByCategory(
        Object.entries(cat).map(([category, value]) => ({ name: category, value }))
      );

      /* Budget Alerts */
      const bud = await getBudgets();
      const budgets = Array.isArray(bud.data) ? bud.data : bud.data.budgets || [];

      if (!window.__budgetFlags) window.__budgetFlags = {};

      budgets.forEach((b) => {
        const spent = cat[b.category] || 0;
        if (spent > b.limit && !window.__budgetFlags[b.category]) {
          window.__budgetFlags[b.category] = true;
          createNotification({
            type: "danger",
            message: `🔥 Budget exceeded for "${b.category}"!`
          });
        }
      });

      /* Trend Chart (Monthly) */
      const monthly = {};
      expenses.forEach((t) => {
        const month = new Date(t.createdAt).toLocaleString("en-us", { month: "short" });
        monthly[month] ||= { month, income: 0, expense: 0 };
        monthly[month][t.type] += Number(t.amount || 0);
      });

      setTrend(Object.values(monthly));

      /* Goal Progress */
      const g = await getGoals();
      const goals = Array.isArray(g.data) ? g.data : g.data.goals || [];

      if (goals.length > 0) {
        const goal = goals[0];
        const progress = (goal.savedAmount / goal.targetAmount) * 100;

        setGoalProgress({
          title: goal.title,
          progress
        });

        if (progress >= 100 && !window.__goalDone) {
          window.__goalDone = true;
          createNotification({
            type: "success",
            message: `🎉 Goal Completed: ${goal.title}`
          });
        }
      }
    } catch (err) {
      console.log("Dashboard ERROR:", err);
    }
  };

  const COLORS = ["#06b6d4", "#3b82f6", "#8b5cf6", "#f43f5e", "#9333ea"];

  return (
   <div className="
  text-white 
  mt-4 
  space-y-10 
  min-h-screen 
  overflow-x-hidden 
  bg-[#020617]
">



      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Income" value={income} color="text-green-400" />
        <SummaryCard title="Total Expenses" value={expense} color="text-red-400" />
        <SummaryCard title="Savings" value={savings} color="text-cyan-400" />
      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LINE CHART */}
        <ChartCard title="Income vs Expense Trend">
          <ResponsiveContainer width="100%" height={270}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="4 4" opacity={0.15} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#22d3ee" strokeWidth={3} />
              <Line type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* PIE CHART */}
        <ChartCard title="Expenses by Category">
          <ResponsiveContainer width="100%" height={270}>
            <PieChart>
              <Pie
                data={expenseByCategory}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {expenseByCategory.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* RADIAL GOAL PROGRESS */}
        <ChartCard title="Goal Progress">
          {goalProgress ? (
            <div className="flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height={240}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="100%"
                  barSize={18}
                  data={[{ value: goalProgress.progress }]}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar dataKey="value" fill="#06b6d4" cornerRadius={50} />
                </RadialBarChart>
              </ResponsiveContainer>

              <div className="-mt-24 text-center">
                <p className="text-4xl font-bold text-cyan-400">
                  {goalProgress.progress.toFixed(1)}%
                </p>
                <p className="opacity-70" style={{align:"center"}}>{goalProgress.title}</p>
              </div>
            </div>
          ) : (
            <p className="text-center opacity-60">No active goals</p>
          )}
        </ChartCard>

      </div>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function SummaryCard({ title, value, color }) {
  return (
    <div
      className="
        rounded-2xl p-6 text-center
        bg-gradient-to-br from-slate-800/40 via-slate-900/40 to-slate-800/40
        border border-white/20
        backdrop-blur-2xl
        shadow-[0_0_35px_rgba(0,255,255,.25)]
        hover:shadow-[0_0_60px_rgba(0,255,255,.45)]
        transition-all duration-500
        hover:scale-[1.02]
      "
    >
      <h3 className="text-lg opacity-80">{title}</h3>
      <p className={`text-4xl font-extrabold drop-shadow-lg ${color}`}>₹ {value}</p>
    </div>
  );
}


function ChartCard({ title, children }) {
  return (
    <div
      className="
        rounded-2xl p-6
        bg-gradient-to-br from-slate-800/40 via-slate-900/40 to-slate-800/40
        border border-white/20
        backdrop-blur-2xl
        shadow-[0_0_35px_rgba(0,255,255,.25)]
        hover:shadow-[0_0_60px_rgba(0,255,255,.45)]
        transition-all duration-500
        hover:scale-[1.02]
      "
    >
      <h3 className="text-center mb-4 font-semibold tracking-wide">
        {title}
      </h3>

      {children}
    </div>
  );
}

