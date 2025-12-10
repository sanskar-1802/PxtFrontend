import { useState } from "react";
import { addGoal } from "../services/goalService";

export default function GoalForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    targetAmount: "",
    savedAmount: "",
    deadline: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addGoal({
        ...form,
        targetAmount: Number(form.targetAmount),
        savedAmount: Number(form.savedAmount),
      });
      onSuccess();
      setForm({
        title: "",
        description: "",
        targetAmount: "",
        savedAmount: "",
        deadline: "",
      });
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Error adding goal");
    }
  };

  // shared styles for consistency
  const inputClass =
    "p-2 rounded bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 space-y-4 mb-6 shadow-lg"
    >
      <h3 className="text-xl font-bold mb-2">Add New Goal</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Goal Title"
          className={inputClass}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Target Amount"
          className={inputClass}
          value={form.targetAmount}
          onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Initial Saved Amount"
          className={inputClass}
          value={form.savedAmount}
          onChange={(e) => setForm({ ...form, savedAmount: e.target.value })}
          required
        />

        <input
          type="date"
          className={inputClass}
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          required
        />

      </div>

      <textarea
        placeholder="Description"
        className={`${inputClass} w-full`}
        rows="3"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button className="w-full p-2 bg-gradient-to-r from-green-400 to-lime-500 font-semibold text-slate-900 rounded-lg shadow-md hover:opacity-90 transition">
        Add Goal
      </button>
    </form>
  );
}
