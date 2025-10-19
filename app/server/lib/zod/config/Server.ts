import { z } from "zod/v4"
import { db_url } from "./server/DB_URL"
import { ServerPort } from "./server/ServerPort"

export const Server = z
	.object({
		port: ServerPort,
		db: db_url,
	})
	.transform((value) => Object.freeze(value))

export type IServer = z.input<typeof Server>

export type OServer = z.output<typeof Server>
