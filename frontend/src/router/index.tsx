import { routerConfig } from "../routes/index";
import { Route,  BrowserRouter as Router, Routes } from "react-router-dom";

export function AppRouter() {
    return (
        <Router>
        <Routes>
            {routerConfig.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
            ))}
        </Routes>
        </Router>
    );
}