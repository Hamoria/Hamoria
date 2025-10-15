import { z } from "zod/v4"

import { AdminPassword } from "./AdminPassword"

export const AdminLogInInput = z.object({
	email: z.string().email(),
	password: AdminPassword,
})

export type IAdminLogInInput = z.input<typeof AdminLogInInput>

export type OAdminLogInInput = z.output<typeof AdminLogInInput>
