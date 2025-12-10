import { useEffect, useState } from "react";
import { getBudgets } from "../../services/budgetService";
import BudgetForm from "../../components/BudgetForm";
import { getTransactions } from "../../services/transactionService";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

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
    <div className="text-white">
      <BudgetForm onSuccess={() => { loadBudgets(); loadExpenses(); }} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((b) => {
          const spent = getTotalSpentForCategory(b.category);
          const left = b.limit - spent;
          const over = left < 0;

          return (
            <div
              key={b._id}
              className={`p-6 rounded-2xl backdrop-blur-xl border transition-all 
                ${
                  over
                    ? "border-red-500 bg-red-500/20"
                    : "border-white/20 bg-white/10 hover:bg-white/20"
                }`}
            >
              <h3 className="text-xl font-bold mb-1">{b.category}</h3>
              <p className="opacity-75 mb-2 capitalize">Period: {b.period}</p>

              <p className="text-lg">
                <span className="text-cyan-300">Limit:</span> ₹{b.limit}
              </p>

              <p className="text-lg">
                <span className="text-yellow-300">Spent:</span> ₹{spent}
              </p>

              <p
                className={`text-lg font-semibold ${
                  over ? "text-red-400" : "text-green-400"
                }`}
              >
                {over
                  ? `Over Budget by ₹${Math.abs(left)}`
                  : `Remaining ₹${left}`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
