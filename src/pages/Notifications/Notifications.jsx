import { useEffect, useState } from "react";
import { getNotifications, markAsRead, deleteNotification } from "../../services/notificationService";
import ConfirmModal from "../../components/ConfirmModal";
// import { deleteNotification } from "../../services/notificationService";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getNotifications();
    const arr = res.data.notifications || [];
    setNotifications(arr);

    window.refreshNotifications?.();
  };

  const handleRead = async (id) => {
    await markAsRead(id);
    load();
  };

const handleDelete = async () => {
  await deleteNotification(deleteId);
  setConfirmOpen(false);
  load();
};


  if (notifications.length === 0) {
    return (
      <h2 className="text-white text-center mt-10 opacity-70">
        No notifications right now 😊
      </h2>
    );
  }

  return (
    <div className="mt-4 text-white">
      <div className="
        bg-white/10 backdrop-blur-2xl border border-white/20 
        rounded-2xl p-6 shadow-[0_0_40px_rgba(0,255,255,.3)]
        space-y-4
      ">
        <h1 className="text-3xl font-bold tracking-wide mb-4">Notifications</h1>

        {notifications.map((n) => (
          <div
            key={n._id}
            className={`p-4 rounded-xl border backdrop-blur-xl flex justify-between items-center gap-3
              ${
                n.type === "danger"
                  ? "border-red-500 bg-red-500/20"
                  : n.type === "warning"
                  ? "border-yellow-500 bg-yellow-500/20"
                  : "border-green-500 bg-green-500/20"
              }`}
          >
            <div>
              <p className="font-semibold">{n.message}</p>
              <p className="text-xs opacity-60">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">

              {!n.isRead && (
                <button
                  className="text-sm bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition"
                  onClick={() => handleRead(n._id)}
                >
                  Mark Read
                </button>
              )}

<button
  className="text-sm bg-red-500/30 px-3 py-1 rounded-lg hover:bg-red-500/50 transition"
  onClick={() => {
    setDeleteId(n._id);
    setConfirmOpen(true);
  }}
>
  Delete
</button>


            </div>

          </div>
        ))}
      </div>
      <ConfirmModal
  show={confirmOpen}
  onClose={() => setConfirmOpen(false)}
  onConfirm={handleDelete}
  message="Do you want to delete this notification?"
/>

    </div>
  );
}
