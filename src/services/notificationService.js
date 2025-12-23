import apiClient from "./apiClient";

export const getNotifications = () => apiClient.get("/notifications");

export const markAsRead = (id) => apiClient.patch(`/notifications/${id}/read`);

export const createNotification = (data) =>
  apiClient.post("/notifications", data).catch(() => {});
// ❗ catch() prevents dashboard crash if backend fails
export const deleteNotification = (id) => {
  const token = localStorage.getItem("accessToken");
  return apiClient.delete(`notifications/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
