import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import Login from "./pages/Login.tsx";
import { SignUp } from "./pages/SignUp.tsx";
import { Provider } from "react-redux";
import { store } from "./States/store.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import PublicRoute from "./utils/PublicRoute.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import UserDetailsPage from "./pages/UserDetailsPage.tsx";
import TransactionHistory from "./pages/TransactionHistory.tsx";
import VerificationPage from "./pages/VerificationPage.tsx";
import FundWallet from "./pages/FundWallet.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Dashboard /> }, // Default child route
      { path: "transactions", element: <TransactionHistory /> }, // Default child route
      { path: "profile", element: <UserDetailsPage /> }, // Other child routes
      { path: "fund-wallet", element: <FundWallet /> }, // Other child routes
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    path: "/verify/:token",
    element: (
      <PublicRoute>
        <VerificationPage />
      </PublicRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
