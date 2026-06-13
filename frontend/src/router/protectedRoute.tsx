import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
    const userRaw = localStorage.getItem("user");

    if (!userRaw) return <Navigate to="/auth" replace />;

    let user;

    try {
        user = JSON.parse(userRaw);
    } catch {
        localStorage.removeItem("user");
        return <Navigate to="/auth" replace />;
    }

    if (!user) return <Navigate to="/auth" replace />;

    if (user.status === "blocked") {
        localStorage.removeItem("user");
        return <Navigate to="/auth" replace />;
    }

    if (user.status === "unverified") {
        return <Navigate to="/auth" replace />;
    }

    return children;
};

export default ProtectedRoute;