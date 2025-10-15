import { z } from "zod/v4"

import { Name } from "./app/Name"

export const App = z
	.object({
		name: Name,
	})
	.transform((value) => Object.freeze(value))

export type IApp = z.input<typeof App>

export type OApp = z.output<typeof App>
