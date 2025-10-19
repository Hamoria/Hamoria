import { z } from "zod/v4"

export const Schema = z.object({
	id: z.number(),
})
export type Type = z.infer<typeof Schema>
// export type InputType = z.infer<typeof InputSchema>
