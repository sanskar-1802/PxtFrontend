import apiClient from "./apiClient";

export const addGoal = (data) => apiClient.post("/goals", data);
export const getGoals = () => apiClient.get("/goals");
export const deleteGoal = (id) => {
  const token = localStorage.getItem("accessToken");
  return apiClient.delete(`goals/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
