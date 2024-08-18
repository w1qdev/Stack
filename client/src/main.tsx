import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthPage from "./pages/auth-page/AuthPage.tsx";
import HomePage from "./pages/home-page/HomePage.tsx";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <HomePage />,
    },
    {
        path: "/auth",
        element: <AuthPage />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
        <ToastContainer />
    </StrictMode>
);
