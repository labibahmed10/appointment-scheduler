import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import allRoutes from "./routes/route.tsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={allRoutes} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
