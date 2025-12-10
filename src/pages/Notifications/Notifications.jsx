import { useEffect, useState } from "react";
import { getNotifications, markAsRead } from "../../services/notificationService";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getNotifications();
    const arr = res.data.notifications || [];
    setNotifications(arr);

    // 🔄 update sidebar badge instantly
    window.refreshNotifications?.();
  };

  const handleRead = async (id) => {
    await markAsRead(id);
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
    <div className="text-white space-y-4">
      {notifications.map((n) => (
        <div
          key={n._id}
          className={`p-4 rounded-xl border backdrop-blur-xl flex justify-between items-center
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

          {!n.isRead && (
            <button
              className="text-sm bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition"
              onClick={() => handleRead(n._id)}
            >
              Mark Read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
