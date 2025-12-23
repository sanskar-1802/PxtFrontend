import apiClient from "./apiClient";

export const addBudget = (data) => {
  return apiClient.post("/budgets", data); // baseURL already has /api
};

export const getBudgets = () => {
  return apiClient.get("/budgets");
};

export const deleteBudget = (id) => {
  const token = localStorage.getItem("accessToken");
  return apiClient.delete(`budgets/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

