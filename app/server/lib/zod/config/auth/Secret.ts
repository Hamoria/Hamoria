import { z } from "zod/v4"

export const Secret = z.string().min(21)

export type ISecret = z.input<typeof Secret>

export type OSecret = z.output<typeof Secret>
