import { z } from "zod/v4"

export const AdminPassword = z.string().min(8, "Password must be at least 8 characters long")

export type IAdminPassword = z.input<typeof AdminPassword>

export type OAdminPassword = z.output<typeof AdminPassword>
