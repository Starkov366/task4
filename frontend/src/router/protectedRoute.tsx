import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
    const userRaw = localStorage.getItem("user");
const path = "/authorization"
    if (!userRaw) return <Navigate to={path} replace />;

    let user;

    try {
        user = JSON.parse(userRaw);
    } catch {
        localStorage.removeItem("user");
        return <Navigate to={path} replace />;
    }

    if (!user) return <Navigate to={path} replace />;

    if (user.status === "blocked") {
        localStorage.removeItem("user");
        return <Navigate to={path} replace />;
    }

    if (user.status === "unverified") {
        return <Navigate to={path} replace />;
    }

    return children;
};

export default ProtectedRoute;