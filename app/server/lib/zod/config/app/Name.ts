import { z } from "zod/v4"

export const Name = z.string().trim().min(1).optional().default("Eri's Blog")

export type IName = z.input<typeof Name>

export type OName = z.output<typeof Name>
