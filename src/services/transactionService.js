import apiClient from "./apiClient";

export const addTransaction = (data) => {
  const token = localStorage.getItem("accessToken");
  return apiClient.post("expenses/add", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTransactions = () => {
  const token = localStorage.getItem("accessToken");
  return apiClient.get("expenses/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTransaction = (id) => {
  const token = localStorage.getItem("accessToken");
  return apiClient.delete(`expenses/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
