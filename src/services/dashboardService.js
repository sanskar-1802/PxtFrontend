import apiClient from "./apiClient";

export const getAllExpenses = () => apiClient.get("/expenses/all");
export const getGoals = () => apiClient.get("/goals");
