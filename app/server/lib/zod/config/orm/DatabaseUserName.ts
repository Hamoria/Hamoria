import { z } from "zod/v4"

export const DatabaseUserName = z.string().min(1, "User name required")

export type IDatabaseUserName = z.input<typeof DatabaseUserName>

export type ODatabaseUserName = z.output<typeof DatabaseUserName>
