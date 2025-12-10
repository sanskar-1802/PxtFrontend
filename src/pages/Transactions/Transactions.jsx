import { useEffect, useState } from "react";
import { getTransactions } from "../../services/transactionService";
import TransactionForm from "../../components/TransactionForm";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getTransactions();
      let arr = [];

      if (Array.isArray(res.data)) arr = res.data;
      else if (Array.isArray(res.data.expenses)) arr = res.data.expenses;

      setTransactions(arr);
    } catch (err) {
      console.log("TRANSACTION LOAD ERROR:", err.response?.data);
      setTransactions([]);
    }
  };

  const filtered = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  return (
    <div className="text-white">
      <TransactionForm onSuccess={loadData} />

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mb-4">
        {["all", "income", "expense"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-xl text-sm transition-all
              ${
                filter === f
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold shadow-md"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white/10 rounded-xl backdrop-blur-xl">
        <table className="w-full text-left">
          <thead>
            <tr className="text-cyan-400 text-sm">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t._id} className="border-t border-white/5 text-sm hover:bg-white/5">
                <td className="px-4 py-2">{t.title}</td>
                <td
                  className={`px-4 py-2 ${
                    t.type === "income" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  ₹ {t.amount}
                </td>
                <td className="px-4 py-2">{t.category}</td>
                <td className="px-4 py-2 capitalize">{t.type}</td>
                <td className="px-4 py-2">
                  {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
