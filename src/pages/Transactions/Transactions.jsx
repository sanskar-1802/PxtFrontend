import { useEffect, useState } from "react";
import { getTransactions, deleteTransaction } from "../../services/transactionService";
import TransactionForm from "../../components/TransactionForm";
import ConfirmModal from "../../components/ConfirmModal";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

const handleDelete = async () => {
  try {
    await deleteTransaction(deleteId);
    setConfirmOpen(false);
    loadData();
  } catch {
    alert("Delete failed");
  }
};


  const filtered = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  return (
    <div className="mt-4 text-white">
      <div className="
        bg-white/10 backdrop-blur-2xl border border-white/20 
        rounded-2xl p-6 shadow-[0_0_40px_rgba(0,255,255,.3)]
        space-y-4
      ">
        <h1 className="text-3xl font-bold tracking-wide">Transactions</h1>

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
        <div className="overflow-x-auto bg-black/20 rounded-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="text-cyan-400 text-sm">
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((t) => (
                <tr key={t._id} className="border-t border-white/10 hover:bg-white/10">
                  <td className="px-4 py-2">{t.title}</td>

                  <td className={`px-4 py-2 ${t.type === "income" ? "text-green-400" : "text-red-400"}`}>
                    ₹ {t.amount}
                  </td>

                  <td className="px-4 py-2">{t.category}</td>
                  <td className="px-4 py-2 capitalize">{t.type}</td>

                  <td className="px-4 py-2">
                    {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "-"}
                  </td>

                  <td className="px-4 py-2">
                    <button
                     onClick={() => {
  setDeleteId(t._id);
  setConfirmOpen(true);
}}
                      className="bg-red-500/30 hover:bg-red-500/50 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
      <ConfirmModal
  show={confirmOpen}
  onClose={() => setConfirmOpen(false)}
  onConfirm={handleDelete}
  message="Do you really want to delete this transaction?"
/>

    </div>
  );
}
