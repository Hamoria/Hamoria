import { createContext } from "react-router"

import type { AdminViewer } from "../lib/admin/AdminArgs"

export const adminContext = createContext<AdminViewer>()
