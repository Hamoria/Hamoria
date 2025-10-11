import type { MikroORM } from "@mikro-orm/mongodb"
import { createContext } from "react-router"

export const ormContext = createContext<MikroORM>()
