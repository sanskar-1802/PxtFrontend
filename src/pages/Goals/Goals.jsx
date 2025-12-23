import { useEffect, useState } from "react";
import GoalForm from "../../components/GoalForm";
import { getGoals, deleteGoal } from "../../services/goalService";
import { getTransactions } from "../../services/transactionService";
import ConfirmModal from "../../components/ConfirmModal";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [transactions, setTransactions] = useState([]);
const [confirmOpen, setConfirmOpen] = useState(false);
const [deleteId, setDeleteId] = useState(null);

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

const handleDeleteGoal = async () => {
  await deleteGoal(deleteId);
  setConfirmOpen(false);
  loadGoals();
};


  return (
    <div className="mt-4 text-white">
      <div className="
        bg-white/10 backdrop-blur-2xl border border-white/20 
        rounded-2xl p-6 shadow-[0_0_40px_rgba(0,255,255,.3)]
        space-y-6
      ">
        <h1 className="text-3xl font-bold tracking-wide">Goals</h1>

        <GoalForm onSuccess={loadGoals} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((g) => {
            const savings = g.savedAmount || 0;
            const progress = (savings / g.targetAmount) * 100;
            const achieved = progress >= 100;

            return (
              <div
                key={g._id}
                className={`p-6 rounded-2xl border backdrop-blur-xl transition-all
                  ${
                    achieved
                      ? "border-green-500 bg-green-500/20 shadow-[0_0_25px_rgba(0,255,0,.4)]"
                      : "border-white/30 bg-white/10 hover:bg-white/20"
                  }`}
              >
                <h3 className="text-xl font-bold">{g.title}</h3>
                <p className="opacity-60">{g.description}</p>

                <p className="text-sm opacity-50">
                  Deadline: {g.deadline ? new Date(g.deadline).toLocaleDateString() : "No deadline"}
                </p>

                <p className="text-cyan-300">Target: ₹{g.targetAmount}</p>
                <p className="text-yellow-300">Saved: ₹{savings}</p>

                <p className="font-bold text-blue-300">Progress: {progress.toFixed(1)}%</p>

                {achieved && (
                  <p className="font-bold text-green-400 text-center mt-2">
                    🎉 Goal Achieved!
                  </p>
                )}
<button
  onClick={() => {
    setDeleteId(g._id);
    setConfirmOpen(true);
  }}
  className="mt-3 bg-red-500/30 hover:bg-red-500/50 px-3 py-1 rounded w-full"
>
  Delete
</button>


              </div>
            );
          })}
        </div>

      </div>
      <ConfirmModal
  show={confirmOpen}
  onClose={() => setConfirmOpen(false)}
  onConfirm={handleDeleteGoal}
  message="Do you want to delete this goal?"
/>

    </div>
  );
}
