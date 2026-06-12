import { ROUTES } from "./types"
import { Authorization } from "../pages/authorization"
import { UserManagement } from "../pages/userManagement"
import type { routerConfigType } from "./types"

export const routerConfig: routerConfigType[] = [
    {
        path: ROUTES.AUTHORIZATION,
        element: <Authorization />
    },
    {
        path: ROUTES.MAIN,
        element: <UserManagement/>
    }
]