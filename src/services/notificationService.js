import apiClient from "./apiClient";

export const getNotifications = () => apiClient.get("/notifications");

export const markAsRead = (id) => apiClient.patch(`/notifications/${id}/read`);

export const createNotification = (data) =>
  apiClient.post("/notifications", data).catch(() => {});
// ❗ catch() prevents dashboard crash if backend fails
