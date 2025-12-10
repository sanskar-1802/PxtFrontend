import { RouterProvider } from "react-router-dom";
import router from "./router";
import AuthProvider from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "./context/LoadingContext";
import LoadingOverlay from "./components/LoadingOverlay";

export default function App() {
  return (
    <AuthProvider>
      <LoadingProvider>

        {/* Router */}
        <RouterProvider router={router} />

        {/* Global Loading Overlay */}
        <LoadingOverlay />

        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1e293b",
              color: "white",
              borderRadius: "10px",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#4ade80", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#fff" },
            },
          }}
        />

      </LoadingProvider>
    </AuthProvider>
  );
}
