// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true,
// });

// // Automatically include Authorization token on every request
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default apiClient;

import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,   // keep if you really need cookies
});

// Automatically include Authorization token on every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

