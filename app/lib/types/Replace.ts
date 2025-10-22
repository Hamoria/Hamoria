import type { Simplify } from "./Simplify"

export type Replace<T, U> = Simplify<Omit<T, keyof U> & U>
