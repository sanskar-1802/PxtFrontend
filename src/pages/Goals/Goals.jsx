import { useEffect, useState } from "react";
import GoalForm from "../../components/GoalForm";
import { getGoals } from "../../services/goalService";
import { getTransactions } from "../../services/transactionService";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadGoals();
    loadTransactions();
  }, []);

  const loadGoals = async () => {
    const res = await getGoals();
    setGoals(Array.isArray(res.data) ? res.data : res.data.goals || []);
  };

  const loadTransactions = async () => {
    const res = await getTransactions();
    const arr = Array.isArray(res.data) ? res.data : res.data.expenses || [];
    setTransactions(arr);
  };

  return (
    <div className="text-white">
      <GoalForm onSuccess={loadGoals} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((g) => {
          const savings = g.savedAmount || 0;
          const progress = (savings / g.targetAmount) * 100;
          const achieved = progress >= 100;

          return (
            <div
              key={g._id}
              className={`p-6 rounded-2xl backdrop-blur-xl border transition-all
                ${
                  achieved
                    ? "border-green-500 bg-green-500/20"
                    : "border-white/20 bg-white/10 hover:bg-white/20"
                }`}
            >
              <h3 className="text-xl font-bold mb-1">{g.title}</h3>
              <p className="opacity-75 mb-1">{g.description}</p>

              <p className="text-sm mb-2 opacity-50">
                Deadline:
                {g.deadline
                  ? ` ${new Date(g.deadline).toLocaleDateString()}`
                  : " No deadline"}
              </p>

              <p className="text-lg text-cyan-300 mb-1">
                Target: ₹{g.targetAmount}
              </p>

              <p className="text-lg text-yellow-300 mb-1">
                Savings Now: ₹{savings}
              </p>

              <p className="text-lg font-bold mb-2 text-blue-300">
                Progress: {progress.toFixed(1)}%
              </p>

              {achieved && (
                <p className="font-bold text-green-400 text-center">
                  🎉 Goal Achieved!
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
