import { useEffect, useState } from "react";
import { getBudgets, deleteBudget } from "../../services/budgetService";
import BudgetForm from "../../components/BudgetForm";
import { getTransactions } from "../../services/transactionService";
import ConfirmModal from "../../components/ConfirmModal";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadBudgets();
    loadExpenses();
  }, []);

  const loadBudgets = async () => {
    const res = await getBudgets();
    setBudgets(Array.isArray(res.data) ? res.data : res.data.budgets || []);
  };

  const loadExpenses = async () => {
    const res = await getTransactions();
    const arr = Array.isArray(res.data) ? res.data : res.data.expenses || [];
    setExpenses(arr);
  };

const handleDeleteBudget = async () => {
  await deleteBudget(deleteId);
  setConfirmOpen(false);
  loadBudgets();
};


  const getTotalSpentForCategory = (category) => {
    return expenses
      .filter(
        (e) =>
          e.category?.trim().toLowerCase() === category?.trim().toLowerCase() &&
          e.type?.toLowerCase() === "expense"
      )
      .reduce((sum, e) => sum + Number(e.amount || 0), 0);
  };

  return (
    <div className="mt-4 text-white">
      <div className="
        bg-white/10 backdrop-blur-2xl border border-white/20 
        rounded-2xl p-6 shadow-[0_0_40px_rgba(0,255,255,.3)]
        space-y-6
      ">
        <h1 className="text-3xl font-bold tracking-wide">Budgets</h1>

        <BudgetForm onSuccess={() => { loadBudgets(); loadExpenses(); }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((b) => {
            const spent = getTotalSpentForCategory(b.category);
            const left = b.limit - spent;
            const over = left < 0;

            return (
              <div
                key={b._id}
                className={`p-6 rounded-2xl border backdrop-blur-xl transition-all
                  ${
                    over
                      ? "border-red-500 bg-red-500/20 shadow-[0_0_25px_rgba(255,0,0,.4)]"
                      : "border-white/30 bg-white/10 hover:bg-white/20"
                  }`}
              >
                <h3 className="text-xl font-bold">{b.category}</h3>
                <p className="opacity-60 capitalize mb-2">Period: {b.period}</p>

                <p>Limit: <span className="text-cyan-300">₹{b.limit}</span></p>
                <p>Spent: <span className="text-yellow-300">₹{spent}</span></p>

                <p className={`font-bold mt-2 ${over ? "text-red-400" : "text-green-400"}`}>
                  {over ? `Over by ₹${Math.abs(left)}` : `Remaining ₹${left}`}
                </p>

<button
  onClick={() => {
    setDeleteId(b._id);
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
  onConfirm={handleDeleteBudget}
  message="Delete this budget?"
/>

    </div>
  );
}
