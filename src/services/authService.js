import apiClient from "./apiClient";

export const registerUser = (data) =>
  apiClient.post("/auth/register", data);

export const loginUser = (data) =>
  apiClient.post("/auth/login", data);

export const requestPasswordReset = (data) =>
  apiClient.post("/auth/request-password", data);
