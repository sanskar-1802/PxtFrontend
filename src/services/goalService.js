import apiClient from "./apiClient";

export const addGoal = (data) => apiClient.post("/goals", data);
export const getGoals = () => apiClient.get("/goals");
