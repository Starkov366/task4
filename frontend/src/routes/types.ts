import type { ReactNode } from "react"

export enum ROUTES {
    AUTHORIZATION = '/authorization',
    MAIN = '/user-management',
}
export type routerConfigType = {
    path: string,
    element: ReactNode
}