import apiClient from "./apiClient";

export const addBudget = (data) => {
  return apiClient.post("/budgets", data); // baseURL already has /api
};

export const getBudgets = () => {
  return apiClient.get("/budgets");
};
