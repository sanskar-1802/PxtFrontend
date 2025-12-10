import { useState } from "react";
import { addBudget } from "../services/budgetService";

export default function BudgetForm({ onSuccess }) {
  const [form, setForm] = useState({
    category: "",
    limit: "",
    period: "monthly",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBudget({ ...form, limit: Number(form.limit) });
      onSuccess();
      setForm({ category: "", limit: "", period: "monthly", startDate: "", endDate: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error adding budget");
      console.log(err.response?.data);
    }
  };

  // Common UI style classes
  const inputClass =
    "p-2 rounded bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400";

  const selectClass =
    "p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 space-y-4 mb-6 shadow-lg"
    >
      <h3 className="text-xl font-bold mb-2">Add Budget</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Category"
          className={inputClass}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Limit (Amount)"
          className={inputClass}
          value={form.limit}
          onChange={(e) => setForm({ ...form, limit: e.target.value })}
          required
        />

        <select
          className={selectClass}
          value={form.period}
          onChange={(e) => setForm({ ...form, period: e.target.value })}
        >
          <option className="text-black" value="monthly">Monthly</option>
          <option className="text-black" value="weekly">Weekly</option>
          <option className="text-black" value="yearly">Yearly</option>
        </select>

        <input
          type="date"
          className={inputClass}
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          required
        />

        <input
          type="date"
          className={inputClass}
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          required
        />
      </div>

      <button className="w-full p-2 bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold text-slate-900 rounded-lg shadow-md hover:opacity-90 transition">
        Add Budget
      </button>
    </form>
  );
}
