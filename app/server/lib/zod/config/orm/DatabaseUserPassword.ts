import { z } from "zod/v4"

export const DatabaseUserPassword = z.string().min(8)

export type IDatabaseUserPassword = z.input<typeof DatabaseUserPassword>

export type ODatabaseUserPassword = z.output<typeof DatabaseUserPassword>
