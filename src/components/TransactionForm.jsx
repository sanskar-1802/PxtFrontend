import { useState } from "react";
import { addTransaction } from "../services/transactionService";

export default function TransactionForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    recurrence: "none",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTransaction({ ...form, amount: Number(form.amount) });
      onSuccess();
      setForm({
        title: "",
        amount: "",
        category: "",
        type: "expense",
        recurrence: "none",
      });
    } catch (err) {
      console.log("BACKEND ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Error adding transaction");
    }
  };

  const inputClass =
    "p-2 rounded bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400";

  const selectClass =
    "p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer";

  return (
    <form className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 space-y-4 mb-6" onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-2">Add Transaction</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          className={inputClass}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          className={inputClass}
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Category"
          className={inputClass}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <select
          className={selectClass}
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option className="text-black" value="income">Income</option>
          <option className="text-black" value="expense">Expense</option>
        </select>

        <select
          className={selectClass}
          value={form.recurrence}
          onChange={(e) => setForm({ ...form, recurrence: e.target.value })}
        >
          <option className="text-black" value="none">None</option>
          <option className="text-black" value="weekly">Weekly</option>
          <option className="text-black" value="monthly">Monthly</option>
        </select>
      </div>

      <button className="w-full p-2 bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold text-slate-900 rounded-lg shadow">
        Add
      </button>
    </form>
  );
}
