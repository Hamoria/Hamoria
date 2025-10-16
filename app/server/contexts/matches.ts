import { createContext } from "react-router"

// import type { RouteMatchWithPattern } from "../lib/utils/routes"
import type { SimplifiedRouteMatch } from "../lib/utils/routes"

export const matchesContext = createContext<SimplifiedRouteMatch[]>()
