import { ROUTES } from "./types"
import  Authorization  from "../pages/authorization"
import UserManagement from "../pages/userManagement"
import type { routerConfigType } from "./types"
import ProtectedRoute from "../router/protectedRoute"

export const routerConfig: routerConfigType[] = [
    {
        path: ROUTES.AUTHORIZATION,
        element: <Authorization />
    },
    {
        path: ROUTES.MAIN,
        element: <ProtectedRoute><UserManagement/></ProtectedRoute>
    }
]